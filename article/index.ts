import { fetchRandomWikiSummary, fetchWikiSummary, fetchWikiSummaryRevision, WikiSummary } from "./wiki.ts";

type BaseCard = {
    id: string,
    revision: number,
    description: string
    titleCanonical: string,
    titleNormalized: string,
    extract: string
    createdAt: number
};

type BaseImageCard = BaseCard & {
    imageSource: string,
    imageWidth: number,
    imageHeight: number
};

export type CardSeed = BaseImageCard | BaseCard;

export async function randomArticleSeed(): Promise<CardSeed> {
    const article = await fetchRandomWikiSummary();
    return buildSeedFromArticle(article);
}

export async function articleSeed(title: string): Promise<CardSeed> {
    const article = await fetchWikiSummary(title);
    return buildSeedFromArticle(article);
}

async function buildSeedFromArticle(article: WikiSummary): Promise<CardSeed> {
    const revision = await fetchWikiSummaryRevision(article);
    return {
        id: generateCardId(article.titles.canonical, revision),
        titleCanonical: article.titles.canonical,
        titleNormalized: article.titles.normalized,
        description: article.description ?? article.titles.canonical,
        extract: article.extract,
        revision,
        createdAt: Date.now()
    };
}

function generateCardId(canonicalTitle: string, revision: number): string {
    return `${canonicalTitle}:${revision}`;
}
