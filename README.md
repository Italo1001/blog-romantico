# Blog Romântico - Sistema de Relacionamento

Este é um blog romântico interativo com sistema de login, banco de dados PostgreSQL e animações especiais para celebrar o Dia dos Namorados.

## Funcionalidades

- **Sistema de Login**: Acesso exclusivo para o casal (usuários: jaine/italo, senha: 143)
- **Contador de Relacionamento**: Mostra tempo exato desde 07/10/2024 às 19h
- **Timeline Interativa**: História do relacionamento com animações
- **Galeria de Fotos**: Álbum estilo polaroid com efeitos 3D
- **Momentos Especiais**: Grid com marcos importantes do relacionamento
- **Player de Música**: Playlist romântica personalizada
- **Planos Futuros**: Sonhos e objetivos do casal
- **Citações Românticas**: Carrossel de frases inspiradoras
- **Animação Especial**: Explosão de corações 3D no final da página
- **Efeitos Visuais**: Partículas de coração que seguem o mouse

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Framer Motion, Tailwind CSS
- **Backend**: Node.js, Express
- **Banco de Dados**: PostgreSQL com Drizzle ORM
- **Animações**: Framer Motion, Canvas API
- **UI Components**: Shadcn/ui

## Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Configure o banco de dados PostgreSQL e defina a variável DATABASE_URL

3. Execute as migrações do banco:
```bash
npm run db:push
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse http://localhost:5000

## Login

- **Usuários**: jaine ou italo
- **Senha**: 143

## Estrutura do Projeto

```
├── client/          # Frontend React
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── pages/      # Páginas da aplicação
│   │   ├── hooks/      # Custom hooks
│   │   └── lib/        # Utilitários e configurações
├── server/          # Backend Express
│   ├── db.ts        # Configuração do banco
│   ├── storage.ts   # Camada de dados
│   └── routes.ts    # Rotas da API
└── shared/          # Schemas e tipos compartilhados
```

## Banco de Dados

O sistema utiliza as seguintes tabelas:
- users (usuários)
- moments (momentos especiais)
- photos (fotos)
- timeline_events (eventos da timeline)
- future_plans (planos futuros)
- quotes (citações)
- songs (músicas)

## Efeitos Especiais

- **Partículas de Coração**: Animação que segue o movimento do mouse
- **Explosão 3D**: Animação especial quando o usuário rola até o final
- **Transições Suaves**: Animações de entrada e hover em todos os elementos
- **Fundo Dinâmico**: Gradiente escuro que muda conforme a posição da página

## Personalização

Para personalizar o blog:

1. Altere a data de início do relacionamento em `RelationshipCounter.tsx`
2. Adicione suas próprias fotos no banco de dados
3. Customize os momentos especiais, planos futuros e músicas
4. Ajuste as cores no arquivo `index.css`

Desenvolvido com ❤️ para celebrar o amor!