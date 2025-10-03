"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "../ui/animated-modal";
import { FloatingDock } from "../ui/floating-dock";
import Link from "next/link";

import SmoothScroll from "../smooth-scroll";
import projects, { Project, PROJECT_SKILLS } from "@/data/projects";
import { cn } from "@/lib/utils";

const ProjectsSection = () => {
  return (
    <section id="projects" className="max-w-7xl mx-auto min-h-screen py-20 px-4 md:px-6">
      <Link href={"#projects"}>
        <h2
          className={cn(
            "bg-clip-text text-4xl text-center text-transparent md:text-7xl pt-8 pb-4",
            "bg-gradient-to-b from-black/80 to-black/50",
            "dark:bg-gradient-to-b dark:from-white/90 dark:to-white/40 font-bold tracking-tight"
          )}
        >
          Featured Projects
        </h2>
      </Link>
      <p className="text-center text-zinc-400 dark:text-zinc-500 max-w-2xl mx-auto mb-16 text-lg">
        A showcase of my recent work in full-stack development, featuring modern web applications built with cutting-edge technologies.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
        {projects.map((project, index) => (
          <Modall key={`${project.title}-${index}`} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

const Modall = ({ project, index }: { project: Project; index: number }) => {
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-transparent flex justify-center group/modal-btn">
          <div
            className="relative w-[400px] h-auto rounded-lg overflow-hidden"
            style={{ aspectRatio: "3/2" }}
          >
            <div className="absolute w-full h-full top-0 left-0 hover:scale-[1.02] transition-transform duration-300 ease-in-out bg-gradient-to-br from-zinc-800/90 via-zinc-700/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-600 rounded-lg flex items-center justify-center shadow-xl">
              <div className="text-center p-8">
                <h3 className="text-xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-sm text-zinc-100 mb-4">{project.year}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {project.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-zinc-800/70 backdrop-blur-sm border border-zinc-600/50 text-xs font-medium rounded-full text-zinc-200 hover:bg-zinc-700/70 transition-colors duration-200"
                    >
                      {PROJECT_SKILLS[skill].title}
                    </span>
                  ))}
                  {project.skills.length > 4 && (
                    <span className="px-3 py-1.5 bg-zinc-700/80 backdrop-blur-sm border border-zinc-500/50 text-xs font-medium rounded-full text-zinc-300">
                      +{project.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ModalTrigger>
                <ModalBody className="md:max-w-4xl md:max-h-[80%] overflow-auto">
          <SmoothScroll isInsideModal={true}>
            <ModalContent>
              <ProjectContents project={project} />
            </ModalContent>
          </SmoothScroll>
          <CloseButton />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProjectsSection;

const CloseButton = () => {
  const { setOpen } = useModal();
  return (
    <ModalFooter className="gap-4">
      <button 
        onClick={() => setOpen(false)}
        className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28 hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors"
      >
        Close
      </button>
    </ModalFooter>
  );
};

const ProjectContents = ({ project }: { project: Project }) => {
  // Create skills groups for display
  const frontendSkills = project.skills
    .filter(skill => ['react', 'next', 'vue', 'typescript', 'javascript', 'tailwind'].includes(skill))
    .map(skill => ({
      title: PROJECT_SKILLS[skill].title,
      href: "#",
      icon: PROJECT_SKILLS[skill].icon,
    }));

  const backendSkills = project.skills
    .filter(skill => ['node', 'express', 'python', 'mongodb', 'postgresql', 'aws', 'docker'].includes(skill))
    .map(skill => ({
      title: PROJECT_SKILLS[skill].title,
      href: "#",
      icon: PROJECT_SKILLS[skill].icon,
    }));

  return (
    <>
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
        {project.title}
      </h4>
      <div className="flex flex-col md:flex-row md:justify-evenly max-w-screen overflow-hidden md:overflow-visible">
        {frontendSkills.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-8">
            <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
              Frontend
            </p>
            <FloatingDock items={frontendSkills} />
          </div>
        )}
        {backendSkills.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-8">
            <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
              Backend
            </p>
            <FloatingDock items={backendSkills} />
          </div>
        )}
      </div>
      {project.description()}
    </>
  );
};
