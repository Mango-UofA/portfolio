import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import ElasticCursor from "@/components/ui/ElasticCursor";
import Particles from "@/components/Particles";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/footer/footer";
import Script from "next/script";
import Preloader from "@/components/preloader";
import EasterEggs from "@/components/easter-eggs";
import { config } from "@/data/config";
import SocketContextProvider from "@/contexts/socketio";
import RemoteCursors from "@/components/realtime/remote-cursors";

export const metadata: Metadata = {
  title: {
    default: config.title,
    template: "%s | Manglam Srivastav - Full-Stack Developer"
  },
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author, url: config.site }],
  creator: config.author,
  publisher: config.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(config.site),
  alternates: {
    canonical: config.site,
  },
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    siteName: "Manglam Srivastav Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: config.ogImg,
        width: 1200,
        height: 630,
        alt: "Manglam Srivastav - Full-Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    images: [config.ogImg],
    creator: "@manglamsriv",
    site: "@manglamsriv",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Add your Google verification code
  },
  category: "technology",
};

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[archivoBlack.className].join(" ")} suppressHydrationWarning>
      <head>
        <Script
          defer
          src={process.env.UMAMI_DOMAIN}
          data-website-id={process.env.UMAMI_SITE_ID}
        ></Script>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${config.site}/#person`,
                  name: "Manglam Srivastav",
                  givenName: "Manglam",
                  familyName: "Srivastav",
                  url: config.site,
                  image: config.ogImg,
                  jobTitle: "Full-Stack Developer",
                  worksFor: {
                    "@type": "Organization",
                    name: "Freelance"
                  },
                  knowsAbout: [
                    "React",
                    "Next.js",
                    "Node.js",
                    "TypeScript",
                    "JavaScript",
                    "MongoDB",
                    "PostgreSQL",
                    "AWS",
                    "Full-Stack Development",
                    "Web Development",
                    "API Development"
                  ],
                  sameAs: [
                    "https://github.com/manglam",
                    "https://linkedin.com/in/manglam",
                    "https://twitter.com/manglamsriv"
                  ]
                },
                {
                  "@type": "Website",
                  "@id": `${config.site}/#website`,
                  url: config.site,
                  name: "Manglam Srivastav Portfolio",
                  description: config.description.short,
                  publisher: {
                    "@id": `${config.site}/#person`
                  },
                  inLanguage: "en-US"
                },
                {
                  "@type": "WebPage",
                  "@id": `${config.site}/#webpage`,
                  url: config.site,
                  name: config.title,
                  isPartOf: {
                    "@id": `${config.site}/#website`
                  },
                  about: {
                    "@id": `${config.site}/#person`
                  },
                  description: config.description.long,
                  inLanguage: "en-US"
                }
              ]
            })
          }}
        />
        {/* <Analytics /> */}
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Particles
            className="fixed inset-0 -z-10 animate-fade-in"
            quantity={100}
          />
          <Preloader>
            <SocketContextProvider>
              <RemoteCursors />
              <TooltipProvider>
                <Header />
                {children}
                <Footer />
              </TooltipProvider>
            </SocketContextProvider>
            <Toaster />
            <EasterEggs />
            <ElasticCursor />
          </Preloader>
        </ThemeProvider>
      </body>
    </html>
  );
}
