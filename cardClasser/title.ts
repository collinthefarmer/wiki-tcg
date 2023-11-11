import { type Card } from "../cardBuilder";
import { nextInEnum } from "./util.ts";

export type TemplateClassTitleData = {
    content: string,
    lengthLevel: TitleLengthLevel
}

export enum TitleLengthLevel {
    SINGLETON = 1,
    VERY_SHORT = 6,
    MEDIUM = 12,
    LONGER = 20,
    LONGEST = 32
}

export function buildClassTitleData(card: Card): TemplateClassTitleData {
    return {
        content: card.titleNormalized,
        lengthLevel: nextInEnum(TitleLengthLevel, card.titleNormalized.length)
    };
}

