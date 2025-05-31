const Servicos = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-psiecode-dark-blue mb-8">Nossos Serviços</h1>
      <p className="text-lg text-psiecode-medium-blue">Descubra as funcionalidades que a Psiecode oferece para otimizar sua prática:</p>
      <ul className="list-disc list-inside space-y-2 mt-4 text-psiecode-medium-blue">
        <li>Agenda Online Inteligente</li>
        <li>Prontuário Digital Seguro e Personalizável</li>
        <li>Relatórios e Análises Automatizadas</li>
        <li>Ferramentas de Comunicação com Pacientes</li>
        <li>Gestão Financeira Simplificada</li>
        <li>E muito mais!</li>
      </ul>
    </div>
  );
};
export default Servicos;