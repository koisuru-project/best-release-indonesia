import { Providers } from "./providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Best Release Indonesia",
    description: "Best anime releases Indonesia and their information"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} min-h-screen`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
