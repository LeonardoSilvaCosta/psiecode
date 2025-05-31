const Blog = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-psiecode-dark-blue mb-8">Blog Psiecode</h1>
      <p className="text-lg text-psiecode-medium-blue">Artigos e conteúdos relevantes para psicólogos. Em breve!</p>
      {/* Placeholder for blog posts */}
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1,2,3].map(item => (
          <div key={item} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-psiecode-dark-blue mb-2">Título do Artigo {item}</h2>
            <p className="text-psiecode-medium-blue mb-4">Um breve resumo do conteúdo do artigo para atrair o leitor...</p>
            <a href="#" className="text-psiecode-light-blue hover:text-psiecode-cyan font-semibold">Leia mais &rarr;</a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Blog;