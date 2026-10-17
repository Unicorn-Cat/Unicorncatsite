import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { sortByDateDesc, visiblePosts } from "../../lib/blog";

export async function GET(context: APIContext) {
    const posts = sortByDateDesc(visiblePosts(await getCollection("blog")));
    return rss({
        title: "The Workbench — Unicorncat Consulting",
        description: "What we're learning, what worked, and what we broke.",
        site: context.site ?? "https://unicorncatconsulting.com/",
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description ?? post.data.excerpt,
            pubDate: post.data.date,
            link: `/blog/${post.slug}`,
        })),
    });
}
