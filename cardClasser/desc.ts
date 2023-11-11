import { type Card } from "../cardBuilder";

export type TemplateClassDescData = {
    content: string,
    length: DescLengthLevel
}

export enum DescLengthLevel {
    SHORT = 12,
    LONG = Number.MAX_SAFE_INTEGER
}

export function buildClassDescData(card: Card): TemplateClassDescData {
    return {
        content: card.description,
        length: card.description.length
    };
}

