import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  tags?: string[];
  content?: string;
}

export function getSortedPostsData(): PostData[] {
  // Obtém os nomes dos arquivos em /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" do nome do arquivo para obter o slug
      const slug = fileName.replace(/\.md$/, '');

      // Lê o arquivo markdown como string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Usa gray-matter para processar o frontmatter
      const matterResult = matter(fileContents);

      // Combina os dados com o slug
      return {
        slug,
        title: matterResult.data.title as string,
        date: matterResult.data.date as string,
        excerpt: matterResult.data.excerpt as string,
        image: matterResult.data.image as string | undefined,
        tags: matterResult.data.tags as string[] | undefined,
      };
    });

  // Ordena posts por data
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Usa gray-matter para processar o frontmatter
  const matterResult = matter(fileContents);

  // Usa remark para converter markdown em HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combina os dados com o slug e o HTML
  return {
    slug,
    title: matterResult.data.title as string,
    date: matterResult.data.date as string,
    excerpt: matterResult.data.excerpt as string,
    image: matterResult.data.image as string | undefined,
    tags: matterResult.data.tags as string[] | undefined,
    content: contentHtml,
  };
}

// Função para obter todas as tags únicas
export function getAllTags(): string[] {
  const posts = getSortedPostsData();
  const tagsSet = new Set<string>();

  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagsSet.add(tag));
    }
  });

  return Array.from(tagsSet).sort();
}

// Função para obter posts por tag
export function getPostsByTag(tag: string): PostData[] {
  const posts = getSortedPostsData();
  return posts.filter(post => post.tags?.includes(tag));
}
