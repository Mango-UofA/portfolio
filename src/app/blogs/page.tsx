import React from "react";
import { Metadata } from "next";
import { config } from "@/data/config";
import BlogListingClient from "./BlogListingClient";

export const metadata: Metadata = {
  title: "Engineering Chronicles - Technical Blog",
  description: "Explore in-depth technical articles about full-stack development, AI, system architecture, performance optimization, and modern web technologies. Learn from real-world projects and implementation experiences.",
  keywords: [
    "technical blog",
    "software engineering",
    "full-stack development",
    "React tutorials",
    "Next.js guides",
    "Node.js articles",
    "TypeScript patterns",
    "system architecture",
    "performance optimization",
    "AI development",
    "machine learning",
    "web development tutorials",
    "coding best practices",
    "developer insights",
    "programming tutorials"
  ],
  openGraph: {
    title: "Engineering Chronicles - Technical Blog | Manglam Srivastav",
    description: "Technical articles about full-stack development, AI, and modern web technologies from real-world project experiences.",
    url: `${config.site}/blogs`,
    type: "website",
    images: [
      {
        url: `${config.site}/assets/seo/blog-og-image.png`,
        width: 1200,
        height: 630,
        alt: "Engineering Chronicles - Technical Blog by Manglam Srivastav",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Chronicles - Technical Blog",
    description: "Technical articles about full-stack development, AI, and modern web technologies.",
    images: [`${config.site}/assets/seo/blog-og-image.png`],
  },
  alternates: {
    canonical: `${config.site}/blogs`,
  },
};

export default function BlogsPage() {
  return <BlogListingClient />;
}