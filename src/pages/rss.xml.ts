import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const inversiones = await getCollection('inversiones');
  const ia = await getCollection('ia');

  const allPosts = [...inversiones, ...ia].sort(
    (a: any, b: any) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf()
  );

  return rss({
    title: 'CarteraIA | Inversiones e IA',
    description: 'Guías expertas sobre fondos indexados, ETFs y herramientas de IA para maximizar tu patrimonio.',
    site: context.site,
    items: allPosts.map((post: any) => ({
      title: post.data.title,
      pubDate: new Date(post.data.publishDate),
      description: post.data.description,
      link: `/${post.data.category}/${post.id}/`,
    })),
    customData: `<language>es-es</language>`,
  });
}