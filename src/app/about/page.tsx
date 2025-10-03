"use client";
import React, { useEffect, useState } from "react";
import { DiMongodb, DiNginx, DiNpm, DiPostgresql, DiVim } from "react-icons/di";
import {
  FaAws,
  FaCss3,
  FaDocker,
  FaEnvelope,
  FaGit,
  FaGithub,
  FaHtml5,
  FaLinkedin,
  FaLinux,
  FaNodeJs,
  FaPhone,
  FaReact,
  FaVuejs,
  FaYarn,
} from "react-icons/fa6";
import {
  RiFirebaseFill,
  RiJavascriptFill,
  RiNextjsFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import {
  SiExpress,
  SiJavascript,
  SiKubuntu,
  SiPm2,
  SiPrettier,
  SiTypescript,
  SiVercel,
  SiVisualstudiocode,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { TbTerminal2 } from "react-icons/tb";

const CONTACT_LINKS = [
  {
    name: "Email",
    content: "manglam.srivastav@arizona.edu",
    href: "mailto:manglam.srivastav@arizona.edu",
    icon: <FaEnvelope height={"50px"} />,
  },
  {
    name: "Phone",
    content: "+1 (520) 474-5791",
    href: "tel:+15204745791",
    icon: <FaPhone height={"50px"} />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/manglam-srivastav/",
    content: "/manglam-srivastav",
    icon: <FaLinkedin height={"50px"} />,
  },
  {
    name: "GitHub",
    href: "https://github.com/Mango-UofA",
    content: "/Mango-UofA",
    icon: <FaGithub height={"50px"} />,
  },
];

const TOOLS = [
  {
    name: "JavaScript",
    content: "JavaScript is a high-level, interpreted programming language",
    icon: <SiJavascript size={"50px"} color={"#f0db4f"} />,
    color: "#f0db4f",
  },
  {
    name: "TypeScript",
    content: "TypeScript is a superset of JavaScript that compiles to plain JS",
    icon: <SiTypescript size={"50px"} color={"#007acc"} />,
    color: "#007acc",
  },
  {
    name: "HTML",
    content: "Next.js is a React framework for production",
    icon: <FaHtml5 size={"50px"} color="#e34c26" />,
    color: "#e34c26",
  },
  {
    name: "CSS",
    content: "Next.js is a React framework for production",
    icon: <FaCss3 size={"50px"} color="#563d7c" />,
    color: "#563d7c",
  },
  {
    name: "Nodejs",
    content: "Next.js is a React framework for production",
    icon: <FaNodeJs size={"50px"} color="#6cc24a" />,
    color: "#6cc24a",
  },
  {
    name: "React.js",
    content: "Next.js is a React framework for production",
    icon: <FaReact size={"50px"} color="#61dafb" />,
    color: "#61dafb",
  },
  {
    name: "Docker",
    content: "Next.js is a React framework for production",
    icon: <FaDocker size={"50px"} color="#2496ed" />,
    color: "#2496ed",
  },
  {
    name: "NginX",
    content: "Next.js is a React framework for production",
    icon: <DiNginx size={"50px"} color="#008000" />,
    color: "#008000",
  },
  {
    name: "Vue.js",
    content: "Next.js is a React framework for production",
    icon: <FaVuejs size={"50px"} color="#41b883" />,
    color: "#41b883",
  },
  {
    name: "Express.js",
    content: "Next.js is a React framework for production",
    icon: <SiExpress size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "PostgreSQL",
    content: "Next.js is a React framework for production",
    icon: <DiPostgresql size={"50px"} color="#336791" />,
    color: "#336791",
  },
  {
    name: "MongoDB",
    content: "Next.js is a React framework for production",
    icon: <DiMongodb size={"50px"} color="#4db33d" />,
    color: "#4db33d",
  },
  {
    name: "Tailwind CSS",
    content: "Next.js is a React framework for production",
    icon: <RiTailwindCssFill size={"50px"} color="#06b6d4" />,
    color: "#06b6d4",
  },
  {
    name: "Firebase",
    content: "Next.js is a React framework for production",
    icon: <RiFirebaseFill size={"50px"} color="#FFCA28" />,
    color: "#FFCA28",
  },
  {
    name: "Git",
    content: "Next.js is a React framework for production",
    icon: <FaGit size={"50px"} color="#f05032" />,
    color: "#f05032",
  },
  {
    name: "GitHub",
    content: "Next.js is a React framework for production",
    icon: <FaGithub size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "VS Code",
    content: "Next.js is a React framework for production",
    icon: <SiVisualstudiocode size={"50px"} color="#007acc" />,
    color: "#007acc",
  },
  {
    name: "VIM",
    content: "Next.js is a React framework for production",
    icon: <DiVim size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "Prettier",
    content: "Next.js is a React framework for production",
    icon: <SiPrettier size={"50px"} color="#f7b93c" />,
    color: "#f7b93c",
  },
  {
    name: "NPM",
    content: "Next.js is a React framework for production",
    icon: <DiNpm size={"50px"} color="#CB3837" />,
    color: "#CB3837",
  },
  {
    name: "Yarn",
    content: "Next.js is a React framework for production",
    icon: <FaYarn size={"50px"} color="#2C8EBB" />,
    color: "#2C8EBB",
  },
  {
    name: "Vercel",
    content: "Next.js is a React framework for production",
    icon: <SiVercel size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "Linux",
    content: "Next.js is a React framework for production",
    icon: <FaLinux size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "Kubuntu",
    content: "Next.js is a React framework for production",
    // give me correct color for  kubuntu
    icon: <SiKubuntu size={"50px"} color="#0077C4" />,
    color: "#000000",
  },
  {
    name: "Terminal",
    content: "Next.js is a React framework for production",
    icon: <TbTerminal2 size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "AWS",
    content: "Next.js is a React framework for production",
    icon: <FaAws size={"50px"} color="#3f51b5" />,
    color: "#000000",
  },
];

function Page() {
  const [toolsLoaded, setToolsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    setToolsLoaded(true);
  }, []);
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-16 text-zinc-700 dark:text-zinc-300 py-20 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 justify-center items-start">
          <aside className="w-full lg:w-96 lg:flex-shrink-0">
            <div
              className="p-4 md:p-6 lg:p-10 rounded-2xl border-[.5px] border-zinc-300 dark:border-zinc-600 bg-white/50 dark:bg-transparent w-full"
              style={{
                backdropFilter: "blur(2px)",
              }}
            >
            <div className="flex flex-row lg:flex-col items-center">
              <div className="flex justify-center items-center lg:w-full lg:aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-xl lg:mb-5 overflow-hidden">
                <img
                  className="rounded-xl w-[120px] md:w-[180px] lg:w-full aspect-square object-cover"
                  alt="me"
                  src="/assets/me.jpg"
                />
              </div>
              <div className="flex flex-col gap-4 lg:items-center ml-6 md:ml-8 lg:ml-0">
                <p className="lg:text-center text-xl lg:text-2xl font-medium">Manglam Srivastav</p>
                <div className="text-xs bg-zinc-300 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 w-fit px-3 py-1 rounded-full">
                  Full-Stack Developer
                </div>
                <div className="text-xs bg-blue-200 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 w-fit px-3 py-1 rounded-full">
                  MS Information Science
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <hr className="my-10 border-zinc-300 dark:border-zinc-600" />
              <ul className="flex flex-col gap-3">
                {CONTACT_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      className="flex items-center px-3 gap-3 w-full h-12 border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 border-[.5px] rounded-md "
                      href={link.href}
                      {...(link.name === "LinkedIn" || link.name === "GitHub" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <div className="w-8">{link.icon}</div>
                      <div className="flex flex-col">
                        <div className="text-sm">{link.name}</div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-500">
                          {link.content}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Mobile Contact Links */}
          <div className="lg:hidden mt-4">
            <div className="p-4 md:p-6 rounded-2xl border-[.5px] border-zinc-300 dark:border-zinc-600 bg-white/50 dark:bg-transparent" style={{ backdropFilter: "blur(2px)" }}>
              <h3 className="text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-300">Contact</h3>
              <div className="grid grid-cols-2 gap-2">
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.name}
                    className="flex items-center justify-center p-3 border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 border-[.5px] rounded-md text-center"
                    href={link.href}
                    {...(link.name === "LinkedIn" || link.name === "GitHub" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-5 h-5 flex items-center justify-center">
                        {React.cloneElement(link.icon as React.ReactElement, { height: "20px", width: "20px" })}
                      </div>
                      <div className="text-xs">{link.name}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          </aside>
          <main className="flex-1 w-full lg:max-w-4xl">
            <div
              className="p-4 md:p-6 lg:p-10 xl:p-12 border-[.5px] rounded-md border-zinc-300 dark:border-zinc-600 bg-white/50 dark:bg-transparent w-full"
              style={{ backdropFilter: "blur(2px)" }}
            >
            <h1 className="text-2xl md:text-3xl mb-6 md:mb-10 lg:mb-20">About me</h1>
            <p className="mb-4 md:mb-6 text-sm md:text-base text-roboto leading-relaxed">
              Hey there! I'm <span className="text-blue-600 dark:text-blue-400 font-semibold">Manglam Srivastav</span>, a Full-Stack Software Developer with over two years of professional experience building scalable, cloud-native applications. My expertise lies in the <span className="text-green-600 dark:text-green-400">MERN stack</span> (MongoDB, Express.js, React.js, Node.js) and SQL databases (PostgreSQL, MySQL), combined with strong skills in AWS services, REST API design, and CI/CD workflows.
            </p>
            <p className="mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
              I enjoy building end-to-end solutions—from designing sleek, responsive frontends in <span className="text-cyan-600 dark:text-cyan-400">React.js & Tailwind CSS</span> to architecting robust backend systems in <span className="text-yellow-600 dark:text-yellow-400">Node.js/Express</span>. I've deployed applications on AWS EC2, Lightsail, and S3, optimized APIs for performance, and integrated third-party services for real-world use cases.
            </p>
            <p className="mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
              Currently, I'm pursuing my <span className="text-purple-600 dark:text-purple-400 font-semibold">Master's in Information Science</span> with a focus on Machine Learning at the University of Arizona, which complements my development work by bringing data-driven insights and intelligent features into the products I build.
            </p>
            <p className="mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
              Throughout my career, I've contributed to projects spanning <span className="text-orange-600 dark:text-orange-400">logistics and supply chain management</span> as well as <span className="text-pink-600 dark:text-pink-400">enterprise automation and AI-driven solutions</span>. These experiences have strengthened my ability to deliver scalable, production-ready applications that address real-world business challenges and enhance user experiences across diverse industries.
            </p>
            
            <div className="bg-gradient-to-r from-blue-200/30 to-purple-200/30 dark:from-blue-900/20 dark:to-purple-900/20 p-4 md:p-6 rounded-lg border border-zinc-300 dark:border-zinc-700 mb-6 md:mb-10">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-blue-600 dark:text-blue-300">🎯 What I'm passionate about:</h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                <li>• Building products that are not just functional but also impactful</li>
                <li>• Creating scalable backends and responsive UIs that users love</li>
                <li>• Exploring the intersection of software development and machine learning</li>
                <li>• Contributing to open-source projects and the developer community</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10">
              <div className="bg-zinc-100/80 dark:bg-zinc-800/50 p-4 md:p-5 rounded-lg border border-zinc-300 dark:border-zinc-700">
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-green-600 dark:text-green-300">💼 Professional Experience</h3>
                <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300">2+ years in full-stack development</p>
                <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300">MERN stack specialist</p>
                <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300">AWS cloud deployment expert</p>
              </div>
              <div className="bg-zinc-100/80 dark:bg-zinc-800/50 p-4 md:p-5 rounded-lg border border-zinc-300 dark:border-zinc-700">
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-purple-600 dark:text-purple-300">🎓 Education</h3>
                <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300">MS Information Science (ML Focus)</p>
                <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300">University of Arizona</p>
                <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300">GPA: 4.0</p>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl mb-6 md:mb-10 lg:mb-20">Stuff I use</h1>
            <div className="mb-5" suppressHydrationWarning={true}>
              {!isClient || !toolsLoaded ? (
                <div className="h-[100px] flex items-center justify-center">
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">Loading technologies...</div>
                </div>
              ) : (
                <Splide
                  options={{
                    type: "loop",
                    interval: 2000,
                    autoplay: true,
                    pagination: false,
                    speed: 2000,
                    perPage: 5,
                    perMove: 1,
                    rewind: true,
                    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                    arrows: false,
                    breakpoints: {
                      640: {
                        perPage: 2,
                      },
                      768: {
                        perPage: 3,
                      },
                      1024: {
                        perPage: 4,
                      },
                    },
                  }}
                  aria-label="My Favorite Technologies"
                >
                  {TOOLS.reverse().map((tool) => (
                    <SplideSlide key={tool.name}>
                      <div
                        key={tool.name}
                        className="w-fit p-2 border-[.5px] border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-transparent rounded-md"
                      >
                        {tool.icon}
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              )}
            </div>
            {/* <div className="">
              <Splide
                options={{
                  type: "loop",
                  interval: 2000,
                  autoplay: true,
                  pagination: false,
                  speed: 3000,
                  perPage: 5,
                  perMove: 1,
                  rewind: true,
                  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                  arrows: false,
                }}
                aria-label="My Favorite Images"
              >
                {TOOLS.map((tool) => (
                  <SplideSlide key={tool.name}>
                    <div
                      key={tool.name}
                      className="w-fit p-2 border-[.5px] border-zinc-600 rounded-md"
                    >
                      {tool.icon}
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Page;
