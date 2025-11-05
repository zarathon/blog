# Como Adicionar Imagens nos Posts

Este guia explica todas as formas de adicionar imagens nos seus posts em markdown.

## 1. Imagem de Capa (Frontmatter)

A imagem de capa é exibida no topo do post individual e como thumbnail na listagem.

### Como usar:

No frontmatter do seu post (topo do arquivo `.md`), adicione:

```yaml
---
title: 'Título do Post'
date: '2025-11-05'
excerpt: 'Resumo do post'
image: '/blog/images/posts/sua-imagem.jpg'
tags: ['javascript', 'web']
---
```

### Onde colocar a imagem:

1. Coloque o arquivo de imagem em: `public/images/posts/`
2. Use o caminho: `/blog/images/posts/nome-da-imagem.jpg`

**Importante:** O prefixo `/blog/` é obrigatório para funcionar no GitHub Pages.

### Formatos recomendados:

- JPG/JPEG: Para fotos e imagens complexas
- PNG: Para capturas de tela e imagens com transparência
- Tamanho recomendado: 800x800px ou similar (imagem quadrada funciona melhor)

---

## 2. Imagens Inline no Conteúdo (Markdown)

Para adicionar imagens dentro do conteúdo do post, use a sintaxe padrão do markdown.

### Sintaxe básica:

```markdown
![Texto alternativo](/blog/images/posts/minha-imagem.jpg)
```

### Exemplo completo:

```markdown
---
title: 'Meu Post sobre React'
date: '2025-11-05'
excerpt: 'Aprendendo React hooks'
---

Este é o conteúdo do post.

![Diagrama de componentes React](/blog/images/posts/react-diagram.png)

Continuação do texto após a imagem.
```

### Boas práticas:

- Sempre use texto alternativo descritivo
- Use caminhos começando com `/blog/` para imagens locais
- Mantenha nomes de arquivos descritivos e sem espaços

---

## 3. Imagens com HTML (Maior Controle)

Se você precisar de mais controle sobre a imagem (tamanho, alinhamento, etc.), pode usar HTML diretamente no markdown.

### Exemplos:

**Imagem com tamanho customizado:**

```html
<img src="/blog/images/posts/screenshot.png" alt="Screenshot da aplicação" width="600" />
```

**Imagem centralizada:**

```html
<div style="text-align: center;">
  <img src="/blog/images/posts/logo.png" alt="Logo" width="300" />
</div>
```

**Imagem com legenda:**

```html
<figure>
  <img src="/blog/images/posts/grafico.png" alt="Gráfico de performance" />
  <figcaption>Figura 1: Comparação de performance entre frameworks</figcaption>
</figure>
```

**Imagem com link:**

```html
<a href="https://exemplo.com" target="_blank">
  <img src="/blog/images/posts/banner.jpg" alt="Clique para saber mais" />
</a>
```

---

## 4. Imagens Externas (URLs)

Você pode usar imagens hospedadas em outros serviços.

### Sintaxe:

```markdown
![Descrição](https://exemplo.com/caminho/para/imagem.jpg)
```

### Exemplos de serviços:

**Imgur:**
```markdown
![Minha imagem](https://i.imgur.com/abc123.jpg)
```

**Unsplash (imagens gratuitas):**
```markdown
![Foto de paisagem](https://images.unsplash.com/photo-xyz?w=800)
```

### ⚠️ Cuidados com imagens externas:

- **Não recomendado para produção:** Links podem quebrar se o serviço sair do ar
- **Performance:** Imagens externas podem ser lentas
- **SEO:** Imagens locais são melhores para SEO
- **Controle:** Você não controla se a imagem será removida

**Recomendação:** Use apenas para testes. Para produção, sempre use imagens locais.

---

## 5. Múltiplas Imagens (Galeria)

Para mostrar várias imagens lado a lado:

### Usando HTML + CSS inline:

```html
<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <img src="/blog/images/posts/img1.jpg" alt="Imagem 1" style="width: 48%;" />
  <img src="/blog/images/posts/img2.jpg" alt="Imagem 2" style="width: 48%;" />
</div>
```

### Grade de imagens:

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
  <img src="/blog/images/posts/img1.jpg" alt="Imagem 1" />
  <img src="/blog/images/posts/img2.jpg" alt="Imagem 2" />
  <img src="/blog/images/posts/img3.jpg" alt="Imagem 3" />
</div>
```

---

## 6. GIFs Animados

GIFs funcionam da mesma forma que imagens estáticas.

### Sintaxe:

```markdown
![Animação do loading](https://i.imgur.com/loading.gif)
```

Ou local:

```markdown
![Demo da aplicação](/blog/images/posts/demo.gif)
```

### Dicas:

- Mantenha GIFs pequenos (< 5MB) para não afetar performance
- Use serviços como [ezgif.com](https://ezgif.com/) para otimizar GIFs
- Considere usar vídeos para animações longas (melhor compressão)

---

## 7. Organização das Imagens

### Estrutura recomendada:

```
public/
└── images/
    ├── posts/           # Imagens dos posts
    │   ├── post-1-cover.jpg
    │   ├── post-1-diagram.png
    │   ├── post-2-cover.jpg
    │   └── post-2-screenshot.png
    └── about/           # Imagens da página About
        └── profile.jpg
```

### Convenção de nomenclatura:

**Para imagens de capa:**
- `{slug-do-post}-cover.jpg`
- Exemplo: `primeiro-post-cover.jpg`

**Para imagens de conteúdo:**
- `{slug-do-post}-{descrição}.jpg`
- Exemplo: `primeiro-post-diagram.png`

### Boas práticas:

1. Use nomes descritivos
2. Evite espaços (use hífens: `-`)
3. Use letras minúsculas
4. Seja consistente com a nomenclatura

---

## 8. Otimização de Imagens

### Antes de adicionar imagens:

1. **Redimensione:** Não use imagens maiores que o necessário
   - Capa: ~800x800px
   - Conteúdo: ~1200px de largura

2. **Comprima:** Use ferramentas para reduzir tamanho
   - [TinyPNG](https://tinypng.com/) - PNG/JPG
   - [Squoosh](https://squoosh.app/) - Todos os formatos
   - [ImageOptim](https://imageoptim.com/) - Mac

3. **Escolha o formato correto:**
   - JPG: Fotos e imagens complexas
   - PNG: Capturas de tela, logos, transparência
   - WebP: Melhor compressão (nem todos navegadores suportam)
   - GIF: Animações simples
   - SVG: Ícones e ilustrações vetoriais

### Tamanhos recomendados:

- Imagens de capa: < 200KB
- Imagens de conteúdo: < 100KB cada
- GIFs: < 5MB

---

## 9. Exemplo Completo

Aqui está um exemplo de post usando diferentes tipos de imagens:

```markdown
---
title: 'Construindo uma API REST com Node.js'
date: '2025-11-05'
excerpt: 'Aprenda a criar uma API REST do zero usando Node.js e Express'
image: '/blog/images/posts/nodejs-api-cover.jpg'
tags: ['nodejs', 'javascript', 'backend']
---

Neste tutorial, vamos construir uma API REST completa.

## Arquitetura do Projeto

A imagem abaixo mostra a arquitetura que vamos usar:

![Arquitetura da API](/blog/images/posts/nodejs-api-architecture.png)

## Configuração Inicial

Primeiro, vamos criar nosso package.json. Veja o exemplo:

<img src="/blog/images/posts/nodejs-api-package.png" alt="Exemplo de package.json" width="700" />

## Estrutura de Pastas

Organize seu projeto assim:

<div style="text-align: center;">
  <img src="/blog/images/posts/nodejs-api-folder.png" alt="Estrutura de pastas" width="400" />
  <p style="font-size: 0.9em; color: #666;">Figura 1: Estrutura recomendada de pastas</p>
</div>

## Testando a API

Aqui está um GIF mostrando a API em ação:

![Demo da API funcionando](/blog/images/posts/nodejs-api-demo.gif)

E pronto! Sua API está funcionando.
```

---

## 10. Checklist Antes de Publicar

Antes de fazer commit do seu post, verifique:

- [ ] Imagens estão em `public/images/posts/`
- [ ] Caminhos começam com `/blog/images/posts/`
- [ ] Todas as imagens têm texto alternativo descritivo
- [ ] Imagens foram otimizadas (comprimidas)
- [ ] Testou localmente com `npm run dev`
- [ ] Nomes de arquivos seguem a convenção (sem espaços, minúsculas)
- [ ] Tamanho total das imagens do post < 1MB

---

## 11. Troubleshooting

### Imagem não aparece no GitHub Pages

**Problema:** Imagem funciona localmente mas não no GitHub Pages.

**Solução:** Certifique-se de que o caminho começa com `/blog/`:
```markdown
❌ ![Erro](/images/posts/foto.jpg)
✅ ![Correto](/blog/images/posts/foto.jpg)
```

### Imagem muito grande

**Problema:** Página carrega lentamente.

**Solução:**
1. Comprima a imagem com TinyPNG ou Squoosh
2. Redimensione para o tamanho necessário
3. Considere usar WebP ao invés de JPG/PNG

### Imagem externa quebrou

**Problema:** Link externo parou de funcionar.

**Solução:** Sempre prefira imagens locais. Se precisar usar externas:
1. Baixe a imagem
2. Coloque em `public/images/posts/`
3. Atualize o caminho no markdown

### GIF não anima

**Problema:** GIF aparece mas não anima.

**Solução:**
- Verifique se o arquivo é realmente um GIF animado
- Alguns players/browsers podem não mostrar animação em modo economia de energia
- Teste em diferentes navegadores

---

## Recursos Úteis

### Bancos de imagens gratuitas:
- [Unsplash](https://unsplash.com/) - Fotos de alta qualidade
- [Pexels](https://pexels.com/) - Fotos e vídeos gratuitos
- [Pixabay](https://pixabay.com/) - Fotos, vetores e ilustrações

### Ferramentas de otimização:
- [TinyPNG](https://tinypng.com/) - Comprimir PNG/JPG
- [Squoosh](https://squoosh.app/) - Otimizador universal
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - Otimizar SVG

### Editores de imagem:
- [Photopea](https://photopea.com/) - Editor estilo Photoshop online
- [Canva](https://canva.com/) - Design gráfico simples
- [Figma](https://figma.com/) - Design profissional (free tier)

---

## Dúvidas?

Se tiver problemas com imagens, verifique:
1. Este guia (IMAGES-IN-POSTS.md)
2. O guia de estrutura (IMAGES.md)
3. Exemplos em posts existentes na pasta `posts/`
