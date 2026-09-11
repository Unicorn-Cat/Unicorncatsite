import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPodcast } from "../../lib/content";

// Standard RSS now; enclosure is emitted only when an episode has audio, which is what
// podcast apps need once we ship audio. iTunes namespace tags can be added then.
export async function GET(context: APIContext) {
    const episodes = await getPublishedPodcast();
    return rss({
        title: "Unicorncat Consulting Podcast",
        description: "The weekly founders' conversation, in episode form.",
        site: context.site ?? "https://unicorncatconsulting.com/",
        items: episodes.map((ep) => ({
            title: `Episode ${ep.data.episode}: ${ep.data.title}`,
            description: ep.data.description,
            pubDate: ep.data.date,
            link: `/podcast/${ep.slug}`,
            ...(ep.data.audioUrl && ep.data.audioBytes
                ? { enclosure: { url: ep.data.audioUrl, length: ep.data.audioBytes, type: "audio/mpeg" } }
                : {}),
        })),
    });
}
