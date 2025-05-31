"use client";

import React from "react";
import Link from "next/link";

const TermsOfService = () => {
  return (
    <div className="container mx-auto py-12 px-6 prose prose-lg max-w-none">
      <h1 className="text-4xl font-bold text-psiecode-dark-blue mb-8">
        Termos de Serviço da Psiecode
      </h1>
      <p className="text-lg text-psiecode-medium-blue mb-6">
        Bem-vindo aos Termos de Serviço da Psiecode. Este documento descreve as
        regras e diretrizes para o uso da nossa plataforma. Ao acessar ou
        utilizar a Psiecode, você concorda em cumprir estes Termos.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        1. Aceitação dos Termos
      </h2>
      <p className="text-psiecode-medium-blue">
        Ao criar uma conta ou usar a plataforma Psiecode, você confirma que leu,
        entendeu e concorda em estar vinculado a estes Termos de Serviço, bem
        como à nossa Política de Privacidade. Se você não concordar com estes
        Termos, não utilize a plataforma.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        2. Uso da Plataforma
      </h2>
      <p className="text-psiecode-medium-blue">
        A Psiecode é destinada a profissionais de psicologia para auxiliar na
        gestão de suas práticas. Você concorda em usar a plataforma apenas para
        fins lícitos e de acordo com estes Termos. Você é responsável por manter
        a confidencialidade de suas informações de login e por todas as
        atividades que ocorrem em sua conta.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        3. Conteúdo do Usuário
      </h2>
      <p className="text-psiecode-medium-blue">
        Você é o único responsável pelos dados e conteúdos que insere na
        plataforma, incluindo informações de pacientes e prontuários. Você
        garante que possui todos os direitos necessários para inserir e tratar
        esses dados na Psiecode e que o faz em conformidade com a legislação
        aplicável (como a LGPD) e o código de ética profissional. A Psiecode não
        reivindica a propriedade sobre o conteúdo que você insere.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        4. Privacidade e Proteção de Dados
      </h2>
      <p className="text-psiecode-medium-blue">
        Sua privacidade é importante para nós. Nossa Política de Privacidade (
        <Link
          href="/privacyPolicy"
          className="text-psiecode-light-blue hover:underline"
        >
          disponível aqui
        </Link>
        ) explica como coletamos, usamos e protegemos suas informações pessoais
        e os dados dos seus pacientes. Ao usar a Psiecode, você concorda com as
        práticas descritas na Política de Privacidade.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        5. Planos e Pagamentos
      </h2>
      <p className="text-psiecode-medium-blue">
        O acesso a certas funcionalidades da Psiecode pode exigir uma assinatura
        paga. Ao assinar um plano, você concorda com os preços e termos de
        pagamento aplicáveis. Os pagamentos são processados por gateways de
        pagamento externos, e não armazenamos suas informações financeiras
        completas.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        6. Limitação de Responsabilidade
      </h2>
      <p className="text-psiecode-medium-blue">
        A Psiecode é fornecida "como está", sem garantias de qualquer tipo. Não
        nos responsabilizamos por quaisquer danos diretos, indiretos,
        incidentais, especiais ou consequenciais resultantes do uso ou da
        incapacidade de usar a plataforma. Você é responsável por garantir a
        conformidade do uso da plataforma com as leis e regulamentações
        aplicáveis à sua prática profissional.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        7. Alterações nos Termos
      </h2>
      <p className="text-psiecode-medium-blue">
        Podemos modificar estes Termos de Serviço a qualquer momento.
        Notificaremos você sobre alterações significativas. O uso continuado da
        plataforma após as modificações constitui sua aceitação dos novos
        Termos.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        8. Rescisão
      </h2>
      <p className="text-psiecode-medium-blue">
        Podemos suspender ou encerrar seu acesso à plataforma, a nosso critério,
        por qualquer motivo, incluindo a violação destes Termos. Você pode
        encerrar sua conta a qualquer momento.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        9. Lei Aplicável
      </h2>
      <p className="text-psiecode-medium-blue">
        Estes Termos serão regidos e interpretados de acordo com as leis do
        Brasil.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        10. Contato
      </h2>
      <p className="text-psiecode-medium-blue">
        Se você tiver alguma dúvida sobre estes Termos de Serviço, por favor,
        entre em contato conosco através da página{" "}
        <Link
          href="/contato"
          className="text-psiecode-light-blue hover:underline"
        >
          Contato
        </Link>
        .
      </p>

      <p className="text-sm text-gray-500 mt-12">
        Última atualização: 14/05/2025
      </p>
    </div>
  );
};

export default TermsOfService;
