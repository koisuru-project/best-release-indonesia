export interface Release {
    name?: string;
    description?: string;
    downloadLinks?: string | string[];
}

export interface AnimeRelease {
    title: string;
    malId: number;
    bestReleases?: Release[] | string;
    bestAlternatives?: Release[] | string;
    notes?: string;
    qualityComparisons?: string;
    missingReleases?: string;
    downloadLinks?: string | string[];
}

export interface AnimeData {
    mal_id: number;
    url: string;
    title: string;
    title_english: string | null;
    images: {
        jpg: {
            large_image_url: string;
        };
    };
}

export type CachedAnimeData = Record<number, AnimeData>;
