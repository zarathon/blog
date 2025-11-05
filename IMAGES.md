# Guia de Uso de Imagens no Blog

## 📁 Estrutura de Pastas

As imagens do blog ficam em:
```
public/images/posts/
```

## 🖼️ Como Adicionar Imagens aos Posts

### Passo 1: Adicionar a Imagem ao Projeto

Coloque sua imagem na pasta `public/images/posts/`:

```bash
# Exemplo de estrutura:
public/images/posts/
├── minha-foto.jpg
├── post-tech.png
└── avatar-zara.jpg
```

**Formatos suportados:** JPG, PNG, WebP, GIF

**Tamanho recomendado:**
- Mínimo: 400x400px
- Recomendado: 800x800px ou maior
- Use imagens quadradas para melhor resultado na visualização circular

### Passo 2: Referenciar no Post

No frontmatter do seu post markdown, use o caminho relativo à pasta `public`:

```markdown
---
title: 'Meu Post Incrível'
date: '2025-11-05'
excerpt: 'Descrição do post'
image: '/blog/images/posts/minha-foto.jpg'
---

Conteúdo do post...
```

⚠️ **IMPORTANTE:** Note o prefixo `/blog` no caminho!

Isso é necessário porque o blog está deployado em `zarathon.github.io/blog`.

## 🎯 Referência Rápida

### Se o repositório é `username.github.io/blog`:
```markdown
image: '/blog/images/posts/sua-imagem.jpg'
```

### Se o repositório é `username.github.io` (raiz):
```markdown
image: '/images/posts/sua-imagem.jpg'
```

## 📝 Exemplo Completo

**1. Adicione a imagem:**
```bash
cp ~/Downloads/minha-foto.jpg public/images/posts/
```

**2. Crie/edite o post:**
```markdown
---
title: 'Voltei ao Blog'
date: '2025-11-05'
excerpt: 'Meu retorno à escrita'
image: '/blog/images/posts/minha-foto.jpg'
---

# Conteúdo do Post

Seu texto aqui...
```

**3. Commit e push:**
```bash
git add public/images/posts/minha-foto.jpg
git add posts/meu-post.md
git commit -m "Add post with local image"
git push
```

## 🎨 Dicas de Otimização

### Reduzir Tamanho das Imagens

Para melhor performance, reduza o tamanho das imagens antes de adicionar:

**Online (fácil):**
- https://tinypng.com/
- https://squoosh.app/

**Linha de comando (ImageMagick):**
```bash
# Redimensionar para 800x800
convert minha-foto.jpg -resize 800x800^ -gravity center -extent 800x800 minha-foto-800.jpg

# Comprimir qualidade
convert minha-foto.jpg -quality 85 minha-foto-compressed.jpg
```

**Com FFmpeg:**
```bash
# Redimensionar e comprimir
ffmpeg -i input.jpg -vf scale=800:800 -q:v 2 output.jpg
```

### Formato Recomendado

**WebP** oferece melhor compressão:
```bash
# Converter JPG para WebP
cwebp -q 80 input.jpg -o output.webp
```

Então no post:
```markdown
image: '/blog/images/posts/minha-foto.webp'
```

## 🔄 Migrar de URLs Externas

Se você já tem posts com URLs externas (Unsplash, etc.) e quer trocar:

**Antes:**
```markdown
image: 'https://images.unsplash.com/photo-123456789?w=400'
```

**Depois:**
1. Baixe a imagem: `wget 'URL' -O public/images/posts/meu-post.jpg`
2. Atualize o frontmatter: `image: '/blog/images/posts/meu-post.jpg'`
3. Commit e push

## 📊 Organização Sugerida

Para muitas imagens, organize por ano/mês:

```
public/images/posts/
├── 2025/
│   ├── 01/
│   │   ├── post-janeiro-1.jpg
│   │   └── post-janeiro-2.jpg
│   └── 02/
│       └── post-fevereiro.jpg
└── avatars/
    └── zara.jpg
```

Então:
```markdown
image: '/blog/images/posts/2025/01/post-janeiro-1.jpg'
```

## 🚫 O Que NÃO Fazer

❌ **Não use caminhos absolutos do seu computador:**
```markdown
# ERRADO:
image: '/Users/zarathon/Desktop/foto.jpg'
image: 'C:\Users\zarathon\foto.jpg'
```

❌ **Não esqueça do prefixo `/blog`:**
```markdown
# ERRADO (se o basePath é /blog):
image: '/images/posts/foto.jpg'

# CORRETO:
image: '/blog/images/posts/foto.jpg'
```

❌ **Não adicione imagens muito grandes:**
- Evite imagens maiores que 2MB
- Otimize antes de adicionar ao projeto

## ✅ Checklist

Antes de fazer commit:
- [ ] Imagem está em `public/images/posts/`
- [ ] Caminho no frontmatter começa com `/blog/images/posts/`
- [ ] Imagem tem tamanho razoável (< 500KB ideal)
- [ ] Formato é JPG, PNG ou WebP
- [ ] Testou localmente com `npm run dev`

## 🛠️ Troubleshooting

**Imagem não aparece:**
1. Verifique se o caminho está correto (com `/blog` no início)
2. Confirme que a imagem está em `public/images/posts/`
3. Faça hard refresh no browser (Ctrl+Shift+R ou Cmd+Shift+R)
4. Verifique o console do browser por erros 404

**Imagem aparece local mas não em produção:**
1. Confirme que fez commit da imagem
2. Confirme que fez push para o GitHub
3. Aguarde o workflow do GitHub Actions completar
4. Limpe o cache do browser

## 📚 Recursos

- [Next.js Static File Serving](https://nextjs.org/docs/app/building-your-application/optimizing/static-assets)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
- [WebP Format](https://developers.google.com/speed/webp)
