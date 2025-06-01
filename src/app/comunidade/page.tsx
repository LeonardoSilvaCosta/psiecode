"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const EXTERNAL_COMMUNITY_LINK =
  "https://discord.com/channels/1371319990824992882/1371319990824992886";

const Comunidade = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <Breadcrumb items={[{ label: "Comunidade" }]} />
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg text-center max-w-2xl mx-auto">
        <Users className="h-16 w-16 text-psiecode-light-blue mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-psiecode-dark-blue mb-6">
          Nossa Comunidade Psiecode
        </h1>
        <p className="text-lg text-psiecode-medium-blue mb-8">
          Conecte-se com outros psicólogos, compartilhe experiências, tire
          dúvidas e faça parte de uma rede de apoio dedicada a profissionais
          como você.
        </p>
        <p className="text-md text-psiecode-medium-blue mb-4">
          Nossa comunidade principal está hospedada no Discord. Clique no botão
          abaixo para se juntar a nós!
        </p>
        <Button
          asChild
          size="lg"
          className="bg-psiecode-cyan hover:bg-psiecode-light-blue text-white px-8 py-3 text-lg"
        >
          <a
            href={EXTERNAL_COMMUNITY_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar Comunidade no Discord{" "}
            <ExternalLink className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Comunidade;
