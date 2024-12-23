import { AnimeData } from "@/types";

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAnimeData = async (malId: number): Promise<AnimeData | null> => {
    try {
        // In production, fetch from local cache
        if (process.env.NODE_ENV === "production") {
            const response = await fetch(`/data/cache/${malId}.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        }

        // In development, fetch from Jikan API
        const data = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${malId}`);
        return data.data;
    } catch (error) {
        console.error("Error fetching anime data:", error);
        return null;
    }
};

export const fetchWithRetry = async (url: string, maxRetries = 5): Promise<any> => {
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
};
