import type { CollectionEntry } from "astro:content";

export type Author = "Alex" | "Dylan";

export const AUTHORS: Record<
    Author,
    {
        name: string;
        initial: string;
        initials: string;
        avatarClass: string;
        writes: string;
        joined: string; // placeholder — confirm with client
    }
> = {
    Alex: {
        name: "Alex Gunter",
        initial: "A",
        initials: "AG",
        avatarClass: "avatar--alex",
        writes: "training",
        joined: "Jan 2026",
    },
    Dylan: {
        name: "Dylan Paulus",
        initial: "D",
        initials: "DP",
        avatarClass: "avatar--dylan",
        writes: "software",
        joined: "Jan 2026",
    },
};

export type Post = CollectionEntry<"blog">;

/** "Jul 14, 2026" */
export function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        timeZone: "UTC",
    });
}

/** "JUL 2026" — home-page card meta */
export function formatMonthYear(date: Date): string {
    return date
        .toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
        .toUpperCase();
}

/** Computed from the body — never authored by hand */
export function readingTime(body: string): number {
    const words = body.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 220));
}

/** "1.4k views" / "980 views" — only used when a real count exists */
export function formatViews(views: number): string {
    return views >= 1000
        ? `${(Math.round(views / 100) / 10).toFixed(1).replace(/\.0$/, "")}k views`
        : `${views} views`;
}

export function sortByDateDesc(posts: Post[]): Post[] {
    return [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function visiblePosts(posts: Post[]): Post[] {
    return posts.filter((p) => !p.data.draft || !import.meta.env.PROD);
}

/** Pinned board: PINNED badges first, then the rest, each newest first */
export function sortPinned(posts: Post[]): Post[] {
    const pins = sortByDateDesc(posts.filter((p) => p.data.badge === "PINNED"));
    const rest = sortByDateDesc(posts.filter((p) => p.data.badge !== "PINNED"));
    return [...pins, ...rest];
}
