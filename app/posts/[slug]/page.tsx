import Link from 'next/link';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar } from 'lucide-react';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const post = await getPostData(slug);

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <Button asChild variant="ghost" className="mb-12">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para home
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
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
              <CardTitle className="text-5xl md:text-6xl mb-6 font-heading leading-tight">
                📄 {post.title}
              </CardTitle>
              <Separator />
            </CardHeader>

            <CardContent className="px-12 md:px-16 lg:px-20 py-10">
              <article
                className="prose prose-lg md:prose-xl prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-p:leading-relaxed prose-a:text-primary prose-code:text-foreground prose-pre:bg-muted"
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
              />
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
  } catch (error) {
    notFound();
  }
}
