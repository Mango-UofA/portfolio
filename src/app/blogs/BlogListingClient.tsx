"use client";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const blogPosts = [
  {
    id: 1,
    slug: "building-interviewmate-ai-from-zero-to-hero",
    title: "Building InterviewMate AI: From Zero to 10,000+ Users",
    excerpt: "The complete journey of building an AI-powered interview preparation platform. From the initial idea to scaling challenges, technical decisions, and lessons learned.",
    date: "September 10, 2025",
    readTime: "12 min read",
    tags: ["AI", "WebRTC", "Next.js", "Scaling", "Startup"],
    featured: true,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop&crop=center&auto=format&q=80",
    author: {
      name: "Manglam Srivastav",
      avatar: "/assets/me.jpg",
      role: "Full Stack Developer"
    },
    category: "AI & Development"
  },
  {
    id: 2,
    slug: "hipaa-compliant-healthcare-platform-security",
    title: "Building HIPAA-Compliant Healthcare Platforms: A Developer's Guide",
    excerpt: "Everything I learned about healthcare data security, HIPAA compliance, and building platforms that handle sensitive patient information safely.",
    date: "September 8, 2025",
    readTime: "10 min read",
    tags: ["Healthcare", "Security", "HIPAA", "Compliance", "Privacy"],
    featured: true,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center&auto=format&q=80",
    author: {
      name: "Manglam Srivastav",
      avatar: "/assets/me.jpg",
      role: "Full Stack Developer"
    },
    category: "Security"
  },
  {
    id: 3,
    slug: "music-streaming-performance-optimization",
    title: "Optimizing Music Streaming: From 2s to 500ms Load Times",
    excerpt: "How I transformed a slow music streaming platform into a lightning-fast experience using advanced caching, CDN optimization, and smart preloading.",
    date: "September 5, 2025",
    readTime: "8 min read",
    tags: ["Performance", "Optimization", "CDN", "Caching", "Streaming"],
    featured: false,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop&crop=center&auto=format&q=80",
    author: {
      name: "Manglam Srivastav",
      avatar: "/assets/me.jpg",
      role: "Full Stack Developer"
    },
    category: "Performance"
  },
  {
    id: 4,
    slug: "advanced-typescript-patterns-production",
    title: "Advanced TypeScript Patterns I Use in Production",
    excerpt: "The TypeScript techniques that transformed my development workflow. From conditional types to template literals—real examples from production code.",
    date: "September 2, 2025",
    readTime: "9 min read",
    tags: ["TypeScript", "Advanced Types", "Developer Experience", "Best Practices"],
    featured: false,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop&crop=center&auto=format&q=80",
    author: {
      name: "Manglam Srivastav",
      avatar: "/assets/me.jpg",
      role: "Full Stack Developer"
    },
    category: "Development"
  },
  {
    id: 5,
    slug: "deliverusa-multi-vendor-platform-architecture",
    title: "Building DeliverUSA: Multi-Vendor Platform Architecture",
    excerpt: "The technical challenges of building a delivery platform that connects restaurants, drivers, and customers in real-time. Architecture decisions and lessons learned.",
    date: "August 30, 2025",
    readTime: "11 min read",
    tags: ["Platform", "Real-time", "Microservices", "Scaling", "Architecture"],
    featured: false,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&crop=center&auto=format&q=80",
    author: {
      name: "Manglam Srivastav",
      avatar: "/assets/me.jpg",
      role: "Full Stack Developer"
    },
    category: "Architecture"
  },
  {
    id: 6,
    slug: "neurolyticai-intelligent-document-processing",
    title: "NeurolyticAI: Beyond Traditional OCR with Machine Learning",
    excerpt: "How I built an intelligent document processing system that understands context, not just text. Combining OCR with custom ML models for real-world applications.",
    date: "August 27, 2025",
    readTime: "10 min read",
    tags: ["Machine Learning", "OCR", "Document Processing", "AI", "NLP"],
    featured: false,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=center&auto=format&q=80",
    author: {
      name: "Manglam Srivastav",
      avatar: "/assets/me.jpg",
      role: "Full Stack Developer"
    },
    category: "AI & ML"
  }
];

const categories = [
  { name: "All", count: blogPosts.length, color: "from-blue-500 to-purple-500" },
  { name: "AI & Development", count: 2, color: "from-green-500 to-teal-500" },
  { name: "Performance", count: 1, color: "from-orange-500 to-red-500" },
  { name: "Security", count: 1, color: "from-purple-500 to-pink-500" },
  { name: "Architecture", count: 1, color: "from-indigo-500 to-blue-500" },
  { name: "Development", count: 1, color: "from-yellow-500 to-orange-500" }
];

export default function BlogListingClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredPosts = blogPosts.filter(post => post.featured);
  
  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    let posts = blogPosts.filter(post => !post.featured);
    
    if (selectedCategory !== "All") {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    
    if (searchTerm) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return posts;
  }, [searchTerm, selectedCategory]);

  const allFilteredPosts = useMemo(() => {
    if (selectedCategory === "All" && !searchTerm) {
      return [...featuredPosts.slice(1), ...filteredPosts];
    }
    
    let posts = [...featuredPosts, ...blogPosts.filter(post => !post.featured)];
    
    if (selectedCategory !== "All") {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    
    if (searchTerm) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return posts;
  }, [searchTerm, selectedCategory, featuredPosts, filteredPosts]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,200,255,0.3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[conic-gradient(from_230.29deg_at_51.63%_52.16%,rgb(36,0,255,0.2)_0deg,rgb(0,135,255,0.2)_67.5deg,rgb(108,39,157,0.2)_198.75deg,rgb(24,38,163,0.2)_251.25deg,rgb(54,103,196,0.2)_301.88deg,rgb(105,30,255,0.2)_360deg)] animate-spin" style={{ animationDuration: '20s' }}></div>
      
      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                <span className="text-cyan-300 font-medium uppercase tracking-wider text-sm">Engineering Chronicles</span>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse"></div>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-purple-200 inline-block transform hover:scale-105 transition-transform duration-300">
                  TECH
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 inline-block transform hover:scale-105 transition-transform duration-300">
                  STORIES
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed">
                Real-world engineering challenges, breakthrough solutions, and the stories behind building applications that scale.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                {["AI Development", "System Architecture", "Performance", "Security"].map((tag, index) => (
                  <motion.div 
                    key={`header-tag-${index}-${tag}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10">{tag}</span>
                  </motion.div>
                ))}
              </div>

              {/* Search and Filter Section */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="max-w-4xl mx-auto mb-20"
              >
                {/* Search Bar */}
                <div className="relative mb-8">
                  <div className={cn(
                    "relative bg-white/10 backdrop-blur-xl border rounded-2xl transition-all duration-500",
                    isSearchFocused ? "border-cyan-400 shadow-lg shadow-cyan-500/20" : "border-white/20"
                  )}>
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                      <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search articles, topics, or technologies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className="w-full bg-transparent border-none pl-16 pr-6 py-6 text-white placeholder-white/60 focus:outline-none text-lg"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3">
                  {categories.map((category, categoryIndex) => (
                    <motion.button
                      key={`category-${categoryIndex}-${category.name}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category.name)}
                      className={cn(
                        "px-6 py-3 rounded-full font-medium transition-all duration-300 border",
                        selectedCategory === category.name
                          ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-transparent shadow-lg shadow-cyan-500/25"
                          : "bg-white/5 backdrop-blur-sm text-white/80 hover:text-white border-white/20 hover:border-white/40 hover:bg-white/10"
                      )}
                    >
                      {category.name}
                      <span className="ml-2 text-sm opacity-75">({category.count})</span>
                    </motion.button>
                  ))}
                </div>

                {/* Results count */}
                {(searchTerm || selectedCategory !== "All") && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-6"
                  >
                    <p className="text-white/70">
                      Found <span className="text-cyan-400 font-semibold">{allFilteredPosts.length}</span> article{allFilteredPosts.length !== 1 ? 's' : ''}
                      {searchTerm && <span> for "<span className="text-purple-400">{searchTerm}</span>"</span>}
                      {selectedCategory !== "All" && <span> in <span className="text-purple-400">{selectedCategory}</span></span>}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Featured Article - Large Hero */}
            {featuredPosts.length > 0 && (!searchTerm && selectedCategory === "All") && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-32"
              >
                <Link 
                  href={`/blogs/${featuredPosts[0].slug}`}
                  className="group block relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden hover:border-white/40 transition-all duration-700 hover:scale-[1.02] transform"
                >
                  {/* Hero Image */}
                  <div className="relative h-96 lg:h-[500px] overflow-hidden">
                    <Image
                      src={featuredPosts[0].image}
                      alt={featuredPosts[0].title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    
                    {/* Floating Elements */}
                    <div className="absolute top-8 left-8">
                      <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20">
                        <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold">FEATURED STORY</span>
                      </div>
                    </div>
                    
                    <div className="absolute top-8 right-8">
                      <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-medium border border-white/20">
                        {featuredPosts[0].category}
                      </span>
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                      <div className="max-w-4xl">
                        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-300 transition-all duration-500">
                          {featuredPosts[0].title}
                        </h2>
                        
                        <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed">
                          {featuredPosts[0].excerpt}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-6">
                          <div className="flex items-center gap-3">
                            <Image
                              src={featuredPosts[0].author.avatar}
                              alt={featuredPosts[0].author.name}
                              width={48}
                              height={48}
                              className="rounded-full border-2 border-white/30"
                            />
                            <div>
                              <p className="text-white font-semibold">{featuredPosts[0].author.name}</p>
                              <p className="text-white/70 text-sm">{featuredPosts[0].date}</p>
                            </div>
                          </div>
                          
                          <div className="text-cyan-300 font-semibold flex items-center gap-3 group/btn">
                            <span>Read the full story</span>
                            <svg className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Articles Grid */}
            <div className="mb-32">
              <div className="flex items-center gap-6 mb-16">
                <h2 className="text-4xl lg:text-6xl font-bold text-white">
                  {searchTerm || selectedCategory !== "All" ? "Search Results" : "More Stories"}
                </h2>
                <div className="h-px bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-transparent flex-1"></div>
              </div>
              
              {/* No results state */}
              {allFilteredPosts.length === 0 && (searchTerm || selectedCategory !== "All") && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">No articles found</h3>
                    <p className="text-white/70 mb-6">
                      Try adjusting your search terms or browse different categories.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("All");
                      }}
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                    >
                      Show All Articles
                    </button>
                  </div>
                </motion.div>
              )}
              
              {/* Articles Grid */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${searchTerm}-${selectedCategory}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
                >
                  {allFilteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        // Staggered heights for visual interest (only when showing all)
                        searchTerm || selectedCategory !== "All" ? "" : (
                          index % 6 === 1 || index % 6 === 4 ? "xl:mt-8" : 
                          index % 6 === 2 || index % 6 === 5 ? "xl:mt-16" : ""
                        )
                      )}
                    >
                      <Link 
                        href={`/blogs/${post.slug}`}
                        className="group block relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:border-white/40 transition-all duration-500 hover:scale-105 transform h-full"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          
                          <div className="absolute top-4 right-4">
                            <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium border border-white/20">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={32}
                              height={32}
                              className="rounded-full border border-white/30"
                              sizes="32px"
                            />
                            <div>
                              <p className="text-white text-sm font-medium">{post.author.name}</p>
                              <p className="text-white/60 text-xs">{post.date}</p>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-300 transition-all duration-300">
                            {post.title}
                          </h3>
                          
                          <p className="text-white/80 mb-6 leading-relaxed text-sm line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 2).map((tag: string, tagIndex: number) => (
                              <span key={`${post.id}-tag-${tagIndex}`} className="bg-white/10 text-white/70 px-2 py-1 rounded text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="text-cyan-300 text-sm font-semibold flex items-center gap-2 group/btn">
                            <span>Read more</span>
                            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Section - Newsletter & Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid lg:grid-cols-2 gap-12"
            >
              {/* Enhanced Newsletter */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 group-hover:from-cyan-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M12 2v6.5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Stay in the Loop</h3>
                      <p className="text-cyan-300 font-medium">Weekly Engineering Insights</p>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-8 leading-relaxed">
                    Get weekly insights on engineering challenges, breakthrough solutions, and industry trends. Join <span className="text-cyan-400 font-semibold">2,500+</span> developers already subscribed.
                  </p>
                  
                  <div className="space-y-4">
                    <input 
                      type="email" 
                      placeholder="your.email@company.com" 
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-6 py-4 text-white placeholder-white/60 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-[1.02] active:scale-[0.98]">
                      Subscribe Now
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-white/60 text-sm mt-6">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Weekly insights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>No spam ever</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Unsubscribe anytime</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Exclusive content</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Stats & Categories */}
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-white/30 transition-all duration-300"
                >
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    By the Numbers
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      whileHover={{ y: -2 }}
                      className="text-center p-4 bg-white/5 rounded-xl"
                    >
                      <div className="text-3xl font-bold text-cyan-400 mb-2">{blogPosts.length}</div>
                      <div className="text-white/60 text-sm">Articles</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -2 }}
                      className="text-center p-4 bg-white/5 rounded-xl"
                    >
                      <div className="text-3xl font-bold text-purple-400 mb-2">50K+</div>
                      <div className="text-white/60 text-sm">Readers</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -2 }}
                      className="text-center p-4 bg-white/5 rounded-xl"
                    >
                      <div className="text-3xl font-bold text-pink-400 mb-2">6</div>
                      <div className="text-white/60 text-sm">Categories</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -2 }}
                      className="text-center p-4 bg-white/5 rounded-xl"
                    >
                      <div className="text-3xl font-bold text-orange-400 mb-2">95%</div>
                      <div className="text-white/60 text-sm">Satisfaction</div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-white/30 transition-all duration-300"
                >
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    Explore Topics
                  </h4>
                  <div className="space-y-3">
                    {categories.slice(1).map((category, index) => (
                      <motion.button
                        key={category.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 8 }}
                        onClick={() => setSelectedCategory(category.name)}
                        className={cn(
                          "w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-4 transition-all duration-300 group",
                          selectedCategory === category.name && "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={cn("w-2 h-2 rounded-full bg-gradient-to-r", category.color)} />
                            <span className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                              {category.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-white/60 text-sm">{category.count}</span>
                            <svg className="w-4 h-4 text-white/40 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Back to Portfolio */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-24"
            >
              <Link 
                href="/" 
                className="inline-flex items-center gap-4 text-white/70 hover:text-white transition-all duration-300 text-lg group bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-full px-8 py-4 hover:bg-white/10 hover:scale-105"
              >
                <svg className="w-6 h-6 group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back to Portfolio</span>
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
