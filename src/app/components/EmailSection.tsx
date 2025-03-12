"use client";
import React, { useState } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import WhatsappIcon from "../../../public/whatsapp-icon.svg";
import EmailIcon from "../../../public/email-icon.svg";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const DISCORD_WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

interface FormData {
  email: string;
  subject: string;
  message: string;
}

const EmailSection: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data: FormData = {
      email: (e.target as HTMLFormElement).email.value,
      subject: (e.target as HTMLFormElement).subject.value,
      message: (e.target as HTMLFormElement).message.value,
    };

    const payload = {
      embeds: [
        {
          title: "Nova Mensagem",
          fields: [
            { name: "email", value: data.email },
            { name: "assunto", value: data.subject },
            { name: "mensagem", value: data.message },
          ],
          color: 3447003,
        },
      ],
    };

    try {
      const response = await fetch(DISCORD_WEBHOOK_URL as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast("✨ Mensagem enviada com sucesso!", {
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "30px",
            padding: "12px 16px",
          },
          position: "bottom-right",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        toast("❌ Erro ao enviar mensagem. ", {
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "30px",
            padding: "12px 16px",
          },
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error("Erro ao conectar-se ao servidor.", {
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "30px",
          padding: "12px 16px",
        },
      });
      console.error("Erro ao conectar-se ao Discord:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative">
      <div
        className="rounded-full h-80 w-80 absolute top-4/4 -left-4 transform -translate-x-1/2 -translate-1/2"
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, rgba(43, 128, 255, 0.2) 0%, rgba(128, 0, 128, 0) 70%)',
        }}
      ></div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">Conecte-se comigo!</h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          Estou à procura de novas oportunidades, e estou disponível. Caso queira me cumprimentar, responderei assim que possível!
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com/lucaslpdacosta" passHref>
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
          <Link href="https://www.linkedin.com/in/lucaslpdacosta/" passHref>
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </Link>
          <Link href="https://wa.link/3dwxxq" passHref>
            <Image src={WhatsappIcon} alt="Whatsapp Icon" />
          </Link>
          <Link href="mailto:lucaslpdacosta1@gmail.com" passHref className="flex items-center justify-center">
            <Image
              src={EmailIcon}
              alt="Email Icon"
              className="w-11 h-14 object-contain relative top-[-3px] left-[4px]"
            />
          </Link>
        </div>
      </div>
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">
              Seu e-mail
            </label>
            <input
              name="email"
              type="email"
              id="email"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="exemplo@exemplo.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="text-white block text-sm mb-2 font-medium">
              Assunto
            </label>
            <input
              name="subject"
              type="text"
              id="subject"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Assunto"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="text-white block text-sm mb-2 font-medium">
              Mensagem
            </label>
            <textarea
              name="message"
              id="message"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Olá!"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-lg w-full flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Mensagem"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailSection;