import { generateText } from "./openai.ts";
import { CardSeed } from "../article";

const flavorTypePromptMap: Record<string, string[]> = {
    "poeticDescription": ["Generate a short, yet poetic, description of the subject of the text input under 240 characters."]
};

export type FlavorPayload<T> = {
    flavorText: string,
    flavorTextType: string,
    flavorContext: T
};

export type FlavorConfiguration = {
    forcedTextType?: string;
}

export async function fetchFlavor<T>(base: CardSeed, configuration: FlavorConfiguration): Promise<FlavorPayload<T>> {
    const type = configuration.forcedTextType ?? await determineFlavorTextType(base);
    const [flavorText, flavorContext] = await Promise.all([
        await generateFlavorText(type, base),
        await generateFlavorTextContext<T>(type, base)
    ]);
    return {
        flavorText,
        flavorTextType: type,
        flavorContext
    };
}

async function determineFlavorTextType(base: CardSeed): Promise<string> {
    // should use random choice or some other means to determine type
    return "poeticDescription";
}

async function generateFlavorText(type: string, base: CardSeed): Promise<string> {
    return generateText(flavorTypePromptMap[type], base.extract);
}

async function generateFlavorTextContext<T>(type: string, base: CardSeed): Promise<T> {
    return {} as T;
}