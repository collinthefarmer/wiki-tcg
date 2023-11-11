// takes in card, determines cardClass
// cardClass encompasses the computed attributes which might affect template generation
// as determined by aspects of the underlying article
import { Card } from "../cardBuilder";

import { buildClassClassificationData, type TemplateClassClassificationData } from "./classification.ts";
import { buildClassFlavorData, type TemplateClassFlavorData, FlavorLengthLevel } from "./flavor.ts";
import { buildClassImageData, type TemplateClassImageData } from "./image.ts";
import { buildClassTitleData, type TemplateClassTitleData, TitleLengthLevel } from "./title.ts";
import { buildClassPowerData, type TemplateClassPowerData, PowerLevel } from "./power.ts";
import { buildClassRefData, type TemplateClassRefData } from "./ref.ts";
import { buildClassDescData, type TemplateClassDescData, DescLengthLevel } from "./desc.ts";

export { FlavorLengthLevel };
export { TitleLengthLevel };
export { PowerLevel };
export { DescLengthLevel };

export type CardTemplateClass<T = undefined> = {
    classification: TemplateClassClassificationData,
    flavorText: TemplateClassFlavorData<T>,
    image?: TemplateClassImageData,
    title: TemplateClassTitleData,
    power: TemplateClassPowerData,
    ref: TemplateClassRefData,
    desc: TemplateClassDescData,
}


export function classCard<T>(card: Card, flavorContext: T): CardTemplateClass<T> {
    return {
        classification: buildClassClassificationData(card),
        flavorText: buildClassFlavorData<T>(card, flavorContext),
        image: "imageSource" in card ? buildClassImageData(card as any) : undefined,
        title: buildClassTitleData(card),
        power: buildClassPowerData(card),
        ref: buildClassRefData(card),
        desc: buildClassDescData(card)
    };
}