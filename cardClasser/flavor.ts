import { type Card } from "../cardBuilder";
import { nextInEnum } from "./util.ts";

export type TemplateClassFlavorData<T> = {
    type: string,
    content: string,
    context: T,
    lengthLevel: FlavorLengthLevel
}

export enum FlavorLengthLevel {
    SHORT = 100,
    MEDIUM = 240,
    LONG = 420
}

const FLAVOR_TEXT_TYPE_PADDING = 24;

export function buildClassFlavorData<T>(card: Card, context: T): TemplateClassFlavorData<T> {
    return {
        type: card.flavorTextType,
        content: card.flavorText,
        lengthLevel: nextInEnum(FlavorLengthLevel, card.flavorText.length + FLAVOR_TEXT_TYPE_PADDING),
        context
    };
}