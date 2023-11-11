import { type Card } from "../cardBuilder";


export type TemplateClassRefData = {
    url: string,
}

export function buildClassRefData(card: Card): TemplateClassRefData {
    return {
        url: buildCardUrl(card.titleCanonical)
    };
}

function buildCardUrl(titleCanonical: string): string {
    return `https://en.wikipedia.org/wiki/${titleCanonical}`;
}