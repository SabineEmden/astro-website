import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const notes = await getCollection("notes");
  return rss({
    title: "Sabine's Notes",
    description: "Notes published on Sabine Emden's personal website",
    site: context.site,
    items: notes.map((note) => ({
      ...note.data,
      // Compute RSS link from post `slug`
      link: `/notes/${note.slug}/`,
    })),
  });
}
