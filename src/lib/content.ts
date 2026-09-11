import { getCollection, type CollectionEntry } from "astro:content";

const showDrafts = import.meta.env.DEV;

export async function getPublishedBlog(): Promise<CollectionEntry<"blog">[]> {
    const posts = await getCollection("blog", ({ data }) => showDrafts || !data.draft);
    return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPublishedPodcast(): Promise<CollectionEntry<"podcast">[]> {
    const episodes = await getCollection("podcast", ({ data }) => showDrafts || !data.draft);
    return episodes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(d: Date): string {
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
