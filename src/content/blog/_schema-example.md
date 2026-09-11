---
# Underscore-prefixed files are ignored by Astro content collections.
# This one documents the frontmatter the meeting-to-website pipeline writes
# for a Workbench (blog) post. Required by the schema: title, excerpt,
# author, category, date. The rest is optional.
title: "Schema example (not published)"
excerpt: "One-sentence board-row summary in the site voice."
author: "Dylan" # "Alex" | "Dylan" — drives the board avatar and poster column
category: "meta" # success story | adoption | training | software | news | meta
date: 2026-09-11
draft: true # drafts render in dev only
# --- pipeline fields ---
description: "Longer summary used for the RSS item; the board row uses excerpt."
authors: ["Alex Gunter", "Dylan Paulus"] # everyone in the source conversation
tags: ["example"]
sourceMeeting: "2026-09-11-1400-staff-weekly" # transcript stem
episode: "example-episode" # slug of the matching podcast episode entry, if any
# --- optional board/post fields ---
# categoryLabel: "Success story · Logistics"  # post-page header bar
# pinned: true
# badge: "PINNED" # PINNED | CASE STUDY
# signoff: "Written before we talked ourselves out of it. — Dylan"
# ctaHeading: "Retyping the same data between systems?"
# ctaBody: "Tell us where the time goes. We'll tell you if there's a small tool for it."
---

## What we tried

Body is the lightly polished transcript. Speaker turns become short paragraphs. Section headers
("What we tried / What broke / What we decided / What we'd tell you") are added by the pipeline.

## What broke

Nothing appears here that was not said in the room.
