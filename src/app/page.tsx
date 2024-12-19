import AnimeReleaseTable from "@/components/AnimeReleaseTable";

export default function Home() {
    return (
        <main className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Best Release Indonesia</h1>
            <AnimeReleaseTable />
        </main>
    );
}
