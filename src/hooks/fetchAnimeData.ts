import { promises as fs } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { AnimeData } from "@/types"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, maxRetries = 5): Promise<any> {
    let retries = 0;

    while (retries < maxRetries) {
        try {
            const response = await fetch(url);

            if (response.ok) {
                return await response.json();
            }

            if (response.status === 429) {
                const retryAfter = response.headers.get("Retry-After");
                const delay = retryAfter ? parseInt(retryAfter) * 1000 : Math.min(1000 * Math.pow(2, retries), 10000);
                console.log(`Rate limited. Retrying after ${delay}ms...`);
                await sleep(delay);
                retries++;
                continue;
            }

            throw new Error(`HTTP error! status: ${response.status}`);
        } catch (error) {
            if (retries === maxRetries - 1) throw error;
            retries++;
            await sleep(1000 * Math.pow(2, retries));
        }
    }

    throw new Error("Max retries exceeded");
}

async function fetchAndCacheAnimeData() {
    try {
        // Read the existing release data
        const releasesPath = join(process.cwd(), "public", "data", "animeRelease.json");
        const releases = JSON.parse(await fs.readFile(releasesPath, "utf-8"));

        // Create cache directory if it doesn't exist
        const cacheDir = join(process.cwd(), "public", "data", "cache");
        await fs.mkdir(cacheDir, { recursive: true });

        // Create or read the cache index
        const cacheIndexPath = join(cacheDir, "index.json");
        let cacheIndex: Record<number, string> = {};
        try {
            cacheIndex = JSON.parse(await fs.readFile(cacheIndexPath, "utf-8"));
        } catch (error) {
            // If file doesn't exist, we'll create it later
        }

        // Process each anime in batches
        const batchSize = 25; // Adjust based on API limits
        for (let i = 0; i < releases.length; i += batchSize) {
            const batch = releases.slice(i, i + batchSize);

            for (const release of batch) {
                const malId = release.malId || release.anilistId;

                // Skip if already cached
                if (cacheIndex[malId]) {
                    console.log(`Skipping ${malId} - already cached`);
                    continue;
                }

                try {
                    console.log(`Fetching data for anime ID ${malId}`);
                    const data = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${malId}`);
                    const animeData: AnimeData = data.data;

                    // Save individual anime data
                    const fileName = `${malId}.json`;
                    await fs.writeFile(join(cacheDir, fileName), JSON.stringify(animeData, null, 2));

                    // Update cache index
                    cacheIndex[malId] = fileName;
                    await fs.writeFile(cacheIndexPath, JSON.stringify(cacheIndex, null, 2));

                    // Wait to avoid rate limiting
                    await sleep(1000);
                } catch (error) {
                    console.error(`Error fetching anime ${malId}:`, error);
                }
            }
        }

        console.log("Anime data cache update completed");
    } catch (error) {
        console.error("Error updating anime cache:", error);
        process.exit(1);
    }
}

// Run the script
fetchAndCacheAnimeData();
