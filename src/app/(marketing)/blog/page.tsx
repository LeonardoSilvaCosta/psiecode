import { Calendar, Clock, User, ArrowRight } from "lucide-react";

const Blog = () => {
  // Dados mockados para demonstração
  const categories = [
    { id: "all", label: "Todos", active: true },
    { id: "clinica", label: "Clínica" },
    { id: "teoria", label: "Teoria" },
    { id: "tecnologia", label: "Tecnologia" },
    { id: "gestao", label: "Gestão" },
    { id: "casos", label: "Casos de Sucesso" },
    { id: "dicas", label: "Dicas" },
  ];

  const featuredPost = {
    id: 1,
    title: "5 vantagens da gestão digital para psicólogos",
    excerpt:
      "Descubra como a tecnologia pode revolucionar sua prática clínica e otimizar o atendimento aos pacientes, melhorando a eficiência e qualidade dos serviços.",
    image: "/api/placeholder/600/400",
    author: "Dr. Ana Silva",
    date: "15 Mar 2024",
    readTime: "8 min",
    category: "Tecnologia",
    featured: true,
  };

  const posts = [
    {
      id: 2,
      title: "Sistema de agendamento online: como funciona?",
      excerpt:
        "Entenda os benefícios e funcionalidades de um sistema moderno de agendamento para consultórios de psicologia.",
      image: "/api/placeholder/300/200",
      author: "Dra. Carla Santos",
      date: "12 Mar 2024",
      readTime: "5 min",
      category: "Gestão",
    },
    {
      id: 3,
      title:
        "4 motivos pelos quais todo psicólogo precisa de software de gestão",
      excerpt:
        "Organize sua prática, melhore o atendimento e aumente a produtividade com ferramentas digitais especializadas.",
      image: "/api/placeholder/300/200",
      author: "Dr. João Oliveira",
      date: "10 Mar 2024",
      readTime: "6 min",
      category: "Tecnologia",
    },
    {
      id: 4,
      title: "Agendando uma sessão online: vantagens e desvantagens",
      excerpt:
        "Explore os prós e contras da terapia online e como implementar sessões virtuais de forma eficaz.",
      image: "/api/placeholder/300/200",
      author: "Dra. Maria Costa",
      date: "8 Mar 2024",
      readTime: "7 min",
      category: "Clínica",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <div className="container mx-auto px-6 pt-12 pb-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-psiecode-dark-blue mb-4">
            Blog
          </h1>
          <p className="text-xl text-psiecode-medium-blue max-w-2xl mx-auto">
            Insights, dicas e conhecimentos para psicólogos modernos
          </p>
        </div>

        {/* Categories Filter */}
        <div className="bg-white rounded-full shadow-sm p-2 max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category.active
                    ? "bg-psiecode-dark-blue text-white shadow-md"
                    : "text-psiecode-medium-blue hover:bg-psiecode-light-blue/10 hover:text-psiecode-dark-blue"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <div className="h-80 bg-gradient-to-br from-psiecode-dark-blue to-psiecode-medium-blue flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                    <p className="text-lg opacity-90">Imagem em breve</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-psiecode-cyan text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold text-psiecode-dark-blue mb-4 group-hover:text-psiecode-medium-blue transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>

                  <button className="text-psiecode-dark-blue font-semibold hover:text-psiecode-cyan transition-colors inline-flex items-center space-x-1">
                    <span>Leia mais</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Side Articles */}
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-to-br from-psiecode-light-blue to-psiecode-cyan flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                    <p className="text-sm opacity-90">Imagem em breve</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-psiecode-cyan text-xs font-medium uppercase tracking-wide">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-psiecode-dark-blue mb-3 group-hover:text-psiecode-medium-blue transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <button className="bg-psiecode-dark-blue text-white px-8 py-4 rounded-full font-semibold hover:bg-psiecode-medium-blue transition-all duration-200 shadow-lg hover:shadow-xl">
            Carregar mais artigos
          </button>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-psiecode-dark-blue to-psiecode-medium-blue rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Receba insights diretamente no seu e-mail
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Cadastre-se em nossa newsletter e seja o primeiro a receber nossos
            novos artigos, dicas exclusivas e atualizações sobre psicologia
            digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-psiecode-cyan"
            />
            <button className="bg-psiecode-cyan text-white px-6 py-3 rounded-full font-semibold hover:bg-psiecode-light-blue transition-colors">
              Inscrever-se
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
