import { Linkedin } from "lucide-react";

const Sobre = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-psiecode-dark-blue mb-8">Sobre a Psiecode</h1>
      <div className="space-y-6 text-lg text-psiecode-medium-blue">
        <p>Bem-vindo à página Sobre! Aqui você encontrará informações sobre nossa missão, visão e valores.</p>
        <p>A Psiecode nasceu com o propósito de revolucionar a forma como psicólogos gerenciam suas práticas, utilizando a tecnologia para simplificar processos e otimizar o tempo, permitindo que foquem no que realmente importa: seus pacientes.</p>
        
        <h2 className="text-2xl font-semibold text-psiecode-dark-blue pt-4">Nossa Missão</h2>
        <p>Entregar valor aos profissionais de psicologia através de solução em tecnologia que aumentem tanto a sua produtividade quanto a sua qualidade de vida de forma saudável.</p>
        
        <h2 className="text-2xl font-semibold text-psiecode-dark-blue pt-4">Nossa Visão</h2>
        <p>Ser a principal aliada tecnológica dos psicólogos, reconhecida pela inovação, confiabilidade e pelo impacto positivo na saúde mental e bem-estar dos profissionais e seus pacientes.</p>
        
        <h2 className="text-2xl font-semibold text-psiecode-dark-blue pt-4">Nossos Valores</h2>
        <p>Ser referência nº 1 para psicólogos quando o assunto for busca de soluções tecnológicas voltadas para problemas do cotidiano desses profissionais.</p>
        <p className="pt-2">Além disso, nossos pilares são: Inovação Contínua, Foco no Cliente, Ética e Transparência, Qualidade e Excelência, Colaboração e Empatia.</p>

        {/* Seção: Conheça o Criador */}
        <section className="pt-10 mt-8 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-psiecode-dark-blue mb-6 text-center">
            Conheça o Criador
          </h2>
          <div className="max-w-xl mx-auto text-center">
            <p className="text-psiecode-medium-blue mb-4">
              A Psiecode foi idealizada e desenvolvida por Leonardo da Silva Costa, um psicólogo entusiasta da tecnologia com a paixão de criar soluções que fazem a diferença.
            </p>
            <a
              href="https://www.linkedin.com/in/leonardo-da-silva-costa/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-psiecode-light-blue hover:bg-psiecode-medium-blue transition-colors"
            >
              <Linkedin size={20} className="mr-2" />
              Ver Perfil no LinkedIn
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Sobre;