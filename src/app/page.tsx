import React from "react";
import { Metadata } from "next";
import { config } from "@/data/config";

export const metadata: Metadata = {
  title: "Home",
  description: config.description.long,
  keywords: [
    ...config.keywords,
    "portfolio",
    "software engineer",
    "web developer",
    "full stack developer",
    "React developer",
    "Next.js developer",
    "JavaScript developer",
    "TypeScript developer",
    "frontend developer",
    "backend developer",
    "MERN stack",
    "modern web development"
  ],
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    type: "website",
    images: [
      {
        url: config.ogImg,
        width: 1200,
        height: 630,
        alt: "Manglam Srivastav - Full-Stack Developer Portfolio Homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    images: [config.ogImg],
  },
  alternates: {
    canonical: config.site,
  },
};

import MainPageClient from "./MainPageClient";

export default function MainPage() {
  return <MainPageClient />;
}
