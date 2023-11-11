import { type Card } from "../cardBuilder";

export type TemplateClassImageData = {
    src: string,
    // like CSS does it
    aspectRatio: number,
};

export function buildClassImageData(card: Card & { imageSource: string, imageHeight: number, imageWidth: number }): TemplateClassImageData {
    return {
        src: card.imageSource,
        aspectRatio: card.imageWidth / card.imageHeight
    };
}