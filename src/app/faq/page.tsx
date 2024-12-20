import React from "react";
import Header from "@/components/Header";
import { Card, CardBody } from "@nextui-org/react";

const FaqPage = () => {
    const faqItems = [
        {
            title: "What is Best Release Indonesia?",
            content:
                "Best Release Indonesia is a platform that provides information about anime releases in Indonesia, helping fans stay updated with the latest and best anime content available in the region."
        },
        {
            title: "How often is the content updated?",
            content:
                "Our anime release information is updated regularly to ensure you have access to the most recent releases and changes in the Indonesian anime scene."
        },
        {
            title: "How can I contribute?",
            content:
                "You can contribute to our project through our GitHub repository. We welcome suggestions, bug reports, and pull requests to improve the platform."
        },
        {
            title: "Is this service free?",
            content:
                "Yes, Best Release Indonesia is completely free to use. We aim to make anime information accessible to all fans in Indonesia."
        },
        {
            title: "How do you determine the 'best' releases?",
            content:
                "We consider various factors including video quality, translation accuracy, and overall production value to determine the best releases for each anime title."
        }
    ];

    return (
        <>
            <Header />
            <main className="container mx-auto p-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">Frequently Asked Questions</h1>
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
