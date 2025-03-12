"use client";
import React, { useState, useEffect, useRef } from "react";
import TabButton from "./TabButton";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDocker, FaGitSquare } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiShadcnui, SiTypescript, SiKubernetes, SiKotlin } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const stacks = [
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <RiNextjsFill /> },
  { name: "TailwindCSS", icon: <RiTailwindCssFill /> },
  { name: "Shadcn", icon: <SiShadcnui /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "PostgreSQL", icon: <BiLogoPostgresql /> },
  { name: "Docker", icon: <FaDocker /> },
  { name: "Kubernetes", icon: <SiKubernetes /> },
  { name: "React Native", icon: <TbBrandReactNative /> },
  { name: "Kotlin", icon: <SiKotlin /> },
  { name: "Git", icon: <FaGitSquare /> },
];

const InfiniteScroll: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrame: number;
    const speed = 1.5;

    const scroll = () => {
      if (isPaused) return;
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
      scrollContainer.scrollLeft += speed;
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  return (
    <div className="relative w-full flex justify-center items-center mt-6">
        
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#121212] to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#121212] to-transparent pointer-events-none"></div>

      <div
        ref={scrollRef}
        className="overflow-hidden whitespace-nowrap w-full mt-5 lg:mt-10"
        onClick={() => setIsPaused(!isPaused)}
      >
        <div className="flex w-max">
          {[...stacks, ...stacks].map((stack, index) => (
            <div
              key={index}
              className="mx-6 text-2xl md:text-3xl lg:text-4xl text-white flex items-center"
            >
              <div className="mr-2">{stack.icon}</div>
              {stack.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface Tab {
  title: string;
  id: string;
  content: React.ReactNode;
}

const TAB_DATA: Tab[] = [
  {
    title: "Stack",
    id: "techstack",
    content: <InfiniteScroll />,
  },
  {
    title: "Acadêmico",
    id: "academico",
    content: (
      <div className="relative pl-8 mt-5">
        <div className="timeline-item flex items-center mb-6 mt-4">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "110%" }}
            transition={{ duration: 1 }}
            className="absolute left-0 top-0 bottom-0 w-1 bg-white opacity-50 timeline-line"
          ></motion.div>
          <div className="ml-4 text-left">
            <h3 className="text-xl font-semibold text-white">Formação Técnica em Informática</h3>
            <p className="text-sm text-gray-400">2017 - 2021</p>
            <p className="text-gray-300">Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte.</p>
          </div>
        </div>
          <div className="ml-4 text-left">
            <h3 className="text-xl font-semibold text-white">Tecnólogo Sistemas para Internet</h3>
            <p className="text-sm text-gray-400">2021 - 2025</p>
            <p className="text-gray-300">Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte.</p>
          </div>
      </div>
    ),
  },
];

const AboutSection: React.FC = () => {
  const [tab, setTab] = useState<string>("techstack");

  return (
    <section
        id="sobre"
        className="text-white flex justify-center items-center w-full px-8"
        style={{ scrollMarginTop: '30px' }}
      >
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-16 xl:px-16 flex flex-col items-center text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Sobre Mim</h2>
        <p className="text-base lg:text-lg max-w-3xl text-justify">
          Estou sempre em busca de novos desafios para aprimorar minhas habilidades e criar soluções inovadoras.
        </p>

        <div className="flex flex-row justify-center mt-4 space-x-2">
          {TAB_DATA.map(({ title, id }) => (
            <TabButton key={id} selectTab={() => setTab(id)} active={tab === id}>
              {title}
            </TabButton>
          ))}
        </div>

        <div className="mt-4 w-full flex justify-center">
          {TAB_DATA.find((t) => t.id === tab)?.content}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
