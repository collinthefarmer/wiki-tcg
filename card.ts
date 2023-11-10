import { ArticleSummary, fetchSummary } from "./wiki.ts";
import { generateText } from "./openai.ts";
import { z } from "zod";

const CARD_CLASSIFICATION_CATEGORIES = await Bun.file("cardtypes.json").json();
const CARD_CLASSIFICATION_DEFAULT_CATEGORY = "MYSTERIOUS FRAGMENT";

export const Card = ArticleSummary.transform(async t => ({
    displayTitle: t.titles.normalized,
    title: t.titles.canonical,
    description: t.description,
    image: t.thumbnail ?? t.originalimage,
    type: t.coordinates ? "place" : "other",
    flavorText: await generateFlavorText(t.titles.normalized, t.extract),
    flavorTextSeed: t.extract
})).transform(async t => Object.assign(t, { classification: await generateClassification(t.description ?? t.flavorText) }));

export type Card = z.infer<typeof Card>;


async function generateFlavorText(title: string, seed: string): Promise<string> {
    let text: string | null;
    if (Math.random() > .5) {
        text = await generateText([
            "Generate a short, yet poetic, description of the subject of the text input under 240 characters."
        ], seed);
    } else {
        text = await generateText([
            "Generate a short quote that could have been said by the subject of the input."
        ], seed);

        if (text) {
            text = `${text} - ${title}`;
        }
    }
    return text ?? seed;
}

async function generateClassification(seed: string, desc?: string): Promise<string> {
    const text = await generateText([
        `Let NOUNS be the following comma-separated list of words: ${CARD_CLASSIFICATION_CATEGORIES.nouns.join(",")}`,
        `Let ADJECTIVES be the following comma-separated list of words: ${CARD_CLASSIFICATION_CATEGORIES.adjectives.join(",")}`,
        "Respond with a poetic description of the input constructed from one word chosen from the aforementioned ADJECTIVES list, followed by a single space, followed by one word chosen from the aforementioned NOUNS list.",
        "If no word can be found that accurately describes the input, choose the best word available from the aforementioned lists."
    ], seed);
    return text ?? CARD_CLASSIFICATION_DEFAULT_CATEGORY;
}

export async function createCard(title: string) {
    return await Card.parseAsync(await fetchSummary(title));
}

export async function createCardFromArticle(article: ArticleSummary) {
    return await Card.parseAsync(article);
}