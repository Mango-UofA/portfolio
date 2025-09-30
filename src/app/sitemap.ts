import { MetadataRoute } from 'next'
import { config } from '@/data/config'

// Import blog posts to include in sitemap
const blogPosts = [
  "building-interviewmate-ai-from-zero-to-hero",
  "hipaa-compliant-healthcare-platform-security", 
  "music-streaming-performance-optimization",
  "advanced-typescript-patterns-production",
  "deliverusa-multi-vendor-platform-architecture",
  "neurolyticai-intelligent-document-processing"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.site

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Dynamic blog post pages
  const blogPages = blogPosts.map((slug) => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}