import { defineCollection, z } from "astro:content";

// Blog: lightly polished transcripts of the weekly Alex + Dylan meeting.
// Written by the meeting-to-website pipeline; published by a human merging the PR.
const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        authors: z.array(z.string()).default(["Alex Gunter", "Dylan Paulus"]),
        tags: z.array(z.string()).default([]),
        sourceMeeting: z.string().optional(), // transcript stem, e.g. 2026-09-10-1400-staff-weekly
        episode: z.string().optional(), // slug of the matching podcast episode, if any
        draft: z.boolean().default(false),
    }),
});

// Podcast: episode pages in show-notes + Q&A form. Audio is optional until we ship it.
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
