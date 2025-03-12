"use client";

import React, { useState, useEffect } from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface ProjectCardProps {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  previewUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imgUrl,
  title,
  description,
  gitUrl,
  previewUrl,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    if (isMobile) {
      if (isClicked) {
        setIsClicked(false);
        setIsLinkActive(false);
      } else {
        setIsClicked(true);
        setTimeout(() => {
          setIsLinkActive(true);
        }, 500);
      }
    }
  };

  return (
    <div
      className="overflow-hidden rounded-xl border border-[#33353F] flex flex-col h-full"
      onClick={handleClick}
    >
      <div
        className="h-52 md:h-72 rounded-t-xl relative group overflow-hidden"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
      >
        <div
          className={`overlay absolute bottom-0 left-0 w-full h-full bg-[#181818] opacity-0 transition-all duration-500 ease-in-out z-10 flex justify-center items-center ${
            isMobile
              ? isClicked
                ? "opacity-100 translate-y-0"
                : "translate-y-8"
              : "group-hover:opacity-100 group-hover:translate-y-0 translate-y-8"
          }`}
        >
          <div className="flex space-x-4">
            <Link
              href={gitUrl}
              className={`h-14 w-14 border-2 rounded-full border-[#ADB7BE] hover:border-white flex items-center justify-center transition-opacity duration-500 ${
                isMobile
                  ? isLinkActive
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                  : "opacity-100 pointer-events-auto"
              }`}
            >
              <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] hover:text-white" />
            </Link>
            <Link
              href={previewUrl}
              className={`h-14 w-14 border-2 rounded-full border-[#ADB7BE] hover:border-white flex items-center justify-center transition-opacity duration-500 ${
                isMobile
                  ? isLinkActive
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                  : "opacity-100 pointer-events-auto"
              }`}
            >
              <EyeIcon className="h-10 w-10 text-[#ADB7BE] hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-white rounded-b-xl mt-3 bg-[#181818] py-6 px-4 flex-grow flex flex-col">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE] flex-grow">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;