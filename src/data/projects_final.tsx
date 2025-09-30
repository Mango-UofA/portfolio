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
};

export interface Project {
  title: string;
  year: string;
  skills: (keyof typeof PROJECT_SKILLS)[];
  description: () => ReactNode;
};

const projects: Project[] = [
  {
    title: "InterviewMate — AI Interview Automation",
    year: "2024",
    skills: ["react", "node", "express", "mongodb", "aws", "docker", "socketio", "python"],
    description: () => {
      return (
        <div className="space-y-4">
          <TypographyP>
            <strong>Role:</strong> Founding Engineer, Full-stack + ML
          </TypographyP>
          
          <TypographyP>
            Built an AI-powered interview automation platform that simulates structured interviews 
            by playing prompt videos, capturing candidate responses, and providing granular feedback 
            through advanced speech-to-text and LLM evaluation.
          </TypographyP>
          
          <TypographyH3>Key Achievements</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>End-to-end build: UX, backend APIs, STT/LLM orchestration, data models</li>
            <li>Implemented deterministic scoring system with LLM consistency</li>
            <li>Built real-time transcript sync without flicker or lag</li>
            <li>Architected scalable cloud infrastructure with auto-scaling workers</li>
            <li>Integrated Whisper STT and GPT family LLMs via LangChain</li>
          </ul>

          <TypographyH3>Technical Architecture</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>React (Vite) frontend with HLS video player and WebRTC capture</li>
            <li>Node.js/Express backend with WebSocket for live updates</li>
            <li>BullMQ/Redis queue system for async STT and LLM processing</li>
            <li>AWS S3 + CloudFront for media delivery with signed URLs</li>
            <li>MongoDB Atlas for interviews, transcripts, and scoring data</li>
            <li>OpenTelemetry observability with structured logging</li>
          </ul>
        </div>
      );
    },
  },
  {
    title: "Document Reader SaaS (readerr.io)",
    year: "2024",
    skills: ["react", "node", "express", "mongodb", "aws", "docker"],
    description: () => {
      return (
        <div className="space-y-4">
          <TypographyP>
            <strong>Role:</strong> Full-stack Developer
          </TypographyP>
          
          <TypographyP>
            Developed a comprehensive OCR and document reading workspace that enables users 
            to upload PDFs/images for fast text extraction, search, and annotation capabilities.
          </TypographyP>
          
          <TypographyH3>Core Features</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Multi-stage OCR pipeline with Tesseract and AWS Textract integration</li>
            <li>Responsive PDF.js viewer with virtualized lists for performance</li>
            <li>Real-time annotation system with optimistic UI updates</li>
            <li>Full-text search using OpenSearch/Atlas Search</li>
            <li>Background job orchestration for document processing</li>
          </ul>

          <TypographyH3>Technical Implementation</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Containerized OCR workers with parallel processing</li>
            <li>Pre-processing pipeline for image de-skewing and enhancement</li>
            <li>MongoDB for document metadata and annotation storage</li>
            <li>AWS S3/CloudFront for document delivery and caching</li>
            <li>Blue-green deployment strategy with Infrastructure as Code</li>
            <li>Per-document ACLs with role-based access control</li>
          </ul>
        </div>
      );
    },
  },
  {
    title: "Music Streaming Platform",
    year: "2023",
    skills: ["react", "node", "express", "mongodb", "aws"],
    description: () => {
      return (
        <div className="space-y-4">
          <TypographyP>
            <strong>Role:</strong> Full-stack Developer
          </TypographyP>
          
          <TypographyP>
            Built a comprehensive music streaming platform with upload, transcoding, 
            and streaming capabilities featuring low startup latency and robust social features.
          </TypographyP>
          
          <TypographyH3>Key Features</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>HLS adaptive streaming with multiple bitrate transcoding</li>
            <li>Real-time playlist collaboration and social features</li>
            <li>Waveform visualization and media session controls</li>
            <li>Global CDN delivery with CloudFront optimization</li>
            <li>WebSocket-based live playback presence system</li>
          </ul>

          <TypographyH3>Technical Architecture</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>React SPA with advanced audio player components</li>
            <li>Node.js/Express API with GraphQL for complex aggregations</li>
            <li>FFmpeg transcoding pipeline in ECS/Lambda</li>
            <li>Redis caching for playlist aggregates and rate limiting</li>
            <li>Signed CloudFront URLs for secure content delivery</li>
            <li>QoS event tracking for performance optimization</li>
          </ul>
        </div>
      );
    },
  },
  {
    title: "Healthcare Housing Marketplace",
    year: "2023",
    skills: ["react", "node", "express", "mongodb"],
    description: () => {
      return (
        <div className="space-y-4">
          <TypographyP>
            <strong>Role:</strong> Full-stack Developer
          </TypographyP>
          
          <TypographyP>
            Developed a two-sided marketplace connecting hosts with short-term housing 
            and traveling healthcare professionals, featuring comprehensive trust & safety controls.
          </TypographyP>
          
          <TypographyH3>Marketplace Features</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Advanced search with geolocation and filtering capabilities</li>
            <li>Stripe integration for escrow payments and automated payouts</li>
            <li>Real-time messaging system with attachment support</li>
            <li>Host verification with document upload and ID checking</li>
            <li>Availability calendar with double-booking prevention</li>
          </ul>

          <TypographyH3>Technical Solutions</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>MongoDB geospatial indexes for location-based search</li>
            <li>Transactional booking system with idempotent webhooks</li>
            <li>Multi-size image processing pipeline with WebP optimization</li>
            <li>Atlas Search for text and geographic queries</li>
            <li>Comprehensive audit logging for booking changes</li>
            <li>Rate limiting and content moderation systems</li>
          </ul>
        </div>
      );
    },
  },
  {
    title: "DeliverUSA — Local Delivery Platform",
    year: "2023",
    skills: ["react", "tailwind", "node", "express", "mongodb"],
    description: () => {
      return (
        <div className="space-y-4">
          <TypographyP>
            <strong>Role:</strong> Full-stack Developer & UX Lead
          </TypographyP>
          
          <TypographyP>
            Led the development of a local delivery platform enabling businesses 
            to schedule reliable deliveries with a focus on brand fidelity and user experience.
          </TypographyP>
          
          <TypographyH3>Business Impact</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>Streamlined onboarding flow reducing business setup time by 60%</li>
            <li>Real-time status updates via webhooks and WebSocket connections</li>
            <li>Admin dashboard with comprehensive operational visibility</li>
            <li>Component library aligned to brand guidelines (Freedom Blue/Patriot Red)</li>
            <li>Mobile-responsive design with performance optimization</li>
          </ul>

          <TypographyH3>Technical Excellence</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>React component system with shadcn/ui and Tailwind CSS</li>
            <li>Route-level code splitting for optimal performance</li>
            <li>CI/CD pipeline with preview deployments for PRs</li>
            <li>Image optimization and lazy loading to minimize CLS</li>
            <li>Background notification system with email/SMS integration</li>
            <li>RBAC system for business users and administrators</li>
          </ul>
        </div>
      );
    },
  },
  {
    title: "NeurolyticAI — Clinical Documentation",
    year: "2023",
    skills: ["next", "react", "node", "python", "postgresql", "aws"],
    description: () => {
      return (
        <div className="space-y-4">
          <TypographyP>
            <strong>Role:</strong> Product & Platform Engineer
          </TypographyP>
          
          <TypographyP>
            Built a HIPAA-compliant clinical documentation platform that transforms 
            conversations into structured SOAP notes using advanced NLP and human-in-the-loop review.
          </TypographyP>
          
          <TypographyH3>Clinical Innovation</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>STT transcription with medical terminology normalization</li>
            <li>SNOMED/ICD mapping via rules and ML models</li>
            <li>Structured SOAP note generation with provenance tracking</li>
            <li>Rich text editor with tracked changes and version control</li>
            <li>Export workflows for PDF and CCD-compatible formats</li>
          </ul>

          <TypographyH3>Security & Compliance</TypographyH3>
          <ul className="list-disc list-inside space-y-2 font-mono text-sm">
            <li>End-to-end PHI encryption with AWS KMS</li>
            <li>VPC endpoints and private CloudFront distributions</li>
            <li>Comprehensive audit logging for every system action</li>
            <li>Role-based access control for clinicians and reviewers</li>
            <li>Data retention policies and automated redaction services</li>
            <li>Retrieval-augmented prompts to prevent LLM hallucinations</li>
          </ul>
        </div>
      );
    },
  },
];

export default projects;
export { PROJECT_SKILLS };
