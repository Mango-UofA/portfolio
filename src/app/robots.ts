import { MetadataRoute } from 'next'
import { config } from '@/data/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/.well-known/'],
      },
      // Block AI crawlers and bots
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
      {
        userAgent: 'FacebookBot',
        disallow: '/',
      },
      {
        userAgent: 'facebookexternalhit',
        disallow: '/',
      },
      // Block common SEO crawler bots
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },
    ],
    sitemap: `${config.site}/sitemap.xml`,
    host: config.site,
  }
}