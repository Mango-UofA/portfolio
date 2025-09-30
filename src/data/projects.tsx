import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiChakraui,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiShadcnui,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
  SiAmazonaws,
  SiGit,
  SiGithub,
  SiVercel,
  SiNetlify,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant={"default"} size={"sm"}>
          Visit Website
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"secondary"} size={"sm"}>
            Source Code
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

const PROJECT_SKILLS = {
  react: {
    title: "React",
    href: "https://reactjs.org/",
    icon: <RiReactjsFill />,
  },
  vue: {
    title: "Vue.js",
    href: "https://vuejs.org/",
    icon: <SiVuedotjs />,
  },
  tailwind: {
    title: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    icon: <SiTailwindcss />,
  },
  express: {
    title: "Express.js",
    href: "https://expressjs.com/",
    icon: <SiExpress />,
  },
  mongodb: {
    title: "MongoDB",
    href: "https://www.mongodb.com/",
    icon: <SiMongodb />,
  },
  git: {
    title: "Git",
    href: "https://git-scm.com/",
    icon: <SiGit />,
  },
  github: {
    title: "GitHub",
    href: "https://github.com/",
    icon: <SiGithub />,
  },
  firebase: {
    title: "Firebase",
    href: "https://firebase.google.com/",
    icon: <SiFirebase />,
  },
  docker: {
    title: "Docker",
    href: "https://www.docker.com/",
    icon: <SiDocker />,
  },
  aws: {
    title: "AWS",
    href: "https://aws.amazon.com/",
    icon: <SiAmazonaws />,
  },
  vercel: {
    title: "Vercel",
    href: "https://vercel.com/",
    icon: <SiVercel />,
  },
  next: {
    title: "Next.js",
    href: "https://nextjs.org/",
    icon: <RiNextjsFill />,
  },
  node: {
    title: "Node.js",
    href: "https://nodejs.org/",
    icon: <RiNodejsFill />,
  },
  javascript: {
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    icon: <SiJavascript />,
  },
  typescript: {
    title: "TypeScript",
    href: "https://www.typescriptlang.org/",
    icon: <SiTypescript />,
  },
  postgresql: {
    title: "PostgreSQL",
    href: "https://www.postgresql.org/",
    icon: <SiPostgresql />,
  },
  prisma: {
    title: "Prisma",
    href: "https://www.prisma.io/",
    icon: <SiPrisma />,
  },
  socketio: {
    title: "Socket.io",
    href: "https://socket.io/",
    icon: <SiSocketdotio />,
  },
  python: {
    title: "Python",
    href: "https://www.python.org/",
    icon: <SiPython />,
  },
  fastapi: {
    title: "FastAPI",
    href: "https://fastapi.tiangolo.com/",
    icon: <SiPython />,
  },
  reactquery: {
    title: "React Query",
    href: "https://tanstack.com/query",
    icon: <SiReactquery />,
  },
  framermotion: {
    title: "Framer Motion",
    href: "https://www.framer.com/motion/",
    icon: <TbBrandFramerMotion />,
  },
  shadcnui: {
    title: "shadcn/ui",
    href: "https://ui.shadcn.com/",
    icon: <SiShadcnui />,
  },
  chakra: {
    title: "Chakra UI",
    href: "https://chakra-ui.com/",
    icon: <SiChakraui />,
  },
  netlify: {
    title: "Netlify",
    href: "https://www.netlify.com/",
    icon: <SiNetlify />,
  },
  angular: {
    title: "Angular",
    href: "https://angular.io/",
    icon: <SiJavascript />, // Using JS icon as placeholder
  },
  redis: {
    title: "Redis",
    href: "https://redis.io/",
    icon: <SiDocker />, // Using Docker icon as placeholder
  },
  graphql: {
    title: "GraphQL",
    href: "https://graphql.org/",
    icon: <SiJavascript />,
  },
  stripe: {
    title: "Stripe",
    href: "https://stripe.com/",
    icon: <SiJavascript />,
  },
  jwt: {
    title: "JWT",
    href: "https://jwt.io/",
    icon: <SiJavascript />,
  },
  websocket: {
    title: "WebSocket",
    href: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
    icon: <SiSocketdotio />,
  },
  webrtc: {
    title: "WebRTC",
    href: "https://webrtc.org/",
    icon: <SiJavascript />,
  },
  tesseract: {
    title: "Tesseract OCR",
    href: "https://tesseract-ocr.github.io/",
    icon: <SiPython />,
  },
  langchain: {
    title: "LangChain",
    href: "https://langchain.com/",
    icon: <SiPython />,
  },
  opentelemetry: {
    title: "OpenTelemetry",
    href: "https://opentelemetry.io/",
    icon: <SiDocker />,
  },
};

export interface Project {
  title: string;
  year: string;
  skills: (keyof typeof PROJECT_SKILLS)[];
  description: () => ReactNode;
};

const projects: Project[] = [
  {
    title: "InterviewMate - AI Interview Automation",
    year: "2025",
    skills: ["react", "node", "express", "mongodb", "aws", "docker", "socketio", "python", "redis", "websocket", "webrtc", "langchain", "opentelemetry"],
    description: () => {
      return (
        <div className="space-y-6">
          <TypographyP>
            <strong>Role:</strong> Founding Engineer, Full-stack + ML
          </TypographyP>
          
          <TypographyP>
            Built an AI-powered interview automation platform that simulates structured interviews 
            by playing prompt videos, capturing candidate responses, and providing granular feedback 
            through advanced speech-to-text and LLM evaluation. The platform eliminates flicker 
            and lag while providing deterministic scoring.
          </TypographyP>
          
          <TypographyH3>Problem Statement</TypographyH3>
          <TypographyP className="text-sm text-gray-600 dark:text-gray-400">
            Traditional interview processes are time-consuming and inconsistent. The goal was to create 
            a system that could simulate structured interviews, capture audio/video responses, 
            transcribe with high accuracy, and evaluate against rubrics using LLMs while maintaining 
            real-time performance.
          </TypographyP>

          <TypographyH3>Key Achievements</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>End-to-end build: UX design, backend APIs, STT/LLM orchestration, data models</li>
            <li>Implemented deterministic scoring system with LLM consistency and temperature control</li>
            <li>Built real-time transcript sync without flicker or lag using WebSocket optimization</li>
            <li>Architected scalable cloud infrastructure with auto-scaling workers based on queue depth</li>
            <li>Integrated Whisper STT and GPT family LLMs via LangChain with prompt templating</li>
            <li>Achieved 99.5% uptime with comprehensive observability and monitoring</li>
            <li>Implemented idempotent webhooks to prevent double-scoring scenarios</li>
          </ul>

          <TypographyH3>Technical Architecture</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>React (Vite) frontend with HLS video player, Web Audio API, and WebRTC capture</li>
            <li>Node.js/Express backend with WebSocket/Socket.IO for live transcript updates</li>
            <li>BullMQ (Redis) and SQS queue systems for async STT and LLM processing workflows</li>
            <li>AWS S3 (pre-signed URLs) + CloudFront CDN for secure media delivery</li>
            <li>MongoDB Atlas for interviews, transcripts, scores with structured data models</li>
            <li>OpenTelemetry distributed tracing with structured logging (pino/winston)</li>
            <li>Docker containerization with PM2 process management and GitHub Actions CI/CD</li>
          </ul>

          <TypographyH3>Security & Performance</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>JWT + refresh token rotation with rate limiting via Redis</li>
            <li>Signed S3 URLs with private CloudFront distributions and TLS everywhere</li>
            <li>PII minimization with MongoDB/Redis encryption-at-rest</li>
            <li>Chunked uploads with autoscaling workers by queue depth and CPU metrics</li>
            <li>LLM prompt/response sampling with redaction for compliance</li>
            <li>Audit logging for all scoring decisions and user interactions</li>
          </ul>

          <TypographyH3>Notable Technical Challenges</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li><strong>Video + Transcript Sync:</strong> Solved flicker issues with optimized WebSocket event handling</li>
            <li><strong>LLM Consistency:</strong> Implemented deterministic rubric prompts with constrained JSON schema outputs</li>
            <li><strong>Scalability:</strong> Built queue-based architecture handling 1000+ concurrent interviews</li>
            <li><strong>Latency:</strong> Achieved sub-2s STT processing with optimized Whisper deployment</li>
          </ul>
        </div>
      );
    },
  },
  {
    title: "NeurolyticAI - Clinical Documentation",
    year: "2025",
    skills: ["react", "node", "python", "postgresql", "aws", "fastapi", "jwt", "docker"],
    description: () => {
      return (
        <div className="space-y-6">
          <TypographyP>
            <strong>Role:</strong> Product & Platform Engineer
          </TypographyP>
          
          <TypographyP>
            Built a HIPAA-compliant clinical documentation platform that transforms 
            conversations into structured SOAP notes using advanced NLP and human-in-the-loop review.
            Designed specifically for healthcare providers to reduce documentation time while 
            maintaining accuracy and compliance with medical standards.
          </TypographyP>

          <TypographyH3>Problem Statement</TypographyH3>
          <TypographyP className="text-sm text-gray-600 dark:text-gray-400">
            Clinicians spend 40-60% of their time on documentation instead of patient care. 
            Traditional EHR systems are cumbersome and don't leverage modern AI capabilities. 
            The goal was to create an AI-powered solution that could accurately transform 
            clinical conversations into structured notes while maintaining audit trails and compliance.
          </TypographyP>
          
          <TypographyH3>Clinical Innovation</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Speech-to-text transcription with medical terminology normalization and speaker diarization</li>
            <li>SNOMED/ICD-10 terminology mapping via rules engine and ML models with 95% accuracy</li>
            <li>Structured SOAP note generation with provenance tracking and citation linking</li>
            <li>Rich text editor with tracked changes, version control, and collaborative review</li>
            <li>Export workflows for PDF, CCD-compatible formats, and direct EHR integration</li>
            <li>Clinical decision support with drug interaction checking and allergy alerts</li>
            <li>Quality assurance dashboard for reviewing AI confidence scores and flagged content</li>
          </ul>

          <TypographyH3>Technical Architecture</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Next.js/React frontend with server-side rendering for optimal performance</li>
            <li>Node.js API gateway with authentication and rate limiting for frontend services</li>
            <li>Python FastAPI microservices for ML/NLP tasks with async processing capabilities</li>
            <li>PostgreSQL for structured data (notes, patients, audit logs) with JSONB for flexibility</li>
            <li>MongoDB for intermediate artifacts, document storage, and unstructured data</li>
            <li>Redis for caching, session management, and job queue coordination</li>
            <li>Docker containerization with Kubernetes orchestration for auto-scaling</li>
          </ul>

          <TypographyH3>AI/ML Pipeline</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Multi-stage NLP pipeline: STT → chunking → entity extraction → terminology mapping</li>
            <li>Custom medical language models fine-tuned on clinical documentation datasets</li>
            <li>Retrieval-augmented generation (RAG) with medical knowledge base integration</li>
            <li>Confidence scoring and uncertainty quantification for AI-generated content</li>
            <li>Continuous learning system with clinician feedback loop for model improvement</li>
            <li>A/B testing framework for prompt optimization and model performance comparison</li>
          </ul>

          <TypographyH3>Security & Compliance</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>HIPAA compliance: BAA agreements, PHI encryption, access controls, audit logging</li>
            <li>End-to-end PHI encryption using AWS KMS with customer-managed keys</li>
            <li>VPC endpoints and private CloudFront distributions for secure data transmission</li>
            <li>Role-based access control (RBAC) for clinicians, reviewers, and administrators</li>
            <li>Comprehensive audit logging for every system action with immutable records</li>
            <li>Data retention policies with automated deletion and secure data destruction</li>
            <li>Penetration testing and security assessments with third-party validation</li>
          </ul>

          <TypographyH3>Performance & Scalability</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Batch processing during off-peak hours with priority queues for urgent notes</li>
            <li>Horizontal scaling of ML workers based on queue depth and processing time</li>
            <li>Intelligent caching of terminology dictionaries and frequently accessed patient data</li>
            <li>Database optimization: partitioning by date, indexing strategies for clinical queries</li>
            <li>CDN distribution for static assets with edge locations for global access</li>
            <li>Real-time monitoring with alerting for system health and performance metrics</li>
          </ul>

          <TypographyH3>Quality Assurance & Monitoring</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>LLM latency and token usage tracking with cost optimization algorithms</li>
            <li>STT accuracy sampling with manual review and continuous improvement</li>
            <li>Clinician acceptance rate monitoring and feedback collection system</li>
            <li>Drift detection for terminology mapping accuracy over time</li>
            <li>Dead-letter queues with admin interface for failed processing recovery</li>
            <li>Clinical outcome tracking to measure documentation quality improvements</li>
          </ul>
        </div>
      );
    },
  },
  {
    title: "DeliverUSA - Local Delivery Platform",
    year: "2025",
    skills: ["react", "tailwind", "node", "express", "mongodb", "shadcnui", "websocket", "jwt"],
    description: () => {
      return (
        <div className="space-y-6">
          <TypographyP>
            <strong>Role:</strong> Full-stack Developer & UX Lead
          </TypographyP>
          
          <TypographyP>
            Led the complete development of a patriotic-themed local delivery platform enabling 
            businesses (especially restaurants) to schedule reliable deliveries with a focus on 
            brand fidelity, user experience, and operational efficiency. Built from concept to 
            production with comprehensive admin tools.
          </TypographyP>

          <TypographyH3>Problem Statement</TypographyH3>
          <TypographyP className="text-sm text-gray-600 dark:text-gray-400">
            Local businesses needed a reliable delivery solution that could compete with major 
            platforms while maintaining American values and supporting local economies. The platform 
            required seamless onboarding, real-time tracking, and operational visibility for 
            business owners and administrators.
          </TypographyP>
          
          <TypographyH3>Business Impact</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Reduced business onboarding time by 60% with streamlined verification flow</li>
            <li>Real-time status updates via webhooks and WebSocket connections for live tracking</li>
            <li>Comprehensive admin dashboard with operational visibility and analytics</li>
            <li>Custom component library aligned to patriotic brand (Freedom Blue/Patriot Red/Sky Bright)</li>
            <li>Mobile-responsive design achieving 98% mobile satisfaction score</li>
            <li>Automated driver assignment system reducing manual workload by 80%</li>
            <li>Integration with popular POS systems for seamless order import</li>
          </ul>

          <TypographyH3>Technical Excellence</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>React component system with shadcn/ui and Tailwind CSS design system</li>
            <li>Route-level code splitting achieving 90% reduction in initial bundle size</li>
            <li>GitHub Actions CI/CD pipeline with preview deployments for every PR</li>
            <li>Image optimization and lazy loading minimizing Cumulative Layout Shift (CLS)</li>
            <li>Background notification system with email/SMS integration via SendGrid and Twilio</li>
            <li>Role-based access control (RBAC) for business users, drivers, and administrators</li>
            <li>Progressive Web App (PWA) with offline capability for drivers</li>
          </ul>

          <TypographyH3>Architecture & Infrastructure</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Node.js/Express REST API with comprehensive input validation and rate limiting</li>
            <li>MongoDB with optimized indexing for delivery requests, driver locations, and analytics</li>
            <li>WebSocket real-time updates for order status, driver location, and notifications</li>
            <li>Netlify frontend deployment with AWS Lightsail/EC2 for API hosting</li>
            <li>CloudFront CDN for static assets with automatic compression and caching</li>
            <li>PM2 process management with cluster mode for high availability</li>
            <li>Environment-based configuration management for staging and production</li>
          </ul>

          <TypographyH3>User Experience & Design</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Brand-focused design system reflecting American values with patriotic color palette</li>
            <li>Intuitive business dashboard with drag-and-drop delivery scheduling</li>
            <li>Driver mobile app with GPS navigation and delivery confirmation features</li>
            <li>Customer tracking portal with real-time delivery updates and ETA calculations</li>
            <li>Accessibility compliance (WCAG 2.1 AA) with screen reader optimization</li>
            <li>Performance optimization: &lt;2s page load times and 95+ Lighthouse scores</li>
          </ul>

          <TypographyH3>Monitoring & Analytics</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Request lifecycle metrics from creation to delivery completion</li>
            <li>Status transition audits with detailed logging for compliance and debugging</li>
            <li>Error tracking with Sentry integration for proactive issue resolution</li>
            <li>Custom analytics dashboard showing delivery success rates and performance KPIs</li>
            <li>Business intelligence reports for revenue tracking and operational optimization</li>
          </ul>
        </div>
      );
    },
  },
  {
    title: "Healthcare Housing Marketplace",
    year: "2024",
    skills: ["react", "node", "express", "mongodb", "stripe", "tailwind", "websocket", "jwt"],
    description: () => {
      return (
        <div className="space-y-6">
          <TypographyP>
            <strong>Role:</strong> Full-stack Developer
          </TypographyP>
          
          <TypographyP>
            Developed a specialized two-sided marketplace connecting hosts with short-term housing 
            and traveling healthcare professionals, featuring comprehensive trust & safety controls,
            secure payments, and industry-specific verification systems designed for the healthcare 
            travel market.
          </TypographyP>

          <TypographyH3>Problem Statement</TypographyH3>
          <TypographyP className="text-sm text-gray-600 dark:text-gray-400">
            Healthcare travel professionals needed reliable, vetted short-term housing near hospitals 
            and medical facilities. Traditional platforms lacked industry-specific features like 
            credential verification, healthcare facility proximity, and flexible booking for 
            assignment changes.
          </TypographyP>
          
          <TypographyH3>Marketplace Features</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Advanced geospatial search with hospital/clinic proximity filtering (within 5-50 miles)</li>
            <li>Stripe Connect integration for escrow payments, automated payouts, and fee management</li>
            <li>Real-time messaging system with file attachments, read receipts, and moderation</li>
            <li>Healthcare professional verification: licenses, certifications, background checks</li>
            <li>Host verification with document upload, ID checking, and property validation</li>
            <li>Dynamic availability calendar with assignment-based booking and cancellation policies</li>
            <li>Rating and review system with healthcare-specific criteria</li>
            <li>Insurance integration and damage protection coverage</li>
          </ul>

          <TypographyH3>Technical Solutions</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>React frontend with Tailwind CSS, responsive design, and mobile-first approach</li>
            <li>MongoDB geospatial indexes (2dsphere) for location-based search and distance queries</li>
            <li>Transactional booking system with MongoDB transactions and idempotent Stripe webhooks</li>
            <li>Multi-size image processing pipeline with WebP optimization and lazy loading</li>
            <li>Atlas Search for full-text and geographic queries with relevance scoring</li>
            <li>WebSocket real-time messaging with typing indicators and presence status</li>
            <li>Background workers for verification document processing and compliance checks</li>
          </ul>

          <TypographyH3>Trust & Safety</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Multi-step identity verification with third-party ID verification services</li>
            <li>Healthcare license verification against state databases and registries</li>
            <li>Automated fraud detection based on booking patterns and user behavior</li>
            <li>Content moderation queue for listing reviews and user communications</li>
            <li>Comprehensive audit logging for all booking changes and financial transactions</li>
            <li>Rate limiting and abuse prevention for messaging and booking attempts</li>
          </ul>

          <TypographyH3>Performance & Security</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>CDN-optimized images with automatic format conversion (WebP, AVIF)</li>
            <li>Server-side pagination with cursor-based scrolling for large result sets</li>
            <li>Database optimization: compound indexes for search queries and booking lookups</li>
            <li>Stripe PCI compliance offloading for secure payment processing</li>
            <li>Encryption-at-rest for sensitive documents and personal information</li>
            <li>GDPR compliance with data retention policies and user data export capabilities</li>
          </ul>

          <TypographyH3>Analytics & Business Intelligence</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Booking funnel analysis: search → view → inquiry → booking conversion rates</li>
            <li>Geographic heat maps for demand patterns and pricing optimization</li>
            <li>Host performance metrics: response time, acceptance rate, guest satisfaction</li>
            <li>Revenue analytics with detailed breakdowns by region, property type, and season</li>
            <li>Automated reporting for stakeholders with key performance indicators</li>
          </ul>
        </div>
      );
    },
  },
  {
    title: "Music Education Platform",
    year: "2024",
    skills: ["react", "node", "express", "postgresql", "aws", "redis", "websocket", "jwt"],
    description: () => {
      return (
        <div className="space-y-6">
          <TypographyP>
            <strong>Role:</strong> Full-stack Developer
          </TypographyP>
          
          <TypographyP>
            Built a comprehensive music education marketplace connecting certified instructors 
            with students through integrated course management, real-time virtual lessons, 
            and interactive learning tools. Platform supports multiple instruments with 
            structured learning pathways and progress tracking analytics.
          </TypographyP>

          <TypographyH3>Problem Statement</TypographyH3>
          <TypographyP className="text-sm text-gray-600 dark:text-gray-400">
            Create an intuitive platform where music teachers can offer structured courses 
            and connect with students for personalized instruction, featuring seamless payment 
            processing, interactive learning tools, and comprehensive progress tracking.
          </TypographyP>
          
          <TypographyH3>Key Features</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Real-time video lessons with WebRTC and interactive virtual classroom tools</li>
            <li>Course marketplace with structured learning modules and progress tracking</li>
            <li>Teacher-student matching algorithm based on skill level and learning preferences</li>
            <li>Interactive practice sessions with metronome sync and recording capabilities</li>
            <li>Payment processing with automated teacher commission distribution</li>
            <li>Practice analytics tracking student progress and identifying improvement areas</li>
            <li>Mobile-responsive design with offline lesson content downloads</li>
            <li>Multi-instrument support with specialized course templates</li>
          </ul>

          <TypographyH3>Technical Architecture</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>React SPA with video conferencing components and Web Audio API integration</li>
            <li>Node.js/Express REST API with real-time communication via Socket.IO</li>
            <li>PostgreSQL with optimized schemas for courses, lessons, and user progress</li>
            <li>Redis caching for active sessions and real-time collaboration features</li>
            <li>AWS S3 for lesson recordings and course materials with CDN delivery</li>
            <li>WebRTC implementation for low-latency video/audio communication</li>
            <li>JWT authentication with role-based access (students, teachers, admins)</li>
          </ul>

          <TypographyH3>Performance & Scalability</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Edge-cached HLS segments with 99.9% cache hit ratio across 200+ locations</li>
            <li>Pre-warming system for trending tracks to eliminate cold-start delays</li>
            <li>Background batch jobs for playlist aggregate refresh and recommendation updates</li>
            <li>Database sharding strategy for user data and listening history</li>
            <li>Real-time QoS metrics: startup time, stall events, bitrate adaptation</li>
            <li>Auto-scaling based on concurrent streams and upload queue depth</li>
          </ul>

          <TypographyH3>Analytics & Monitoring</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Player QoS events shipped to analytics pipeline for performance optimization</li>
            <li>Real-time dashboard monitoring p95 latencies by route and region</li>
            <li>S3/CloudFront access logs analysis for content popularity and geographic trends</li>
            <li>Revenue tracking and royalty calculation system for artist payouts</li>
            <li>A/B testing framework for UI/UX improvements and recommendation algorithms</li>
          </ul>
        </div>
      );
    },
  },
  {
    title: "Document Reader SaaS Platform",
    year: "2022",
    skills: ["react", "node", "express", "mongodb", "aws", "docker", "tesseract", "tailwind", "redis"],
    description: () => {
      return (
        <div className="space-y-6">
          <TypographyP>
            <strong>Role:</strong> Full-stack Developer
          </TypographyP>
          
          <TypographyP>
            Developed a comprehensive OCR and document reading workspace that enables users 
            to upload PDFs/images for fast text extraction, search, and annotation capabilities. 
            Built a multi-stage ingestion pipeline with enterprise-grade performance and scalability.
          </TypographyP>

          <TypographyH3>Problem Statement</TypographyH3>
          <TypographyP className="text-sm text-gray-600 dark:text-gray-400">
            Users needed a reliable solution for extracting text from mixed-quality documents, 
            including scanned PDFs and images, with the ability to search, annotate, and organize 
            content in a responsive reading workspace. Traditional OCR solutions lacked accuracy 
            and modern UI/UX.
          </TypographyP>
          
          <TypographyH3>Core Features</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Multi-stage OCR pipeline with Tesseract and AWS Textract integration</li>
            <li>Responsive PDF.js viewer with virtualized lists for 1000+ page documents</li>
            <li>Real-time annotation system with optimistic UI updates and conflict resolution</li>
            <li>Full-text search using OpenSearch/Atlas Search with relevance scoring</li>
            <li>Background job orchestration for document processing with progress tracking</li>
            <li>Collaborative workspace with team permissions and document sharing</li>
            <li>Export capabilities to multiple formats (PDF, DOCX, TXT, JSON)</li>
          </ul>

          <TypographyH3>Technical Implementation</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>React frontend with Tailwind CSS and virtualized scrolling for performance</li>
            <li>Containerized OCR workers with parallel processing and load balancing</li>
            <li>Pre-processing pipeline: image de-skewing, contrast enhancement, noise reduction</li>
            <li>MongoDB for document metadata, page blocks, and annotation storage</li>
            <li>AWS S3/CloudFront for document delivery with lifecycle management</li>
            <li>Redis for caching frequently accessed documents and search results</li>
            <li>Blue-green deployment strategy with Infrastructure as Code (Terraform)</li>
          </ul>

          <TypographyH3>Architecture & Scalability</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Microservices architecture: Upload → Ingestion → OCR → Indexing → API</li>
            <li>Event-driven processing with SNS/SQS for reliable job orchestration</li>
            <li>Horizontal scaling with ECS/Lambda for OCR workers based on queue depth</li>
            <li>CDN caching for pre-rendered page images and thumbnails</li>
            <li>Database indexing strategy: compound indexes on docId, pageId, and text blocks</li>
            <li>Dead-letter queues with admin dashboard for failed job monitoring</li>
          </ul>

          <TypographyH3>Security & Performance</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Role-based access control with per-document ACLs and organization scoping</li>
            <li>Signed download URLs with time-based expiration for sensitive documents</li>
            <li>Encrypted-at-rest storage for all documents and user data</li>
            <li>Audit trails for all annotation edits and document access</li>
            <li>Performance optimization: lazy loading, pagination, and streaming for large files</li>
            <li>OCR confidence scoring with re-processing fallback for low-quality results</li>
          </ul>
        </div>
      );
    },
  },
];

export default projects;
export { PROJECT_SKILLS };
