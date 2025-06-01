"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-psiecode-dark-blue text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-psiecode-light-blue mb-4">
              Psiecode
            </h3>
            <p className="text-gray-300 mb-4">
              A plataforma completa para psicólogos modernos. Simplifique sua
              prática e dedique mais tempo ao que realmente importa: seus
              pacientes.
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h4 className="font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sobre"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/precos"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Preços
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacyPolicy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termsOfService"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Psiecode. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
