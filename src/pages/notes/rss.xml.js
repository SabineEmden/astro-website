import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const notes = await getCollection("notes");
  return rss({
    title: "Sabine Emden's Notes",
    description: "Notes published on Sabine Emden's personal website",
    site: context.site,
    items: notes.map((note) => ({
      ...note.data,
      // Compute RSS link from post `slug`
      // This example assumes all notes are rendered as `/notes/[slug]` routes
      link: `/notes/${note.slug}/`,
      // Note: this will not process components or JSX expressions in MDX files.
      content: sanitizeHtml(parser.render(note.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
  });
}
