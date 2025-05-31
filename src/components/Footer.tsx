"use client";

import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import WhatsappIcon from "./icons/WhatsappIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = "5591988165507";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <footer className="bg-psiecode-dark-blue text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Psiecode</h3>
            <p className="text-sm text-gray-300">
              Inovação e tecnologia para simplificar o dia a dia de psicólogos.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/sobre"
                  className="hover:text-psiecode-light-blue transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos"
                  className="hover:text-psiecode-light-blue transition-colors"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/precos"
                  className="hover:text-psiecode-light-blue transition-colors"
                >
                  Planos e Preços
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-psiecode-light-blue transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="hover:text-psiecode-light-blue transition-colors"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/privacyPolicy"
                  className="hover:text-psiecode-light-blue transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termsOfService"
                  className="hover:text-psiecode-light-blue transition-colors"
                >
                  Termos de Serviço
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Conecte-se</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/leocostapsi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-300 hover:text-psiecode-light-blue transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/leonardo-da-silva-costa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-300 hover:text-psiecode-light-blue transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-gray-300 hover:text-psiecode-light-blue transition-colors"
              >
                <WhatsappIcon size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-psiecode-medium-blue pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Psiecode. Todos os direitos reservados.</p>
          <p className="mt-1">
            Desenvolvido com{" "}
            <span role="img" aria-label="coração">
              ❤️
            </span>{" "}
            para psicólogos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
