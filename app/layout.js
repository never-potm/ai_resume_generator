import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/context/theme";
import TopNav from "@/components/nav/top-nav";
import {ResumeProvider} from "@/context/resume";
import {ClerkProvider} from '@clerk/nextjs'

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "AI Resume Builder",
    description: "Easy resumes built using AI",
};

export default function RootLayout({children}) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <ResumeProvider>
                    <TopNav/>
                    {children}
                </ResumeProvider>
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>
    );
}
