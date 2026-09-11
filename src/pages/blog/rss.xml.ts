import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedBlog } from "../../lib/content";

export async function GET(context: APIContext) {
    const posts = await getPublishedBlog();
    return rss({
        title: "Unicorncat Consulting Blog",
        description: "Lightly cleaned-up transcripts of the weekly founders' conversation.",
        site: context.site ?? "https://unicorncatconsulting.com/",
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.date,
            link: `/blog/${post.slug}`,
        })),
    });
}
