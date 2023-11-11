import { CardSeed } from "../article";

export type CountPayload = {
    viewCount: number,
    editCount: number,
    power: number,
    powerVersion: number
};

export async function fetchCount(base: CardSeed): Promise<CountPayload> {
    const [viewCount, editCount] = await Promise.all([fetchViewCount(base), fetchEditCount(base)]);
    return {
        viewCount,
        editCount,
        power: calculatePowerLevel(viewCount, editCount),
        powerVersion: 1
    };
}

function fetchViewCount(base: CardSeed): number {
    return 0; // TODO
}

function fetchEditCount(base: CardSeed): number {
    return 0; // TODO
}

function calculatePowerLevel(viewCount: number, editCount: number): number {
    return 0; // TODO
}