import AnimeReleaseTable from "@/components/AnimeReleaseTable";
import Header from "@/components/Header";

export default function Home() {
    return (
        <>
            <Header />
            <main className="container mx-auto p-4">
                <AnimeReleaseTable />
            </main>
        </>
    );
}
