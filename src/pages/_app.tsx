import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { VoltiChat } from "@/components/VoltiChat";
import { AuthProvider } from "@/context/AuthContext";
import { Geist, Geist_Mono } from "next/font/google";
import type { AppProps } from "next/app";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 text-slate-900`}
      >
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
          <Component {...pageProps} />
        </main>
        <VoltiChat />
      </div>
    </AuthProvider>
  );
}
