# Tags - Guia de Uso

Este documento explica como usar tags nos posts do blog e as regras de validação.

## Como Adicionar Tags

No frontmatter do seu post (arquivo `.md` na pasta `posts/`), adicione as tags no formato YAML:

```yaml
---
title: 'Título do Post'
date: '2025-11-05'
excerpt: 'Resumo do post'
tags: ['javascript', 'typescript', 'web-development']
---
```

## Regras de Validação

### ✅ Tags Válidas

- Apenas letras sem acentos (a-z, A-Z)
- Números (0-9)
- Hífens (-) para separar palavras
- Letras minúsculas são recomendadas para consistência

**Exemplos válidos:**
```yaml
tags: ['javascript', 'react', 'node-js']
tags: ['carreira', 'tecnologia', 'engenharia-software']
tags: ['python', 'machine-learning', 'ia']
```

### ❌ Tags Inválidas

- Tags com acentos ou caracteres especiais
- Espaços (use hífens no lugar)
- Caracteres especiais como @, #, /, \, etc.

**Exemplos inválidos:**
```yaml
tags: ['reflexões']        # ❌ Contém acento (ã, õ)
tags: ['gestão']           # ❌ Contém acento (ã)
tags: ['inteligência']     # ❌ Contém acento (ê)
tags: ['web development']  # ❌ Contém espaço (use 'web-development')
```

**Como corrigir:**
```yaml
tags: ['reflexoes']              # ✅ Sem acento
tags: ['gestao']                 # ✅ Sem acento
tags: ['inteligencia-artificial'] # ✅ Sem acento, com hífen
tags: ['web-development']         # ✅ Hífen ao invés de espaço
```

## Validação Automática

O blog possui validação automática de tags que roda:

1. **Localmente**: Execute `npm run validate-tags` antes de commitar
2. **No Deploy**: GitHub Actions valida automaticamente antes do build

Se alguma tag inválida for detectada, o build falhará com uma mensagem clara indicando qual tag precisa ser corrigida.

## Por Que Essa Regra?

Tags com acentos podem causar problemas:

- URLs com encoding (%C3%A3 ao invés de palavras legíveis)
- Problemas de compatibilidade entre sistemas
- Dificuldade de SEO e compartilhamento
- Inconsistências de renderização em diferentes navegadores

Mantendo tags sem acentos, garantimos URLs limpas como:
- `/blog/tags/reflexoes` ✅
- Ao invés de `/blog/tags/reflex%C3%B5es` ❌

## Boas Práticas

1. Use tags descritivas e específicas
2. Prefira letras minúsculas para consistência
3. Evite criar muitas tags similares
4. Use hífens para separar palavras compostas
5. Limite a 3-5 tags por post

## Exemplos de Tags Comuns

**Tecnologia:**
- `javascript`, `typescript`, `python`, `rust`, `go`
- `react`, `vue`, `angular`, `next-js`
- `node-js`, `express`, `fastify`

**Temas:**
- `carreira`, `lideranca`, `gestao`
- `arquitetura`, `design-patterns`, `clean-code`
- `devops`, `ci-cd`, `docker`, `kubernetes`

**Soft Skills:**
- `comunicacao`, `produtividade`, `mentoria`
- `time-management`, `feedback`, `cultura`

## Testando Localmente

Antes de fazer commit, sempre teste suas tags:

```bash
npm run validate-tags
```

Se aparecer o erro:
```
❌ Erro: Tags com acentos ou caracteres especiais encontradas:

  📄 seu-post.md
     Tag inválida: "reflexões"
     Tag "reflexões" contém acentos ou caracteres especiais
```

Corrija a tag no arquivo e teste novamente até ver:
```
✅ Todas as tags estão válidas (sem acentos ou caracteres especiais)
```
