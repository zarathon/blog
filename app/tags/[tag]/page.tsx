import Link from 'next/link';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  try {
    const posts = getPostsByTag(tag);

    if (posts.length === 0) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="max-w-full mx-auto px-12 md:px-16 lg:px-20 py-16 mb-12">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para home
            </Link>
          </Button>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Tag className="h-12 w-12" />
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight font-heading leading-none">
                #{tag}
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {posts.length} {posts.length === 1 ? 'post encontrado' : 'posts encontrados'}
            </p>
          </div>
          <Separator />
        </header>

        {/* Lista de posts */}
        <main className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 pb-16">
          <div className="space-y-8">
            {posts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                <div className="flex gap-6">
                  <div className="flex-1">
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
                          📄 {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-base">
                        {post.excerpt}
                      </CardDescription>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.map((postTag) => (
                            <Link
                              key={postTag}
                              href={`/tags/${postTag}`}
                              className="inline-block"
                            >
                              <Badge
                                variant={postTag === tag ? "default" : "outline"}
                                className="hover:bg-accent transition-colors"
                              >
                                #{postTag}
                              </Badge>
                            </Link>
                          ))}
                        </div>
                      )}
                    </CardHeader>
                    <CardFooter>
                      <Button asChild variant="default">
                        <Link href={`/posts/${post.slug}`}>
                          Ler mais
                        </Link>
                      </Button>
                    </CardFooter>
                  </div>
                  {post.image && (
                    <div className="flex items-center pr-6">
                      <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-muted">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 mt-20 pb-16">
          <Separator className="mb-8" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para home
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Mostrando todos os posts com a tag #{tag}
            </p>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
