const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { Feed } = require('feed');

const postsDirectory = path.join(process.cwd(), 'posts');
const siteUrl = 'https://zarathon.github.io/blog';

function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        excerpt: matterResult.data.excerpt,
        image: matterResult.data.image,
        tags: matterResult.data.tags,
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

function generateRSS() {
  const posts = getSortedPostsData();

  const feed = new Feed({
    title: "🧠 Devaneios do Zara",
    description: "Blog sobre engenharia de software, tecnologia, carreira e mais. Conteúdo real, baseado em experiência de guerra, para quem quer crescer de verdade na área de tecnologia.",
    id: siteUrl,
    link: siteUrl,
    language: "pt-BR",
    image: `${siteUrl}/og-default.svg`,
    favicon: `${siteUrl}/icon.svg`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Zarathon Viana`,
    updated: new Date(posts[0]?.date || new Date()),
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
      json: `${siteUrl}/feed.json`,
      atom: `${siteUrl}/atom.xml`,
    },
    author: {
      name: "Zarathon Viana",
      email: "contato@example.com",
      link: `${siteUrl}/about`,
    },
  });

  // Adiciona apenas os últimos 20 posts ao feed
  posts.slice(0, 20).forEach((post) => {
    const postUrl = `${siteUrl}/posts/${post.slug}`;

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.excerpt,
      content: post.excerpt, // Usando excerpt, não full content
      author: [
        {
          name: "Zarathon Viana",
          email: "contato@example.com",
          link: `${siteUrl}/about`,
        },
      ],
      date: new Date(post.date),
      image: post.image ? `${siteUrl}${post.image}` : undefined,
      category: post.tags?.map(tag => ({ name: tag })) || [],
    });
  });

  // Cria a pasta public se não existir
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Gera os arquivos de feed
  fs.writeFileSync(path.join(publicDir, 'feed.xml'), feed.rss2());
  fs.writeFileSync(path.join(publicDir, 'atom.xml'), feed.atom1());
  fs.writeFileSync(path.join(publicDir, 'feed.json'), feed.json1());

  console.log('✅ RSS feeds gerados com sucesso!');
  console.log(`   📄 RSS 2.0: ${siteUrl}/feed.xml`);
  console.log(`   📄 Atom: ${siteUrl}/atom.xml`);
  console.log(`   📄 JSON Feed: ${siteUrl}/feed.json`);
  console.log(`   📊 ${posts.slice(0, 20).length} posts incluídos no feed`);
}

generateRSS();
