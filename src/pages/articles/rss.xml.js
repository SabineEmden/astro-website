import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const articles = await getCollection("articles");
  return rss({
    title: "Sabine's Articles",
    description: "Articles published on Sabine Emden's personal website",
    site: context.site,
    items: articles.map((article) => ({
      ...article.data,
      // Compute RSS link from post `slug`
      link: `/articles/${article.slug}/`,
    })),
  });
}
