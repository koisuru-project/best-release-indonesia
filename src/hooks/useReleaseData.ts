import { useState, useEffect } from "react";
import { AnimeRelease } from "../types";

export const useReleaseData = () => {
    const [releases, setReleases] = useState<AnimeRelease[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadReleases = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("/data/animeRelease.json");
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                const transformedData = data.map((release: any) => ({
                    ...release,
                    malId: release.malId || release.anilistId
                }));
                setReleases(transformedData);
            } catch (error) {
                console.error("Error loading release data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadReleases();
    }, []);

    return { releases, isLoading };
};
