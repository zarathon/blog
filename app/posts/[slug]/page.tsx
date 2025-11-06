import Link from 'next/link';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

const siteUrl = 'https://zarathon.github.io/blog';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPostData(slug);
    const postUrl = `${siteUrl}/posts/${slug}`;
    const ogImage = post.image ? `${siteUrl}${post.image}` : `${siteUrl}/og-default.svg`;

    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        type: 'article',
        locale: 'pt_BR',
        url: postUrl,
        siteName: '🧠 Devaneios do Zara',
        title: post.title,
        description: post.excerpt,
        publishedTime: post.date,
        authors: ['Zarathon Viana'],
        tags: post.tags,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [ogImage],
      },
    };
  } catch (error) {
    return {
      title: 'Post não encontrado',
    };
  }
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
        <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16">
          <Button asChild variant="ghost" className="mb-8 sm:mb-12">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para home
            </Link>
          </Button>

          <Card>
            {post.image && (
              <div className="w-full flex justify-center pt-8 pb-4 px-8">
                <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-muted shadow-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <CardHeader>
              <div className="flex items-center gap-2 mb-4 justify-center">
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
              <CardTitle className="text-3xl sm:text-4xl md:text-6xl mb-4 sm:mb-6 font-heading leading-tight text-center">
                📄 {post.title}
              </CardTitle>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="inline-block"
                    >
                      <Badge variant="outline" className="hover:bg-accent transition-colors">
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
              <Separator />
            </CardHeader>

            <CardContent className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10">
              <article
                className="prose prose-base sm:prose-lg md:prose-lg prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-h1:text-3xl sm:text-4xl md:text-5xl prose-h2:text-2xl sm:text-3xl md:text-4xl prose-h3:text-xl sm:text-2xl md:text-3xl prose-p:leading-relaxed prose-a:text-primary prose-code:text-foreground prose-pre:bg-muted"
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
              />
            </CardContent>
          </Card>

          <div className="mt-12">
            <Separator className="mb-8" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para home
                </Link>
              </Button>
              <div className="flex gap-4">
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sobre Mim
                </Link>
                <Link href="/blog/feed.xml" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  RSS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
