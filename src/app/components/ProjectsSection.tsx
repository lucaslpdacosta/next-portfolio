import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  gitUrl: string;
  previewUrl: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Projeto",
    description: "Descrição",
    image: "/images/projects/1.png",
    tag: ["Tudo", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Projeto",
    description: "Descrição",
    image: "/images/projects/2.png",
    tag: ["Tudo", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Projeto",
    description: "Descrição",
    image: "/images/projects/3.png",
    tag: ["Tudo", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Projeto",
    description: "Descrição",
    image: "/images/projects/4.png",
    tag: ["Tudo", "Mobile"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Projeto",
    description: "Descrição",
    image: "/images/projects/5.png",
    tag: ["Tudo", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Projeto",
    description: "Descrição",
    image: "/images/projects/6.png",
    tag: ["Tudo", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ProjectsSection: React.FC = () => {
  const [tag, setTag] = useState<string>("Tudo");
  const ref = useRef<HTMLUListElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section
        id="projetos"
        className="py-8 px-4 xl:px-16"
        style={{ scrollMarginTop: '50px' }}
      >
        <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
          Meus Projetos
        </h2>
      <div className="text-white flex flex-row justify-center items-center gap-4 py-4"> 
        <ProjectTag
          onClick={handleTagChange}
          name="Tudo"
          isSelected={tag === "Tudo"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-6 md:gap-8">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;