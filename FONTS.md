# Guia de Configuração de Fontes

## Configuração Atual

O blog está configurado com duas famílias de fontes:

- **Texto Normal**: DM Mono - Monoespaçada, técnica e moderna
- **Headers/Títulos**: Instrument Serif - Elegante, única e expressiva

**Dark Mode**: Habilitado por padrão

## Como Funciona

### 1. Definição das Fontes (`app/layout.tsx`)

```typescript
import { Inter, Playfair_Display } from "next/font/google";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontHeading = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});
```

### 2. Aplicação no HTML

```typescript
<body className={`${fontSans.variable} ${fontHeading.variable} font-sans antialiased`}>
```

### 3. Uso nos Componentes

- **Para texto normal**: Use `font-sans` ou nenhuma classe (é o padrão)
- **Para títulos**: Use `font-heading`

Exemplos:
```tsx
<h1 className="font-heading">Título Principal</h1>
<p className="font-sans">Parágrafo normal</p>
```

## Como Trocar as Fontes

### Opção 1: Usar outras fontes do Google Fonts

1. Escolha fontes em [Google Fonts](https://fonts.google.com/)

2. Substitua no `app/layout.tsx`:

```typescript
// Exemplos populares:

// Combinação Moderna
import { Poppins, Open_Sans } from "next/font/google";

// Combinação Elegante
import { Lora, Merriweather } from "next/font/google";

// Combinação Tech/Dev
import { Fira_Code, Roboto } from "next/font/google";

// Combinação Minimalista
import { Montserrat, Lato } from "next/font/google";
```

3. Atualize as constantes:

```typescript
const fontSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontHeading = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"], // Para headers, use pesos mais pesados
  display: "swap",
});
```

### Opção 2: Usar fontes locais

1. Coloque os arquivos de fonte em `public/fonts/`

2. Configure no `app/layout.tsx`:

```typescript
import localFont from "next/font/local";

const fontSans = localFont({
  src: "../public/fonts/MinhaFonte-Regular.woff2",
  variable: "--font-sans",
});

const fontHeading = localFont({
  src: "../public/fonts/MinhaFonteHeading-Bold.woff2",
  variable: "--font-heading",
});
```

## Combinações Populares de Fontes

### Para Blogs de Tecnologia
- Headers: **Fira Code** ou **JetBrains Mono**
- Texto: **Inter** ou **Roboto**

### Para Blogs Pessoais
- Headers: **Playfair Display** ou **Lora**
- Texto: **Open Sans** ou **Merriweather**

### Para Blogs Corporativos
- Headers: **Montserrat** ou **Poppins**
- Texto: **Lato** ou **Source Sans Pro**

### Para Blogs Minimalistas
- Headers: **Space Grotesk** ou **DM Sans**
- Texto: **Inter** ou **IBM Plex Sans**

## Opções Avançadas

### Adicionar pesos específicos

```typescript
const fontHeading = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});
```

### Adicionar estilos itálicos

```typescript
const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
```

### Usar mais de duas fontes

Se quiser adicionar uma terceira fonte (ex: para código):

```typescript
import { Inter, Playfair_Display, Fira_Code } from "next/font/google";

const fontMono = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// No body:
<body className={`${fontSans.variable} ${fontHeading.variable} ${fontMono.variable} font-sans`}>

// Uso:
<code className="font-mono">código aqui</code>
```

## Classes Úteis do Tailwind

- `font-sans` - Aplica a fonte de texto normal
- `font-heading` - Aplica a fonte de títulos
- `font-mono` - Aplica fonte monoespaçada (se configurada)

## Links Úteis

- [Google Fonts](https://fonts.google.com/)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Font Pairing Guide](https://fontpair.co/)
