import { CardSeed } from "../article";
import { generateText } from "./openai.ts";
import { CountPayload } from "./count.ts";


export type ClassificationPayload = {
    classificationNoun: string,
    classificationAdjective: string,
    classificationKey: string
};

export type ClassificationConfiguration = { nouns: string[], adjectives: string[] };

export async function fetchClassification(base: CardSeed, count: CountPayload, configuration: ClassificationConfiguration): Promise<ClassificationPayload> {
    const [
        noun,
        adjective
    ] = await Promise.all([
        generateClassificationChoice(base, configuration.nouns),
        generateClassificationChoice(base, configuration.adjectives)
    ]);

    return {
        classificationNoun: noun,
        classificationAdjective: adjective,
        classificationKey: `${noun}:${adjective}`
    };
}

async function generateClassificationChoice(base: CardSeed, choices: string[]): Promise<string> {
    return generateText([
        `Let $CHOICES ${choices.join()} be a comma-separated list of words.`,
        `Reply with a single word from $CHOICES which best reflects the personality, description, or appearance of the subject of the text input.`
    ], base.extract);
}