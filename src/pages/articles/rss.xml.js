import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const articles = await getCollection("articles");
  return rss({
    title: "Sabine Emden's Articles",
    description: "Articles published on Sabine Emden's personal website",
    site: context.site,
    items: articles.map((article) => ({
      ...article.data,
      // Compute RSS link from post `slug`
      link: `/articles/${article.slug}/`,
      // Note: this will not process components or JSX expressions in MDX files.
      content: sanitizeHtml(parser.render(article.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
  });
}
