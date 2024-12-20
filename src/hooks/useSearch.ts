import { useState, useEffect } from "react";
import { AnimeRelease, CachedAnimeData } from "../types";

export const useSearch = (releases: AnimeRelease[], animeDataCache: CachedAnimeData) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredReleases, setFilteredReleases] = useState<AnimeRelease[]>(releases);

    useEffect(() => {
        const filtered = releases.filter(release => {
            const animeData = animeDataCache[release.malId];
            if (!animeData) return false;

            const searchTerms = searchQuery.toLowerCase();
            return (
                animeData.title.toLowerCase().includes(searchTerms) ||
                (animeData.title_english?.toLowerCase().includes(searchTerms) ?? false)
            );
        });

        setFilteredReleases(filtered);
    }, [searchQuery, releases, animeDataCache]);

    return { searchQuery, setSearchQuery, filteredReleases };
};
