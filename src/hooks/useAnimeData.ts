import { useState, useEffect } from "react";
import { AnimeRelease, AnimeData, CachedAnimeData } from "../types";
import { fetchAnimeData, sleep } from "../utils/api";

export const useAnimeData = (filteredReleases: AnimeRelease[]) => {
    const [animeDataCache, setAnimeDataCache] = useState<CachedAnimeData>({});
    const [isLoading, setIsLoading] = useState(true);
    const [loadingStatus, setLoadingStatus] = useState<string>("");

    useEffect(() => {
        const loadAnimeData = async () => {
            setIsLoading(true);
            let completed = 0;

            try {
                const batchSize = 9999;
                const releases = [...filteredReleases];

                while (releases.length > 0) {
                    const batch = releases.splice(0, batchSize);
                    await Promise.all(
                        batch.map(async release => {
                            if (!animeDataCache[release.malId]) {
                                const animeData = await fetchAnimeData(release.malId);
                                if (animeData) {
                                    setAnimeDataCache(prev => ({
                                        ...prev,
                                        [release.malId]: animeData
                                    }));
                                }
                            }
                            completed++;
                            setLoadingStatus(`Loading anime data... ${completed}/${filteredReleases.length}`);
                        })
                    );

                    if (releases.length > 0) {
                        await sleep(1000);
                    }
                }
            } catch (error) {
                console.error("Error loading anime data:", error);
            } finally {
                setIsLoading(false);
                setLoadingStatus("");
            }
        };

        loadAnimeData();
    }, [filteredReleases, animeDataCache]); // Added animeDataCache to dependency array

    return { animeDataCache, isLoading, loadingStatus };
};
