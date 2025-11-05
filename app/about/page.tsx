import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

const siteUrl = 'https://zarathon.github.io/blog';

export const metadata: Metadata = {
  title: 'Sobre Mim',
  description: 'Conheça mais sobre Zarathon Viana e sua trajetória em tecnologia. Mais de 10 anos de experiência em engenharia de software, gestão de times e liderança técnica.',
  openGraph: {
    type: 'profile',
    locale: 'pt_BR',
    url: `${siteUrl}/about`,
    siteName: '🧠 Devaneios do Zara',
    title: 'Sobre Mim - Zarathon Viana',
    description: 'Profissional de tecnologia com mais de 20 anos de experiência em engenharia de software, gestão de times e liderança técnica.',
    images: [
      {
        url: `${siteUrl}/images/about/zara-blog-dots.jpg`,
        width: 1200,
        height: 630,
        alt: 'Zarathon Viana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Mim - Zarathon Viana',
    description: 'Profissional de tecnologia com mais de 20 anos de experiência em engenharia de software, gestão de times e liderança técnica.',
    images: [`${siteUrl}/images/about/zara-blog-dots.jpg`],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-8 md:px-12 lg:px-16 py-16">
        <Button asChild variant="ghost" className="mb-12">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para home
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <div className="flex flex-col items-center mb-8">
              <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-muted shadow-lg mb-6">
                <img
                  src="/blog/images/about/zara-blog-dots.jpg"
                  alt="Zarathon Viana"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-5xl md:text-6xl font-heading text-center">
                👨🏾‍💻 Sobre Mim
              </CardTitle>
            </div>
            <Separator />
          </CardHeader>

          <CardContent className="px-12 md:px-16 lg:px-20 py-10">
            <article className="prose prose-lg md:prose-xl prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:leading-relaxed">
              <h2>Zarathon Viana</h2>

              <p>
                Profissional de tecnologia com mais de 20 anos de experiência em engenharia de software,
                gestão de times e liderança técnica. Apaixonado por resolver problemas complexos e
                construir times de alta performance.
              </p>

              <h3>Experiência</h3>
              <p>
                Ao longo da minha carreira, trabalhei em diversos projetos desafiadores, desde startups
                até grandes empresas, passando um bom tempo no serviço público federal. Minha especialidade é transformar ideias em produtos reais,
                liderando times técnicos e tomando decisões arquiteturais críticas.
              </p>

              <h3>O Que Faço</h3>
              <ul>
                <li>Engenharia de Software e Arquitetura</li>
                <li>Gestão e Liderança de Times Técnicos</li>
                <li>Consultoria em Tecnologia e Processos</li>
                <li>Mentoria para Desenvolvedores</li>
              </ul>

              <h3>Por Que Este Blog?</h3>
              <p>
                Depois de anos focado 100% no trabalho, decidi voltar a compartilhar conhecimento.
                Este blog é meu espaço para falar sobre engenharia de software, gestão de times,
                liderança em tech, IA e todas as tretas que ninguém conta nas palestrinhas motivacionais.
              </p>

              <p>
                Aqui você não vai encontrar conteúdo raso ou vendedor de ilusão. É conteúdo real,
                baseado em experiência de guerra, para quem quer crescer de verdade na área de tecnologia.
              </p>

              <h3>Contato</h3>
              <p>
                Quer trocar uma ideia? Entre em contato através das redes sociais ou email.
              </p>

              <div className="flex gap-4 flex-wrap mt-8">
                <Button asChild variant="default">
                  <a href="https://linkedin.com/in/eusouozara" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://github.com/zarathon" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="mailto:contato@example.com">
                    Email
                  </a>
                </Button>
              </div>
            </article>
          </CardContent>
        </Card>

        <div className="mt-12">
          <Separator className="mb-8" />
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
