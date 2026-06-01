import "@/styles/globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import {
  Geist_Mono,
  Hanken_Grotesk,
  Schibsted_Grotesk,
} from "next/font/google";
import Head from "next/head";
import type { AppProps } from "next/app";

const display = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export default function App({ Component, pageProps, router }: AppProps) {
  const isLandingPage = router.pathname === "/landingpage";

  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="SUR INGENIERIA - Domotica y electricidad residencial con ejecucion tecnica, documentacion y seguimiento digital."
        />
        <meta property="og:site_name" content="SUR INGENIERIA" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SUR INGENIERIA" />
        <meta
          property="og:description"
          content="Domotica y electricidad residencial con enfoque tecnico, claro y premium."
        />
        <meta property="og:image" content="/brand/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SUR INGENIERIA" />
        <meta
          name="twitter:description"
          content="Domotica y electricidad residencial con ejecucion y seguimiento profesional."
        />
        <meta name="twitter:image" content="/brand/logo.png" />
      </Head>
      <div
        className={`${display.variable} ${sans.variable} ${mono.variable} min-h-screen bg-transparent text-brand-text`}
      >
        {isLandingPage ? null : <Navbar />}
        <main
          className={
            isLandingPage
              ? "w-full"
              : "mx-auto w-full max-w-6xl px-6 pb-20 pt-6 lg:px-6 lg:pt-8"
          }
        >
          <Component {...pageProps} />
        </main>
        {isLandingPage ? null : <Footer />}
      </div>
    </AuthProvider>
  );
}
