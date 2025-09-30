"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Play, Pause, Code, Zap, Database, Cloud, Lock, Users, Brain, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  SiReact, SiNodedotjs, SiMongodb, SiPostgresql, SiPython, SiTypescript, 
  SiTailwindcss, SiDocker, SiAmazonaws, SiNextdotjs, SiExpress, SiRedis,
  SiGit, SiVercel, SiNetlify, SiFirebase, SiSocketdotio
} from "react-icons/si";

// Your actual projects data
const PROJECTS = [
  {
    id: "interviewmate",
    title: "InterviewMate AI",
    subtitle: "AI-Powered Interview Automation Platform",
    year: "2025",
    type: "Full-Stack + ML",
    status: "Production",
    description: "Built an AI-powered interview automation platform that simulates structured interviews, captures responses, and provides granular feedback through advanced STT and LLM evaluation. Features microservice architecture with containerized deployments, implementing WebSocket-based real-time communication for synchronized transcripts. The system handles concurrent interview sessions with queue-based processing and implements deterministic scoring algorithms with rubric-based evaluation matrices.",
    highlights: [
      "99.5% uptime with real-time transcript sync using WebSocket clusters",
      "Handles 1000+ concurrent interviews with horizontal pod autoscaling",
      "Sub-2s STT processing with optimized Whisper ASR and streaming pipelines",
      "Deterministic LLM scoring system with bias detection and calibration",
      "GDPR-compliant data handling with encryption-at-rest and audit trails",
      "Multi-tenant architecture supporting enterprise SSO integration"
    ],
    techStack: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "AWS", icon: SiAmazonaws, color: "#FF9900" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Socket.IO", icon: SiSocketdotio, color: "#010101" }
    ],
    features: [
      { icon: Brain, title: "AI-Powered Analysis", desc: "Advanced LLM evaluation with rubric-based scoring" },
      { icon: Zap, title: "Real-Time Processing", desc: "WebSocket-optimized transcript synchronization" },
      { icon: Lock, title: "Enterprise Security", desc: "JWT auth, encryption-at-rest, audit logging" },
      { icon: Cloud, title: "Auto-Scaling", desc: "Queue-based architecture with intelligent scaling" }
    ],
    images: [
      "/assets/projects-screenshots/interviewmate/dashboard.png",
      "/assets/projects-screenshots/interviewmate/interview.png",
      "/assets/projects-screenshots/interviewmate/analytics.png"
    ],
    // Under NDA - Live demo and code not available
    category: "ai-ml",
    gradient: "from-blue-600 via-purple-600 to-cyan-500"
  },
  {
    id: "neurolyticai",
    title: "NeurolyticAI",
    subtitle: "HIPAA-Compliant Clinical Documentation",
    year: "2025",
    type: "Healthcare AI",
    status: "Enterprise",
    description: "HIPAA-compliant clinical documentation platform that transforms conversations into structured SOAP notes using advanced NLP and medical terminology mapping. Implements end-to-end encryption with PKI infrastructure, integrates with major EHR systems through HL7 FHIR APIs, and provides automated ICD-10/SNOMED CT coding with confidence scoring. Features real-time collaboration tools for medical teams and audit-compliant workflow management.",
    highlights: [
      "95% accuracy in medical terminology mapping with custom BioBERT models",
      "SNOMED/ICD-10 compliance with automated coding suggestions and validation",
      "60% reduction in documentation time through intelligent auto-completion",
      "Full HIPAA compliance with BAA agreements and SOC 2 Type II certification",
      "Real-time collaboration with conflict resolution algorithms",
      "HL7 FHIR R4 integration with 99.9% data integrity validation"
    ],
    techStack: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "AWS", icon: SiAmazonaws, color: "#FF9900" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" }
    ],
    features: [
      { icon: Lock, title: "HIPAA Compliant", desc: "End-to-end encryption with audit trails" },
      { icon: Brain, title: "Medical NLP", desc: "SNOMED/ICD-10 terminology mapping" },
      { icon: Users, title: "Clinical Workflow", desc: "Integrated EHR compatibility" },
      { icon: Database, title: "Structured Data", desc: "SOAP note generation with provenance" }
    ],
    images: [
      "/assets/projects-screenshots/neurolyticai/dashboard.png",
      "/assets/projects-screenshots/neurolyticai/documentation.png",
      "/assets/projects-screenshots/neurolyticai/analytics.png"
    ],
    // Under NDA - Live demo and code not available
    category: "healthcare",
    gradient: "from-emerald-600 via-teal-600 to-cyan-500"
  },
  {
    id: "deliverusa",
    title: "DeliverUSA",
    subtitle: "Multi-Vendor Logistics Platform",
    year: "2024",
    type: "Platform Engineering",
    status: "Scaling",
    description: "Comprehensive logistics platform connecting restaurants, drivers, and customers with real-time tracking, dynamic pricing, and automated dispatch. Implements event-driven microservices architecture with CQRS pattern, features geospatial optimization algorithms for route planning, and provides advanced analytics dashboard with predictive demand modeling. Supports multi-region deployment with eventual consistency patterns.",
    highlights: [
      "Real-time GPS tracking with sub-meter accuracy using WebRTC data channels",
      "Dynamic pricing algorithms with ML-based demand prediction and surge modeling",
      "Multi-vendor marketplace with automated commission tracking and settlement",
      "Automated dispatch with Dijkstra-optimized routing and traffic-aware ETAs",
      "Event sourcing architecture with 99.99% message delivery guarantees",
      "Horizontal scaling supporting 50K+ concurrent users across regions"
    ],
    techStack: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "AWS", icon: SiAmazonaws, color: "#FF9900" },
      { name: "Socket.IO", icon: SiSocketdotio, color: "#010101" }
    ],
    features: [
      { icon: Smartphone, title: "Mobile-First", desc: "Progressive web app with offline support" },
      { icon: Zap, title: "Real-Time Tracking", desc: "WebSocket-based location updates" },
      { icon: Database, title: "Multi-Tenant", desc: "Scalable architecture for multiple markets" },
      { icon: Cloud, title: "Auto-Scaling", desc: "Kubernetes deployment with HPA" }
    ],
    images: [
      "/assets/projects-screenshots/deliverusa/marketplace.png",
      "/assets/projects-screenshots/deliverusa/tracking.png",
      "/assets/projects-screenshots/deliverusa/dashboard.png"
    ],
    // Under NDA - Live demo and code not available
    category: "platform",
    gradient: "from-orange-600 via-red-600 to-pink-500"
  },
  {
    id: "music-education",
    title: "EduHarmony Platform",
    subtitle: "Music Education Marketplace & Learning Platform",
    year: "2024",
    type: "EdTech Platform",
    status: "Live",
    description: "Comprehensive music education platform connecting certified instructors with students through an integrated marketplace and learning management system. Features course catalog with video lessons, real-time virtual lessons via WebRTC, progress tracking with practice analytics, and automated payment processing with instructor commission management. Built with scalable architecture supporting multiple instruments and teaching methodologies.",
    highlights: [
      "Real-time video lessons with sub-100ms latency using WebRTC and adaptive streaming",
      "Multi-instrument course catalog with 500+ structured lessons and practice modules",
      "AI-powered practice analytics tracking student progress and identifying improvement areas",
      "Automated payment processing with escrow system and instructor commission management",
      "Virtual classroom with interactive whiteboards, metronome sync, and recording capabilities",
      "Mobile-responsive platform supporting iOS/Android with offline lesson downloads"
    ],
    techStack: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "AWS", icon: SiAmazonaws, color: "#FF9900" },
      { name: "Socket.IO", icon: SiSocketdotio, color: "#010101" }
    ],
    features: [
      { icon: Users, title: "Teacher-Student Matching", desc: "Intelligent matchmaking based on skill level and learning preferences" },
      { icon: Brain, title: "Progress Analytics", desc: "AI-powered practice tracking with personalized improvement suggestions" },
      { icon: Smartphone, title: "Virtual Classroom", desc: "Real-time video lessons with interactive learning tools" },
      { icon: Database, title: "Course Marketplace", desc: "Comprehensive catalog with payment processing and content management" }
    ],
    images: [
      "/assets/projects-screenshots/eduharmony/dashboard.png",
      "/assets/projects-screenshots/eduharmony/lessons.png",
      "/assets/projects-screenshots/eduharmony/marketplace.png"
    ],
    // Under NDA - Live demo and code not available
    category: "education",
    gradient: "from-purple-600 via-pink-600 to-orange-500"
  }
];

const CATEGORIES = [
  { id: "all", label: "All Projects", icon: Code },
  { id: "ai-ml", label: "AI & ML", icon: Brain },
  { id: "healthcare", label: "Healthcare", icon: Lock },
  { id: "platform", label: "Platform", icon: Cloud },
  { id: "education", label: "Education", icon: Users }
];

// Creative floating particles animation
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
        />
      ))}
    </div>
  );
};

// Project card with advanced animations
const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10%" });
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]));

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-full bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-xl border border-zinc-700/50 rounded-3xl overflow-hidden hover:border-zinc-600/50 transition-all duration-500 flex flex-col"
      >
        {/* Gradient Overlay */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
          project.gradient
        )} />
        
        {/* Status Badge */}
        <div className="absolute top-6 right-6 z-10">
          <Badge 
            variant="secondary" 
            className={cn(
              "backdrop-blur-sm border-0 font-medium",
              project.status === "Production" && "bg-green-500/20 text-green-300",
              project.status === "Enterprise" && "bg-blue-500/20 text-blue-300",
              project.status === "Scaling" && "bg-orange-500/20 text-orange-300",
              project.status === "Live" && "bg-purple-500/20 text-purple-300"
            )}
          >
            {project.status}
          </Badge>
        </div>

        {/* Project Header */}
        <div className="p-8 pb-0 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-lg font-medium">{project.subtitle}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-zinc-500">{project.year}</span>
                <span className="text-sm text-zinc-500">•</span>
                <span className="text-sm text-zinc-500">{project.type}</span>
              </div>
            </div>
          </div>

          <p className="text-zinc-300 leading-relaxed mb-6 flex-shrink-0">
            {project.description}
          </p>

          {/* Key Highlights */}
          <div className="mb-6 flex-shrink-0">
            <h4 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">Key Achievements</h4>
            <div className="grid grid-cols-1 gap-2">
              {project.highlights.slice(0, 4).map((highlight: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex-shrink-0 mt-2" />
                  <span className="text-zinc-300 leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-6 flex-shrink-0">
            <h4 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: any, idx: number) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-1.5 text-sm hover:border-zinc-600/50 transition-colors"
                >
                  <tech.icon className="w-4 h-4" style={{ color: tech.color }} />
                  <span className="text-zinc-300">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-6 flex-grow">
            <h4 className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wider">Core Features</h4>
            <div className="grid grid-cols-2 gap-3">
              {project.features.map((feature: any, idx: number) => (
                <div key={idx} className="flex items-start gap-2 p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/30">
                  <feature.icon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <h5 className="text-xs font-medium text-white mb-1">{feature.title}</h5>
                    <p className="text-xs text-zinc-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Status & Details */}
          <div className="mt-auto flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Project Details</h4>
              <Badge 
                variant="secondary" 
                className="bg-zinc-800/60 border border-zinc-700/50 text-zinc-300"
              >
                Under NDA
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div className="flex flex-col gap-1">
                <span className="text-zinc-500">Timeline</span>
                <span className="text-zinc-300 font-medium">{project.year}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-zinc-500">Project Type</span>
                <span className="text-zinc-300 font-medium">{project.type}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-zinc-500">Status</span>
                <span className="text-zinc-300 font-medium">{project.status}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-zinc-500">Category</span>
                <span className="text-zinc-300 font-medium capitalize">{project.category.replace('-', ' & ')}</span>
              </div>
            </div>
            <div className="p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/30 mb-8">
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-300">Note:</strong> This project is under a Non-Disclosure Agreement (NDA). 
                Technical details and implementation specifics have been shared within confidentiality constraints. 
                Live demonstrations and source code access are restricted.
              </p>
            </div>
          </div>
        </div>

        {/* 3D Effect Shadow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl -z-10"
          style={{
            transform: "translateZ(-50px)",
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProjects = PROJECTS.filter(project => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
                Featured Projects
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-12 leading-relaxed">
              Exploring the intersection of AI, healthcare, and scalable platforms. 
              Each project represents months of research, development, and iteration.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {[
                { number: "4+", label: "Major Projects" },
                { number: "99.5%", label: "Uptime SLA" },
                { number: "1000+", label: "Users Served" },
                { number: "95%", label: "Accuracy Rate" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  className="text-center"
                >
                  <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {stat.number}
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 transition-all duration-300",
                    selectedCategory === category.id 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0" 
                      : "border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  )}
                  size="sm"
                >
                  <category.icon className="w-4 h-4" />
                  {category.label}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 auto-rows-fr">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold text-zinc-400 mb-4">No projects found</h3>
              <p className="text-zinc-500">Try adjusting your filters or search query.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Interested in Similar Solutions?
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              While these projects are under NDA, I'd be happy to discuss similar architectures, 
              technical approaches, and how we can build scalable solutions for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                >
                  Discuss Your Project
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                >
                  <Users className="mr-2 w-5 h-5" />
                  Learn More About Me
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
