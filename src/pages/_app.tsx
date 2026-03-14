import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { VoltiChat } from "@/components/VoltiChat";
import { AuthProvider } from "@/context/AuthContext";
import { Footer } from "@/components/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="SUR INGENIERÃA - DomÃ³tica & Electricidad Residencial con ejecuciÃ³n tÃ©cnica, documentaciÃ³n y seguimiento digital."
        />
        <meta property="og:site_name" content="SUR INGENIERÃA" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SUR INGENIERÃA" />
        <meta
          property="og:description"
          content="DomÃ³tica & Electricidad Residencial con enfoque tÃ©cnico, sobrio y premium."
        />
        <meta property="og:image" content="/brand/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SUR INGENIERÃA" />
        <meta
          name="twitter:description"
          content="DomÃ³tica & Electricidad Residencial con ejecuciÃ³n y seguimiento profesional."
        />
        <meta name="twitter:image" content="/brand/logo.png" />
      </Head>
      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-transparent text-brand-text`}
      >
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
          <Component {...pageProps} />
        </main>
        <Footer />
        <VoltiChat />
      </div>
    </AuthProvider>
  );
}
