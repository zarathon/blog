import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from 'lucide-react';

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen bg-background">
      {/* Header: full width com padding generoso */}
      <header className="max-w-full mx-auto px-12 md:px-16 lg:px-20 py-16 mb-12">
        <div className="text-center mb-20">
          <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tight font-heading leading-none">
            Devaneios do Zara
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mt-6">
            Blog sobre engenharia de software, tecnologia, carreira e mais
          </p>
        </div>
        <Separator />
      </header>

      {/* Lista de posts: bem largo */}
      <main className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 pb-16">
        <div className="space-y-8">
            {posts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <time>
                        {new Date(post.date).toLocaleDateString('pt-BR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-heading leading-tight">
                    <Link href={`/posts/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="default">
                    <Link href={`/posts/${post.slug}`}>
                      Ler mais
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 mt-20 pb-16">
        <Separator className="mb-8" />
        <p className="text-sm text-muted-foreground text-center">
          Feito com Next.js e hospedado no GitHub Pages
        </p>
      </footer>
    </div>
  );
}
