import SiteLayout from "@/components/layout/Site";
import Provider from "@/context/provider";
import type { Metadata } from "next";
import { Inter, Sedgwick_Ave, Sedgwick_Ave_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sedgwick = Sedgwick_Ave({
  weight: "400",
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sedgwick",
});
const sedgwickDislay = Sedgwick_Ave_Display({
  weight: "400",
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sedgwickDislay",
});

export const metadata: Metadata = {
  title: "Doomsday Human - minting now",
  description: "Doomsday human by IT Rebel unlock your doomsday avtar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sedgwickDislay.variable} ${sedgwick.variable} ${inter.variable}`}
    >
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-G5E6SBFBV8"
        ></Script>
        <Script id="google-analytics">
          {` window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-G5E6SBFBV8');
    `}
        </Script>
      </head>
      <body className="font-normal bg-dark">
        <Provider>
          <SiteLayout>{children}</SiteLayout>
        </Provider>
      </body>
    </html>
  );
}
