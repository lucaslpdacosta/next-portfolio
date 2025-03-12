"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ParticlesBackground from "./ParticlesBackground";
import { FaLocationDot } from "react-icons/fa6";

const emojis: string[] = ["😎", "🚀", "🔥", "💻", "💡", "😴", "😃", "👋", "🧐"];

const HeroSection: React.FC = () => {
  const [showBubble, setShowBubble] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>("");

  const handleMouseDown = (): void => {
    setShowBubble(true);
    setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
  };

  const handleMouseUp = (): void => {
    setShowBubble(false);
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent): void => {
      e.preventDefault();
      handleMouseDown();
    };

    const handleTouchEnd = (e: TouchEvent): void => {
      e.preventDefault();
      handleMouseUp();
    };

    const imageElement = document.querySelector(".profile-image");

    if (imageElement) {
      imageElement.addEventListener("touchstart", handleTouchStart as EventListener, { passive: false });
      imageElement.addEventListener("touchend", handleTouchEnd as EventListener, { passive: false });
    }

    return () => {
      if (imageElement) {
        imageElement.removeEventListener("touchstart", handleTouchStart as EventListener);
        imageElement.removeEventListener("touchend", handleTouchEnd as EventListener);
      }
    };
  }, []);

  return (
    <section className="lg:py-8 relative">
      <ParticlesBackground />

      <div className="animate-color-change"></div>

      <div className="grid grid-cols-1 sm:grid-cols-12 place-items-center gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="sm:col-span-8 text-center sm:text-left justify-self-start px-4 sm:px-0 flex flex-col sm:mr-10 lg:mr-16"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-7xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Prazer, sou
            </span>
            <br />
            <span className="block h-[15px]">
              <TypeAnimation
                sequence={[
                  "Lucas",
                  1000,
                  "Full-Stack Developer",
                  1000,
                  "Mobile Developer",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="inline-block"
              />
            </span>
          </h1>
          <p className="flex items-center text-[#ADB7BE] text-base sm:text-lg lg:text-lg mt-20 sm:mt-30 lg:mt-50 z-1">
            <FaLocationDot className="mr-2" /> Jardim do Seridó - RN, Brasil.
          </p>

          <p className="text-[#ADB7BE] text-base sm:text-lg lg:text-xl mt-2 sm:mt-2 lg:mt-2 z-1 text-justify">
            Obrigado por visitar meu portfólio. Sou um Desenvolvedor Full-Stack
            Web e Mobile com experiência em criação de aplicações robustas e
            escaláveis.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="sm:col-span-4 order-2 sm:order-1 place-self-center mt-4 lg:mt-0 relative"
        >
          <div
            className="rounded-full bg-[#181818] w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] flex items-center justify-center overflow-hidden relative cursor-pointer profile-image"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <Image
              src="/images/profile.png"
              alt="hero image"
              width={250}
              height={250}
              className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[350px] lg:h-[350px] object-cover"
            />
          </div>

          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute transform -top-1/12 right-1/12 text-7xl sm:text-8xl sm:left-2/4 lg:text-9xl"
              >
                💭
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute transform translate-x-1/2 top-1/5 right-1/2 text-3xl sm:text-4xl sm:left-1/6 lg:text-5xl lg:left-7 lg:top-7"
                >
                  {emoji}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="sm:col-span-8 order-3 mt-6 px-4 sm:px-0 flex flex-col items-center sm:items-start w-full"
        >
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/#contato"
              className="px-6 py-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-center min-w-[180px] max-w-[250px] mx-auto sm:mx-0"
              style={{ zIndex: 1 }}
            >
              Contatos
            </Link>
            <Link
              href="/curriculo.pdf"
              className="px-1 py-1 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-center min-w-[180px] max-w-[250px] mx-auto sm:mx-0"
              style={{ zIndex: 1 }}
              target="_blank"
              download
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                Baixar Currículo
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
