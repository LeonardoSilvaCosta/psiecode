"use client";

import React from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-12 px-6 prose prose-lg max-w-none">
      <h1 className="text-4xl font-bold text-psiecode-dark-blue mb-8">
        Política de Privacidade da Psiecode
      </h1>
      <p className="text-lg text-psiecode-medium-blue mb-6">
        Esta Política de Privacidade descreve como a Psiecode coleta, usa e
        protege as informações dos seus usuários, com foco especial no
        tratamento dos dados dos psicólogos e dos dados de seus pacientes dentro
        da plataforma.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        1. Informações que Coletamos
      </h2>
      <p>
        Coletamos informações para fornecer e melhorar nossos serviços. Os tipos
        de informações coletadas incluem:
      </p>
      <h3 className="text-xl font-semibold text-psiecode-dark-blue mt-4 mb-2">
        1.1. Informações do Psicólogo (Usuário da Plataforma)
      </h3>
      <ul className="list-disc list-inside text-psiecode-medium-blue">
        <li>
          <strong>Dados de Cadastro:</strong> Nome completo, endereço de e-mail
          e senha fornecidos durante o cadastro.
        </li>
        <li>
          <strong>Dados de Perfil:</strong> Informações adicionais que você pode
          adicionar ao seu perfil, como avatar.
        </li>
        <li>
          <strong>Dados de Uso:</strong> Informações sobre como você utiliza a
          plataforma, como páginas visitadas e funcionalidades acessadas.
        </li>
        <li>
          <strong>Dados de Pagamento:</strong> Informações necessárias para
          processar pagamentos de assinaturas (embora o processamento real
          ocorra via gateways de pagamento externos, não armazenamos dados
          completos de cartão de crédito).
        </li>
      </ul>
      <h3 className="text-xl font-semibold text-psiecode-dark-blue mt-4 mb-2">
        1.2. Informações dos Pacientes (Inseridas pelo Psicólogo)
      </h3>
      <ul className="list-disc list-inside text-psiecode-medium-blue">
        <li>
          <strong>Dados de Identificação:</strong> Nome completo, e-mail,
          contatos (telefone), etc., conforme inserido pelo psicólogo.
        </li>
        <li>
          <strong>Dados de Prontuário:</strong> Anotações de sessão, histórico,
          evolução e outras informações clínicas inseridas pelo psicólogo no
          prontuário digital.
        </li>
        <li>
          <strong>Dados de Agendamento:</strong> Datas, horários e pacientes
          associados aos agendamentos criados pelo psicólogo.
        </li>
      </ul>
      <p className="text-psiecode-medium-blue mt-4">
        É fundamental entender que os dados dos pacientes são inseridos e
        gerenciados exclusivamente pelo psicólogo usuário da plataforma. A
        Psiecode atua como operadora desses dados, fornecendo a infraestrutura
        segura para o armazenamento, mas a responsabilidade pela coleta,
        consentimento e conteúdo inserido é do psicólogo (controlador dos dados
        dos pacientes).
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        2. Como Usamos Suas Informações
      </h2>
      <p className="text-psiecode-medium-blue">
        Utilizamos as informações coletadas para:
      </p>
      <ul className="list-disc list-inside text-psiecode-medium-blue">
        <li>Fornecer, operar e manter a plataforma Psiecode.</li>
        <li>
          Gerenciar sua conta e fornecer acesso às funcionalidades contratadas.
        </li>
        <li>Processar transações e enviar notificações relacionadas.</li>
        <li>Comunicar com você, responder a perguntas e fornecer suporte.</li>
        <li>Melhorar, personalizar e expandir a plataforma e seus serviços.</li>
        <li>
          Monitorar e analisar tendências de uso para aprimorar a experiência do
          usuário.
        </li>
        <li>Garantir a segurança e a integridade da plataforma.</li>
      </ul>
      <p className="text-psiecode-medium-blue mt-4">
        Os dados dos pacientes inseridos por você são utilizados estritamente
        para fornecer as funcionalidades de gestão de pacientes, prontuários e
        agendamentos a você. A Psiecode não acessa, compartilha ou utiliza o
        conteúdo dos prontuários dos seus pacientes para qualquer outra
        finalidade que não seja a operação e manutenção da plataforma para você.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        3. Compartilhamento de Informações
      </h2>
      <p className="text-psiecode-medium-blue">
        Não compartilhamos suas informações pessoais ou os dados dos seus
        pacientes com terceiros, exceto nas seguintes circunstâncias:
      </p>
      <ul className="list-disc list-inside text-psiecode-medium-blue">
        <li>
          Com provedores de serviço que nos auxiliam na operação da plataforma
          (ex: serviços de hospedagem, processamento de pagamentos), que são
          contratualmente obrigados a proteger suas informações.
        </li>
        <li>
          Para cumprir obrigações legais, responder a processos judiciais ou
          solicitações governamentais.
        </li>
        <li>
          Para proteger nossos direitos, privacidade, segurança ou propriedade,
          e/ou os seus ou de terceiros.
        </li>
        <li>Com seu consentimento.</li>
      </ul>
      <p className="text-psiecode-medium-blue mt-4">
        Os dados dos seus pacientes são isolados e acessíveis apenas por você, o
        psicólogo que os inseriu, através do seu login seguro na plataforma.
        Utilizamos políticas de segurança e controle de acesso (como Row Level
        Security no banco de dados) para garantir que os dados de um psicólogo e
        seus pacientes não sejam acessíveis por outros usuários da Psiecode.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        4. Segurança dos Dados
      </h2>
      <p className="text-psiecode-medium-blue">
        Implementamos medidas de segurança técnicas e organizacionais para
        proteger suas informações e os dados dos seus pacientes contra acesso
        não autorizado, alteração, divulgação ou destruição. No entanto, nenhum
        sistema é 100% seguro, e não podemos garantir a segurança absoluta das
        suas informações.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        5. Retenção de Dados
      </h2>
      <p className="text-psiecode-medium-blue">
        Retemos suas informações pessoais e os dados dos seus pacientes pelo
        tempo necessário para fornecer os serviços da Psiecode a você e para
        cumprir nossas obrigações legais. Se você encerrar sua conta, reteremos
        seus dados por um período limitado conforme exigido por lei ou para fins
        legítimos de negócio, após o qual eles serão excluídos de forma segura.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        6. Seus Direitos (Psicólogo Usuário)
      </h2>
      <p className="text-psiecode-medium-blue">
        Como usuário da Psiecode, você tem direitos sobre suas informações
        pessoais, incluindo o direito de acessar, corrigir ou excluir seus
        dados. Você também tem controle total sobre os dados dos seus pacientes
        inseridos na plataforma, podendo acessá-los, editá-los ou excluí-los a
        qualquer momento através das funcionalidades da Psiecode.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        7. Alterações a Esta Política
      </h2>
      <p className="text-psiecode-medium-blue">
        Podemos atualizar nossa Política de Privacidade periodicamente.
        Notificaremos você sobre quaisquer alterações publicando a nova Política
        de Privacidade nesta página. Recomendamos que você revise esta Política
        de Privacidade periodicamente para quaisquer alterações.
      </p>

      <h2 className="text-2xl font-semibold text-psiecode-dark-blue mt-8 mb-4">
        8. Contato
      </h2>
      <p className="text-psiecode-medium-blue">
        Se você tiver alguma dúvida sobre esta Política de Privacidade, por
        favor, entre em contato conosco através da página{" "}
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

export default PrivacyPolicy;
