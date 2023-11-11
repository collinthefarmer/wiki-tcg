import { type Card } from "../cardBuilder";
import { nextInEnum } from "./util.ts";

export type TemplateClassPowerData = {
    power: number,
    level: PowerLevel,
    levelColor: string
};

export enum PowerLevel {
    WEAK = 100,
    MEDIUM = 240,
    STRONG = 420,
    OVER_9000 = Number.MAX_SAFE_INTEGER
}

export function buildClassPowerData(card: Card): TemplateClassPowerData {
    return {
        power: card.power,
        level: nextInEnum(PowerLevel, card.power),
        levelColor: selectCardPowerColor(card.power)
    };
}

function selectCardPowerColor(power: number): string {
    return "#ffffff";
}

