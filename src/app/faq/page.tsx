import React from "react";
import Header from "@/components/Header";
import { Card, CardBody } from "@nextui-org/react";

const FaqPage = () => {
    const faqItems = [
        {
            title: "Apa itu Best Release Indonesia?",
            content:
                "Best Release Indonesia adalah platform yang menyediakan informasi terkini tentang rilis anime di Indonesia, membantu penggemar tetap mendapatkan update mengenai anime terbaik yang tersedia di tanah air."
        },
        {
            title: "Seberapa sering konten diperbarui?",
            content:
                "Informasi rilis anime kami diperbarui secara berkala untuk memastikan Anda selalu mendapatkan informasi terbaru tentang dunia anime di Indonesia."
        },
        {
            title: "Bagaimana cara saya berkontribusi?",
            content:
                "Anda dapat berkontribusi melalui repositori GitHub kami. Kami menerima saran, laporan bug, dan *pull request* untuk meningkatkan platform ini."
        },
        {
            title: "Apakah layanan ini gratis?",
            content:
                "Ya, Best Release Indonesia sepenuhnya gratis untuk digunakan. Kami berkomitmen untuk membuat informasi anime dapat diakses oleh semua penggemar di Indonesia."
        },
        {
            title: "Bagaimana menentukan rilis 'terbaik'?",
            content:
                "Kami mempertimbangkan berbagai faktor seperti kualitas video, akurasi terjemahan, dan nilai produksi secara keseluruhan untuk menentukan rilis terbaik dari setiap judul anime."
        }
    ];

    return (
        <>
            <Header />
            <main className="container mx-auto p-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">Pertanyaan yang Sering Diajukan</h1>
                    {faqItems.map((item, index) => (
                        <Card key={index} className="mb-4">
                            <CardBody>
                                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                                <p className="text-default-600">{item.content}</p>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </main>
        </>
    );
};

export default FaqPage;
