import { z } from "zod";

const WikiSummaryTitles = z.object({
    canonical: z.string(),
    normalized: z.string(),
    display: z.string()
});

const WikiSummaryImage = z.object({
    source: z.string(),
    width: z.number(),
    height: z.number()
});

const WikiSummaryCoords = z.object({
    lat: z.number(),
    lon: z.number()
});

const WikiSummary = z.object({
    titles: WikiSummaryTitles,
    pageId: z.number().optional(),
    extract: z.string(),
    extract_html: z.string().optional(),
    thumbnail: WikiSummaryImage.optional(),
    originalimage: WikiSummaryImage.optional(),
    lang: z.string(),
    dir: z.string(),
    timestamp: z.string().optional(),
    description: z.string().optional(),
    coordinates: WikiSummaryCoords.optional()
});

export type WikiSummary = z.infer<typeof WikiSummary>;

const RANDOM_SUMMARY_ENDPOINT = "https://en.wikipedia.org/api/rest_v1/page/random/summary";

/**
 * CAN THROW ERRORS!
 */
export async function fetchRandomWikiSummary(): Promise<WikiSummary> {
    const response = await fetch(RANDOM_SUMMARY_ENDPOINT, { headers: { "Accept": "application/json" } });
    if (response.status !== 200) {
        throw new Error(`Bad status from Wikipedia (summary fetch): ${response.status}`);
    }

    const body = await response.json();
    return WikiSummary.parse(body);
}

const ARTICLE_SUMMARY_ENDPOINT = "https://en.wikipedia.org/api/rest_v1/page/summary/";

export async function fetchWikiSummary(title: string): Promise<WikiSummary> {
    const response = await fetch(`${ARTICLE_SUMMARY_ENDPOINT}${title}`, { headers: { "Accept": "application/json" } });
    if (response.status !== 200) {
        throw new Error(`Bad status from Wikipedia (summary fetch): ${response.status}`);
    }

    const body = await response.json();
    return WikiSummary.parse(body);
}

const ARTICLE_TITLE_ENDPOINT = "https://en.wikipedia.org/api/rest_v1/page/title/";

const WikiRevision = z.object({
    items: z.array(z.object({
        title: z.string(),
        page_id: z.number(),
        rev: z.number(),
        tid: z.string(),
        namespace: z.number(),
        user_id: z.number(),
        user_text: z.string(),
        timestamp: z.string(),
        comment: z.string(),
        tags: z.array(z.string()),
        restrictions: z.array(z.any()),
        page_language: z.string(),
        redirect: z.boolean()
    }))
});

/**
 * CAN THROW ERRORS!
 */
export async function fetchWikiSummaryRevision(summary: WikiSummary): Promise<number> {
    const response = await fetch(`${ARTICLE_TITLE_ENDPOINT}${summary.titles.canonical}`);
    if (response.status !== 200) {
        throw new Error(`Bad status from Wikipedia (revision fetch): ${response.status}`);
    }

    const body = await response.json();
    return WikiRevision.parse(body).items[0].rev;
}