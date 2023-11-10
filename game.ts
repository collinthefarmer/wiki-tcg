import { Database } from "bun:sqlite";
import { Card, createCard, createCardFromArticle } from "./card.ts";
import { fetchRandomSummary } from "./wiki.ts";
import { z } from "zod";

const db = new Database("db.sqlite");
db.run(`
    CREATE TABLE IF NOT EXISTS cards
    (
        display_title
            TEXT,
        title
            TEXT
            PRIMARY
                KEY,
        description
            TEXT,
        image_source
            TEXT,
        image_width
            NUMERIC,
        image_height
            NUMERIC,
        type
            TEXT,
        flavorText
            TEXT,
        flavorTextSeed
            TEXT,
        classification
            TEXT
    )
`);

const GameCard = z.object({
    display_title: z.string(),
    title: z.string(),
    description: z.string(),
    image_source: z.string().optional(),
    image_width: z.number().optional(),
    image_height: z.number().optional(),
    type: z.string(),
    flavorText: z.string(),
    flavorTextSeed: z.string(),
    classification: z.string()
});
export type GameCard = z.infer<typeof GameCard>;

function selectCard(title: string): GameCard | undefined {
    return db.query("SELECT * FROM cards WHERE title = ?1").get(title) as GameCard | undefined;
}

function selectRandomCard(): GameCard | undefined {
    return db.query("SELECT * FROM cards ORDER BY RANDOM() LIMIT 1").get() as GameCard | undefined;
}

function insertCard(card: Card): void {
    db.prepare("INSERT INTO cards VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)").run(
        card.displayTitle,
        card.title,
        card.description ?? null,
        card.image?.source ?? null,
        card.image?.width ?? null,
        card.image?.height ?? null,
        card.type,
        card.flavorText,
        card.flavorTextSeed,
        card.classification
    );
}

export async function fetchCard(title: string) {
    let card: GameCard | undefined = selectCard(title);
    if (card) return card;

    const created = await createCard(title);
    insertCard(created);

    return GameCard.parse({
        display_title: created.displayTitle,
        title: created.title,
        description: created.description,
        image_source: created.image?.source,
        image_width: created.image?.width,
        image_height: created.image?.height,
        type: created.type,
        flavorText: created.flavorText,
        flavorTextSeed: created.flavorTextSeed,
        classification: created.classification
    });
}

export async function fetchRandomCard() {
    const article = await fetchRandomSummary();
    return fetchCard(article.titles.canonical);
}

export async function fetchBoosterPack(allowNew: boolean = true) {
    return await Promise.all(Array(10).fill(null).map(_ => allowNew ? fetchRandomCard() : selectRandomCard()));
}