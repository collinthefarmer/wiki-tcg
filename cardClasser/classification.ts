import { type Card } from "../cardBuilder";

export type TemplateClassClassificationData = {
    noun: string,
    adjective: string,
    length: number,
    key: string
};

export function buildClassClassificationData(card: Card): TemplateClassClassificationData {
    return {
        adjective: card.classificationAdjective,
        noun: card.classificationNoun,
        key: card.classificationKey,
        length: `${card.classificationNoun}${card.classificationAdjective}`.length
    };
}