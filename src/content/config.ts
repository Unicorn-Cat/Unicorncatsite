import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        author: z.enum(["Alex", "Dylan"]),
        authorRole: z.string().default("Co-founder"),
        category: z.enum(["success story", "adoption", "training", "software", "news", "meta"]),
        /** Header-bar text on the post page, e.g. "Success story · Logistics". Falls back to the category. */
        categoryLabel: z.string().optional(),
        date: z.coerce.date(),
        /** Real counts only — the view line is omitted when unset. Do not invent numbers. */
        views: z.number().optional(),
        pinned: z.boolean().default(false),
        badge: z.enum(["PINNED", "CASE STUDY"]).nullable().default(null),
        coverImage: z.string().optional(),
        /** Italic per-post sign-off, e.g. "Written before we talked ourselves out of it. — Dylan" */
        signoff: z.string().optional(),
        /** Per-post reply-bar CTA — write these per post, echoing the article's problem */
        ctaHeading: z.string().optional(),
        ctaBody: z.string().optional(),
        draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
