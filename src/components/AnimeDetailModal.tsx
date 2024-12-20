"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Card, CardBody, Tabs, Tab } from "@nextui-org/react";
import Image from "next/image";
import { AnimeRelease, AnimeData } from "../types";
import { ReleaseSection } from "./ReleaseSection";
import { ReleaseLinks } from "./ReleaseLinks";
import { TextFormatter } from "./TextFormatter";

interface AnimeDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedRelease: AnimeRelease | null;
    animeData: AnimeData | undefined;
}

export const AnimeDetailModal: React.FC<AnimeDetailModalProps> = ({ isOpen, onClose, selectedRelease, animeData }) => {
    if (!selectedRelease || !animeData) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex gap-1">{animeData.title}</ModalHeader>
                        <ModalBody>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card>
                                    <CardBody>
                                        <div className="relative w-full aspect-[2/3]">
                                            <Image
                                                src={animeData.images.jpg.large_image_url}
                                                alt={animeData.title}
                                                fill
                                                className="object-cover rounded-lg"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                priority
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="space-y-4">
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
                                                    <TextFormatter text={selectedRelease.notes} />
                                                </div>
                                            </Tab>
                                        )}
                                        {selectedRelease.qualityComparisons && (
                                            <Tab key="quality" title="Quality">
                                                <div className="p-2">
                                                    <TextFormatter text={selectedRelease.qualityComparisons} />
                                                </div>
                                            </Tab>
                                        )}
                                        {selectedRelease.missingReleases && (
                                            <Tab key="missing" title="Missing">
                                                <div className="p-2">
                                                    <TextFormatter text={selectedRelease.missingReleases} />
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
                                </div>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AnimeDetailModal;
