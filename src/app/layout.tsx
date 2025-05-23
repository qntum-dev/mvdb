import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import SearchForm from "@/components/search/SearchForm";
import { Suspense } from "react";
import env from "@/lib/env";
import { Toaster } from "sonner";
import Logo from "@/components/custom/Logo";
// import { SearchContextProvider } from "@/components/search/SearchContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MVDB: Explore Trending, Popular TV shows and Movies",
  description:
    "Your go-to site for finding movies, TV shows, and celebrity details.",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/apple-touch-icon.png"],
  },
  openGraph: {
    // url:
    type: "website",
    images: [`${env.NEXT_PUBLIC_URL}/logo.png`],
  },
};
// http://localhost:3000/_next/image?url=%2Fmvdb.png&w=1080&q=75
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          defaultTheme="dark"
          enableSystem={false}
          attribute="class"
        >
          <Suspense>
            <div className="flex flex-col lg:flex-row items-center gap-4 mt-4 lg:justify-center">
              <div className="hidden lg:block">
                <Logo w={100} h={100} />
              </div>
              <div className="lg:hidden">
                <Logo w={150} h={150} />
              </div>
              <div className="lg:w-[60%] w-[95%]">
                <SearchForm />
              </div>
            </div>

            <main className="mx-2 pt-6 lg:mx-[150px] md:mx-4 mb-8">
              {children}
            </main>
            <Toaster />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
