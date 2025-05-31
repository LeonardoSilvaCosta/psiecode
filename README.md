# PsieCode - Sistema de Gestão para Psicólogos

PsieCode é uma aplicação web moderna desenvolvida com Next.js 15 para auxiliar psicólogos na gestão de suas tarefas. O sistema oferece uma interface intuitiva e segura para gerenciar pacientes, agendamentos, prontuários e muito mais.

## 🚀 Funcionalidades

- **Autenticação Segura**

  - Login com e-mail e senha
  - Autenticação de dois fatores (2FA)
  - Recuperação de senha
  - Proteção de rotas

- **Gestão de Pacientes**

  - Cadastro completo de pacientes
  - Histórico de atendimentos
  - Prontuários eletrônicos
  - Gestão de documentos

- **Agendamento**

  - Calendário de consultas
  - Confirmações automáticas
  - Lembretes para pacientes
  - Gestão de disponibilidade

- **Área Administrativa**

  - Dashboard com métricas importantes
  - Gestão de perfil profissional
  - Controle de pagamentos
  - Relatórios e análises

- **Interface Moderna**
  - Design responsivo
  - Tema claro/escuro
  - Componentes acessíveis
  - Animações suaves

## 🛠️ Tecnologias

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [date-fns](https://date-fns.org/)

## 📦 Pré-requisitos

- Node.js 18.17 ou superior
- npm ou yarn
- Conta no Supabase

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone https://seu-repositorio/psiecode.git
cd psiecode
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais do Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

5. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📝 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria a versão de produção
- `npm run start`: Inicia o servidor de produção
- `npm run lint`: Executa a verificação de linting

## 🌐 Estrutura do Projeto

```
src/
├── app/                    # Páginas e rotas da aplicação
├── components/            # Componentes reutilizáveis
├── contexts/             # Contextos React (auth, theme, etc)
├── lib/                  # Configurações e utilitários
├── hooks/               # Hooks personalizados
└── utils/               # Funções utilitárias
```

## 🔒 Segurança

- Autenticação gerenciada pelo Supabase
- Proteção de rotas com middleware
- Tokens JWT para sessões
- Criptografia de dados sensíveis
- Validação de entrada de dados

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🤝 Suporte

Para suporte, envie um email para suporte@psiecode.com.br ou abra uma issue no repositório.

## ✨ Agradecimentos

- [Vercel](https://vercel.com) - Plataforma de hospedagem
- [Supabase](https://supabase.com) - Backend e autenticação
- [shadcn/ui](https://ui.shadcn.com/) - Componentes de UI
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS
