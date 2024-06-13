import "./globals.css";
import type { Metadata } from "next";
import { Monda, Carter_One, Fugaz_One } from "next/font/google";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleAnalytics from "@/app/utils/ga4/google-analytics-4";
import Script from "next/script";

const monda = Monda({ weight: ["400", "700"], subsets: ["latin"] });
const FugazeOne = Fugaz_One({ weight: ["400"], subsets: ["latin"], variable: "--test" });

export const metadata: Metadata = {
    title: "캡쳐드",
    description: "전세계 숨은 재고를 검거하는 캡쳐드! 내가 원하는 그 제품, 캡쳐드에서 먼저 찾아보세요.",
    // viewport: "width=device-width, maximum-scale=1, user-scalable=0",
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "캡쳐드",
    alternateName: "CAPTURED",
    url: "https://we-captured.kr/",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="kr">
            <GoogleAnalytics GA_TRACKING_ID={process.env.GA_TRACKING_ID!} />
            <Script
                id="initID+JSON"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <body className={`${monda.className} ${FugazeOne.variable}`}>
                {children}
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    transition={Flip}
                    toastClassName="text-lg shadow-lg top-[50px]"
                />
            </body>
        </html>
    );
}
