import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext"; // Importar useAuth

const Home = () => {
  const { user, isLoading } = useAuth(); // Obter usuário e estado de carregamento

  // Determinar o link do CTA "Comece Agora"
  // Se isLoading for true, podemos assumir que o usuário não está logado para evitar um flash
  // ou aguardar a resolução. Por simplicidade, vamos tratar isLoading como deslogado para este link.
  const comeceAgoraLink = !isLoading && user ? "/dashboard" : "/cadastro";

  return (
    <div className="bg-white text-psiecode-dark-blue">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-psiecode-light-blue/10 via-white to-psiecode-cyan/10">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transforme sua prática com <span className="text-psiecode-light-blue">Psiecode</span>
          </h1>
          <p className="text-lg md:text-xl text-psiecode-medium-blue mb-10 max-w-2xl mx-auto">
            A plataforma completa com ferramentas tecnológicas pensadas para facilitar a vida de psicólogos. Mais tempo para seus pacientes, menos tempo com burocracia.
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-psiecode-light-blue text-white hover:bg-psiecode-medium-blue px-8 py-3 text-lg" asChild>
              <Link to={comeceAgoraLink}>Comece Agora <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-psiecode-light-blue text-psiecode-light-blue hover:bg-psiecode-light-blue hover:text-white px-8 py-3 text-lg" asChild>
              <Link to="/servicos">Saiba Mais</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Por que escolher a Psiecode?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { title: "Agenda Inteligente", description: "Organize seus agendamentos de forma fácil e intuitiva.", icon: <CheckCircle className="h-12 w-12 text-psiecode-cyan mx-auto mb-4" /> },
              { title: "Prontuário Digital Seguro", description: "Acesse os prontuários dos seus pacientes com segurança e praticidade.", icon: <CheckCircle className="h-12 w-12 text-psiecode-cyan mx-auto mb-4" /> },
              { title: "Relatórios Simplificados", description: "Gere relatórios completos com poucos cliques, otimizando seu tempo.", icon: <CheckCircle className="h-12 w-12 text-psiecode-cyan mx-auto mb-4" /> },
            ].map(benefit => (
              <div key={benefit.title} className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                {benefit.icon}
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-psiecode-medium-blue">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-psiecode-dark-blue text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para simplificar sua rotina?</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl mx-auto">
            Junte-se a centenas de psicólogos que já estão otimizando suas práticas com a Psiecode.
          </p>
          <Button size="lg" className="bg-psiecode-light-blue text-white hover:bg-psiecode-medium-blue px-10 py-4 text-xl" asChild>
            <Link to="/precos">Ver Planos e Preços</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;