import { defineCollection, z } from "astro:content";

// Blog ("The Workbench"): board posts, including lightly polished transcripts of
// the weekly Alex + Dylan meeting. Transcript posts are written by the
// meeting-to-website pipeline and published by a human merging the PR.
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

        // Meeting-to-website pipeline fields (see _schema-example.md)
        /** Longer summary for RSS; the board row uses `excerpt` */
        description: z.string().optional(),
        /** Everyone in the source conversation, full names */
        authors: z.array(z.string()).optional(),
        tags: z.array(z.string()).default([]),
        /** Transcript stem, e.g. 2026-09-10-1400-staff-weekly */
        sourceMeeting: z.string().optional(),
        /** Slug of the matching podcast episode entry, if any */
        episode: z.string().optional(),
    }),
});

// Podcast: content type for the recording behind a transcript post. Kept as a
// collection so the pipeline can land episode files; the site renders no
// podcast pages — transcripts surface on the blog instead.
const podcast = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        episode: z.number().int().positive(),
        hosts: z.array(z.string()).default(["Alex Gunter", "Dylan Paulus"]),
        durationMinutes: z.number().int().positive().optional(),
        audioUrl: z.string().url().optional(),
        audioBytes: z.number().int().positive().optional(),
        sourceMeeting: z.string().optional(),
        blogPost: z.string().optional(), // slug of the matching blog post, if any
        draft: z.boolean().default(false),
    }),
});

export const collections = { blog, podcast };
