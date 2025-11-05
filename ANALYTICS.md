# Configuração do Google Analytics

Este blog está preparado para usar o Google Analytics 4 (GA4).

## 🎯 Como Configurar

### Passo 1: Criar Conta no Google Analytics

1. Acesse: https://analytics.google.com/
2. Clique em **"Start measuring"** (ou "Começar a medir")
3. Crie uma conta:
   - Nome da conta: "Devaneios do Zara" (ou outro nome)
   - Marque as opções de compartilhamento desejadas

### Passo 2: Configurar Propriedade

1. Nome da propriedade: "Blog Devaneios do Zara"
2. Fuso horário: `Brazil Time (GMT-3)`
3. Moeda: `Brazilian Real (R$)`

### Passo 3: Configurar Coleta de Dados

1. Plataforma: Selecione **"Web"**
2. Configure o fluxo de dados:
   - URL do site: `https://zarathon.github.io/blog` (ou seu domínio)
   - Nome do fluxo: "Blog Principal"

### Passo 4: Obter o Measurement ID

Após criar o fluxo, você verá uma tela com:

```
Measurement ID: G-XXXXXXXXXX
```

**COPIE ESSE ID!** Você vai precisar dele.

### Passo 5: Configurar Localmente

1. Crie o arquivo `.env.local` na raiz do projeto:

```bash
# Na raiz do projeto (pasta blog/)
touch .env.local
```

2. Adicione o Measurement ID:

```bash
# Abra o arquivo .env.local e adicione:
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Substitua `G-XXXXXXXXXX` pelo seu ID real.

3. Teste localmente:

```bash
npm run dev
```

Abra o navegador e vá em:
- DevTools (F12)
- Aba Console
- Você deve ver requisições para `google-analytics.com`

### Passo 6: Configurar no GitHub (para Produção)

O arquivo `.env.local` não vai para o GitHub (está no .gitignore). Para o Analytics funcionar em produção:

**Opção A: Usar GitHub Secrets (Recomendado)**

1. No seu repositório GitHub (https://github.com/zarathon/blog)
2. Vá em **Settings → Secrets and variables → Actions**
3. Clique em **"New repository secret"**
4. Nome: `NEXT_PUBLIC_GA_ID`
5. Value: `G-XXXXXXXXXX` (seu ID)
6. Clique em **"Add secret"**

7. Edite `.github/workflows/deploy.yml`:

```yaml
- name: Build with Next.js
  run: npm run build
  env:
    NEXT_PUBLIC_GA_ID: ${{ secrets.NEXT_PUBLIC_GA_ID }}
```

**Opção B: Hardcode (Mais Simples, menos seguro)**

Se quiser deixar o ID público (não tem problema, o GA ID é público mesmo):

Edite `app/layout.tsx` e substitua:

```typescript
{process.env.NEXT_PUBLIC_GA_ID && (
  <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
)}
```

Por:

```typescript
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

## 📊 O Que o Google Analytics Vai Rastrear

Com a configuração atual, o GA4 rastreará automaticamente:

✅ **Pageviews** - Quantas vezes cada página foi vista
✅ **Sessões** - Quantos usuários visitaram o blog
✅ **Tempo na página** - Quanto tempo os usuários passaram lendo
✅ **Taxa de rejeição** - Quantos saíram sem interagir
✅ **Origens** - De onde vieram (Google, redes sociais, direto)
✅ **Dispositivos** - Desktop, mobile, tablet
✅ **Localização** - País, cidade dos visitantes
✅ **Páginas mais visitadas** - Quais posts são mais populares

## 🔍 Verificar se Está Funcionando

### 1. Teste em Tempo Real

1. Acesse o Google Analytics
2. Vá em **Reports → Realtime**
3. Abra seu blog em outra aba
4. Você deve ver 1 usuário ativo em tempo real

### 2. Verificar no DevTools

1. Abra seu blog
2. F12 → Aba Network
3. Filtre por "gtag" ou "analytics"
4. Você deve ver requisições sendo enviadas

### 3. Extensão do Chrome (opcional)

Instale: **Google Analytics Debugger**
- Mostra todos os eventos sendo enviados
- Útil para debug

## 🎯 Eventos Personalizados (Opcional Avançado)

Se quiser rastrear ações específicas (cliques, downloads, etc.):

```typescript
// Em qualquer componente
'use client';

export function TrackableButton() {
  const handleClick = () => {
    // Rastreia clique no botão
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'button_click', {
        'event_category': 'engagement',
        'event_label': 'download_post'
      });
    }
  };

  return <button onClick={handleClick}>Download</button>;
}
```

## 🔒 Privacidade e LGPD

O Google Analytics coleta dados anônimos. Para estar em conformidade com LGPD:

**Opção 1: Aviso Simples (Footer)**

Adicione no footer do blog:
```
"Este site usa Google Analytics para análise de tráfego."
```

**Opção 2: Cookie Banner (mais completo)**

Se quiser ser mais robusto, pode adicionar um componente de consentimento de cookies. Posso te ajudar com isso depois se quiser.

## 📈 Onde Ver os Dados

Após alguns dias coletando dados:

1. **Relatórios em Tempo Real**
   - Analytics → Realtime
   - Veja quem está online agora

2. **Visão Geral**
   - Reports → Engagement → Pages and screens
   - Veja páginas mais visitadas

3. **Fontes de Tráfego**
   - Reports → Acquisition → Traffic acquisition
   - Veja de onde vêm seus leitores

4. **Dados Demográficos**
   - Reports → User → Demographics
   - Idade, gênero, interesses

## 🚀 Próximos Passos

Após configurar:

1. Aguarde 24-48h para dados aparecerem
2. Configure metas/conversões (opcional)
3. Crie relatórios customizados
4. Configure alertas para picos de tráfego

## 🐛 Troubleshooting

**"Não vejo dados no GA"**
- Aguarde 24-48h para primeiros dados
- Verifique se o ID está correto
- Teste com modo Real-time

**"Funciona local mas não em produção"**
- Verifique se configurou o secret no GitHub
- Veja os logs do GitHub Actions

**"Console mostra erros de gtag"**
- Normal em desenvolvimento
- Verifique se o ID começa com `G-`

## 📚 Recursos Úteis

- [Documentação GA4](https://support.google.com/analytics/answer/9304153)
- [Next.js + Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 vs Universal Analytics](https://support.google.com/analytics/answer/11583528)

---

**Dúvidas?** Confira a documentação oficial ou me chame! 🚀
