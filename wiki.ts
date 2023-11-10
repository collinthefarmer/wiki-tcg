import { z } from "zod";

const ARTICLE_SUMMARY_ENDPOINT = "https://en.wikipedia.org/api/rest_v1/page/summary";
const ARTICLE_RELATED_ENDPOINT = "https://en.wikipedia.org/api/rest_v1/page/related";
const ARTICLE_RANDOM_SUMMARY_ENDPOINT = "https://en.wikipedia.org/api/rest_v1/page/random/summary";

const ArticleSummaryTitles = z.object({
    canonical: z.string(),
    normalized: z.string(),
    display: z.string()
});

const ArticleSummaryImage = z.object({
    source: z.string(),
    width: z.number(),
    height: z.number()
});

const ArticleSummaryCoords = z.object({
    lat: z.number(),
    lon: z.number()
});

export const ArticleSummary = z.object({
    titles: ArticleSummaryTitles,
    pageId: z.number().optional(),
    extract: z.string(),
    extract_html: z.string().optional(),
    thumbnail: ArticleSummaryImage.optional(),
    originalimage: ArticleSummaryImage.optional(),
    lang: z.string(),
    dir: z.string(),
    timestamp: z.string().optional(),
    description: z.string().optional(),
    coordinates: ArticleSummaryCoords.optional()
});

export type ArticleSummary = z.infer<typeof ArticleSummary>;

export const ArticleRelated = z.object({ pages: z.array(ArticleSummary) });

async function wikiFetch(endpoint: string) {
    const response = await fetch(endpoint, { headers: { "Accept": "application/json" } });
    return await response.json();
}

export async function fetchSummary(title: string) {
    return ArticleSummary.parse(await wikiFetch(`${ARTICLE_SUMMARY_ENDPOINT}/${title}`));
}

export async function fetchRandomSummary() {
    return ArticleSummary.parse(await wikiFetch(ARTICLE_RANDOM_SUMMARY_ENDPOINT));
}

async function fetchRelated(title: string) {
    return ArticleRelated.parse(await wikiFetch(`${ARTICLE_RELATED_ENDPOINT}/${title}`));
}
