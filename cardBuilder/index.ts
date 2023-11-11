import { CardSeed } from "../article";

import { fetchFlavor, type FlavorConfiguration, type FlavorPayload } from "./flavor.ts";
import { type CountPayload, fetchCount } from "./count.ts";
import { type ClassificationConfiguration, type ClassificationPayload, fetchClassification } from "./classification.ts";

export type Card<T = unknown> = CardSeed & FlavorPayload<T> & CountPayload & ClassificationPayload;

export type CardGenerationConfiguration = {
    classification: ClassificationConfiguration,
    flavor: FlavorConfiguration
}

export async function buildCardFromSeed(seed: CardSeed, configuration: CardGenerationConfiguration): Promise<Card> {
    const [
        flavor,
        classification,
        count
    ] = await Promise.all([
        fetchFlavor(seed, configuration.flavor),
        fetchClassification(seed, configuration.classification),
        fetchCount(seed)
    ]);
    return Object.assign(seed, flavor, classification, count);
}