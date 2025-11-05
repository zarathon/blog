# Blog com Next.js e GitHub Pages

Blog moderno desenvolvido com Next.js 16, TypeScript e Tailwind CSS, configurado para deploy automático no GitHub Pages.

## Características

- ⚡ Next.js 16 com App Router
- 📝 Posts em Markdown com frontmatter
- 🎨 Tailwind CSS v4 para estilização
- 🧩 shadcn/ui como design system
- 🌙 Toggle dark/light mode (dark por padrão)
- 💾 Preferência de tema salva no localStorage
- 🚀 Deploy automático com GitHub Actions
- 📱 Design responsivo
- ⚙️ TypeScript para type safety
- 🎯 Componentes reutilizáveis e acessíveis
- ✨ Ícones com Lucide React

## Estrutura do Projeto

```
blog/
├── app/              # Rotas e páginas do Next.js
│   ├── posts/        # Páginas dinâmicas dos posts
│   ├── layout.tsx    # Layout principal
│   └── page.tsx      # Página inicial
├── posts/            # Arquivos markdown dos posts
├── lib/              # Utilitários (processamento de markdown)
├── components/       # Componentes React reutilizáveis
│   └── ui/           # Componentes shadcn/ui
└── public/           # Arquivos estáticos
```

## Como Usar

### Desenvolvimento Local

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra [http://localhost:3000](http://localhost:3000) no navegador

### Criar um Novo Post

1. Crie um arquivo `.md` na pasta `posts/`:

```markdown
---
title: 'Título do Post'
date: '2025-11-05'
excerpt: 'Breve descrição do post'
---

# Conteúdo do post

Escreva seu conteúdo aqui em Markdown...
```

2. O post aparecerá automaticamente na lista

### Deploy no GitHub Pages

#### Configuração Inicial

1. Crie um repositório no GitHub

2. Se o repositório for `username.github.io`:
   - Deixe `basePath` vazio no `next.config.ts`

3. Se o repositório tiver outro nome (ex: `blog`):
   - Descomente e ajuste o `basePath` no `next.config.ts`:
   ```typescript
   basePath: '/blog',
   ```

4. Configure GitHub Pages no repositório:
   - Vá em **Settings → Pages**
   - Em **Source**, selecione **GitHub Actions**

5. Faça push do código:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/blog.git
git push -u origin main
```

6. O GitHub Actions fará o deploy automaticamente!

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linter

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Linguagem
- [Tailwind CSS v4](https://tailwindcss.com/) - Framework CSS
- [shadcn/ui](https://ui.shadcn.com/) - Design system de componentes
- [Lucide React](https://lucide.dev/) - Biblioteca de ícones
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Parser de frontmatter
- [Remark](https://github.com/remarkjs/remark) - Processador de Markdown

## Personalização

### Trocar Tema (Dark/Light Mode)

Clique no botão de sol/lua no canto superior direito. A preferência é salva automaticamente no navegador.

### Alterar o Título e Descrição

Edite `app/page.tsx`:
```typescript
<h1>Seu Título</h1>
<p>Sua descrição</p>
```

### Alterar Cores e Estilos

Edite as classes Tailwind nos componentes ou customize o `tailwind.config.ts`

### Adicionar Metadados SEO

Edite `app/layout.tsx` para adicionar metadata global

### Adicionar Novos Componentes shadcn/ui

Para adicionar mais componentes do shadcn/ui:

```bash
npx shadcn@latest add [component-name]
```

Exemplos:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add avatar
```

Veja todos os componentes disponíveis em: https://ui.shadcn.com/docs/components

## Licença

Este projeto é open source e está disponível sob a licença MIT.
