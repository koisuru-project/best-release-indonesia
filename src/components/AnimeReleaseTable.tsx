"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Card,
    CardBody,
    Link,
    Tabs,
    Tab,
    Input,
    Spinner
} from "@nextui-org/react";
import { ExternalLink, Search } from "lucide-react";

interface Release {
    name?: string;
    description?: string;
    downloadLinks?: string | string[];
}

interface AnimeRelease {
    title: string;
    malId: number;
    bestReleases?: Release[] | string;
    bestAlternatives?: Release[] | string;
    notes?: string;
    qualityComparisons?: string;
    missingReleases?: string;
    downloadLinks?: string | string[];
}

interface AnimeData {
    mal_id: number;
    title: string;
    title_english: string | null;
    images: {
        jpg: {
            large_image_url: string;
        };
    };
}

type CachedAnimeData = Record<number, AnimeData>;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const formatText = (text: string) => {
    return text.split(/\n/).map((line, index, array) => (
        <React.Fragment key={index}>
            {line}
            {index < array.length - 1 && <br />}
        </React.Fragment>
    ));
};

const fetchWithRetry = async (url: string, maxRetries = 5): Promise<any> => {
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

const ReleaseLinks: React.FC<{ links: string | string[] }> = ({ links }) => {
    const linkArray = Array.isArray(links) ? links : [links];

    return (
        <div className="flex flex-col gap-2">
            {linkArray.map((link, index) => (
                <Link
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                >
                    <ExternalLink size={16} />
                    Download Link {linkArray.length > 1 ? `#${index + 1}` : ""}
                </Link>
            ))}
        </div>
    );
};

const ReleaseSection: React.FC<{ title: string; releases?: Release[] | string }> = ({ title, releases }) => {
    if (!releases) {
        return (
            <div className="p-2">
                <p className="text-default-500 italic">No information available</p>
            </div>
        );
    }

    const releaseArray = typeof releases === "string" ? [{ description: releases }] : releases;

    return (
        <div className="space-y-2">
            {releaseArray.map((release, index) => (
                <div key={index} className="p-2 rounded-md bg-content2">
                    {release.name && <p className="font-semibold">{formatText(release.name)}</p>}
                    <p>{release.description && formatText(release.description)}</p>
                    {release.downloadLinks && (
                        <div className="mt-2">
                            <ReleaseLinks links={release.downloadLinks} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const fetchAnimeData = async (malId: number): Promise<AnimeData | null> => {
    try {
        const data = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${malId}`);
        return data.data;
    } catch (error) {
        console.error("Error fetching anime data:", error);
        return null;
    }
};

const AnimeReleaseTable: React.FC = () => {
    const [releases, setReleases] = useState<AnimeRelease[]>([]);
    const [filteredReleases, setFilteredReleases] = useState<AnimeRelease[]>([]);
    const [selectedRelease, setSelectedRelease] = useState<AnimeRelease | null>(null);
    const [animeDataCache, setAnimeDataCache] = useState<CachedAnimeData>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [loadingStatus, setLoadingStatus] = useState<string>("");

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
                setFilteredReleases(transformedData);
            } catch (error) {
                console.error("Error loading release data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadReleases();
    }, []);

    useEffect(() => {
        const loadAnimeData = async () => {
            setIsLoading(true);
            let completed = 0;

            try {
                const batchSize = 3;
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
    }, [filteredReleases]);

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

    if (isLoading && filteredReleases.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
                <Spinner size="lg" />
                {loadingStatus && <p className="text-default-500">{loadingStatus}</p>}
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            <Input
                isClearable
                startContent={<Search className="text-default-400" size={16} />}
                placeholder="Search by title..."
                value={searchQuery}
                onClear={() => setSearchQuery("")}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full sm:max-w-[44%]"
            />

            <div className="overflow-x-auto">
                <Table
                    selectionMode="single"
                    aria-label="Anime releases table"
                    className="min-w-full"
                    classNames={{
                        wrapper: "min-w-full",
                        table: "min-w-full"
                    }}
                >
                    <TableHeader>
                        <TableColumn className="min-w-[200px]">Title</TableColumn>
                        <TableColumn className="min-w-[200px]">English Title</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent="No releases found">
                        {filteredReleases.map(release => {
                            const animeData = animeDataCache[release.malId];

                            return (
                                <TableRow
                                    key={release.malId}
                                    className="cursor-pointer hover:bg-default-100"
                                    onClick={() => {
                                        setSelectedRelease(release);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    <TableCell>{animeData?.title || release.title}</TableCell>
                                    <TableCell>{animeData?.title_english || "N/A"}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="2xl" scrollBehavior="inside">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex gap-1">
                                {selectedRelease && animeDataCache[selectedRelease.malId]?.title}
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedRelease && animeDataCache[selectedRelease.malId]?.images && (
                                        <Card>
                                            <CardBody>
                                                <div className="relative w-full aspect-[2/3]">
                                                    <Image
                                                        src={
                                                            animeDataCache[selectedRelease.malId].images.jpg
                                                                .large_image_url
                                                        }
                                                        alt={animeDataCache[selectedRelease.malId].title}
                                                        fill
                                                        className="object-cover rounded-lg"
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        priority
                                                    />
                                                </div>
                                            </CardBody>
                                        </Card>
                                    )}
                                    <div className="space-y-4">
                                        {selectedRelease && (
                                            <Tabs
                                                aria-label="Release information"
                                                color="primary"
                                                variant="bordered"
                                                className="w-full"
                                            >
                                                {selectedRelease.bestReleases && (
                                                    <Tab key="releases" title="Best Releases">
                                                        <ReleaseSection
                                                            title="Best Releases"
                                                            releases={selectedRelease.bestReleases}
                                                        />
                                                    </Tab>
                                                )}
                                                {selectedRelease.bestAlternatives && (
                                                    <Tab key="alternatives" title="Alternatives">
                                                        <ReleaseSection
                                                            title="Best Alternatives"
                                                            releases={selectedRelease.bestAlternatives}
                                                        />
                                                    </Tab>
                                                )}
                                                {selectedRelease.notes && (
                                                    <Tab key="notes" title="Notes">
                                                        <div className="p-2">
                                                            <p>{formatText(selectedRelease.notes)}</p>
                                                        </div>
                                                    </Tab>
                                                )}
                                                {selectedRelease.qualityComparisons && (
                                                    <Tab key="quality" title="Quality">
                                                        <div className="p-2">
                                                            <p>{formatText(selectedRelease.qualityComparisons)}</p>
                                                        </div>
                                                    </Tab>
                                                )}
                                                {selectedRelease.missingReleases && (
                                                    <Tab key="missing" title="Missing">
                                                        <div className="p-2">
                                                            <p>{formatText(selectedRelease.missingReleases)}</p>
                                                        </div>
                                                    </Tab>
                                                )}
                                                {selectedRelease.downloadLinks && (
                                                    <Tab key="downloads" title="Downloads">
                                                        <div className="p-2">
                                                            <ReleaseLinks links={selectedRelease.downloadLinks} />
                                                        </div>
                                                    </Tab>
                                                )}
                                            </Tabs>
                                        )}
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AnimeReleaseTable;
