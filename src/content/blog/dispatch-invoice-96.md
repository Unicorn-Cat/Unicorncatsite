---
title: "How a nine-person dispatch office cut invoice handling by 96%"
excerpt: "Six weeks, no new licenses, a team that now maintains the automation themselves. The full write-up."
author: "Dylan"
authorRole: "Co-founder"
category: "success story"
categoryLabel: "Success story · Logistics"
date: 2026-07-14
pinned: true
badge: "CASE STUDY"
signoff: "Written before we talked ourselves out of it. — Dylan"
ctaHeading: "Retyping the same data between systems?"
ctaBody: "Tell us where the time goes. We'll tell you if there's a small tool for it."
---

A regional dispatch office was drowning in paper. Nine people, four hundred carrier invoices a week, and every one of them retyped by hand into three separate systems — the accounting package, the load board, and a shared spreadsheet nobody fully trusted.

By the time we finished, the same work took twenty minutes a day. Here's exactly how the six weeks went, what we built, and what we deliberately left alone.

## The problem wasn't the model

When the office first called us, they wanted "an AI that reads invoices." That's the easy part. The hard part is everything around it: which of the three systems is the source of truth, what happens when a carrier's format changes, and who gets paged when a number looks wrong.

> The goal was never to remove people from the loop. It was to remove the retyping.

So we started by sitting with the team for two days and watching. No slides. We mapped every keystroke from "invoice arrives" to "invoice paid," and marked the steps that were pure mechanical transcription.

## What we built

A small intake tool. Invoices land in a shared inbox, get parsed, and are staged for a one-click human review before anything writes to the accounting system. Three things made it stick:

- **It fit their existing systems.** No migration, no new platform to learn. The tool wrote into the software they already used.
- **It kept a human in the loop.** Every invoice still gets eyes on it — but as a 5-second confirmation, not a 5-minute retype.
- **The team can maintain it.** We trained two people to adjust the parsing rules themselves and left a plain-English runbook.

## The result

Invoice handling dropped from roughly fourteen hours a week to under one. No new software licenses. And six months later, the office is still running it without us — which is the only metric that actually matters.

### Would this work for you?

If your team is retyping the same data between systems, there's almost certainly a version of this for you. It rarely needs a big platform. It usually needs someone to watch the work for two days and build the small thing.
