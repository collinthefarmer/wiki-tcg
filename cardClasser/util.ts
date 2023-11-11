export function nextInEnum<E extends Record<number, string>>(enum_: E, value: number): number {
    for (const v in enum_) {
        if (Number(v) > value) return Number(v);
    }
    return Number.MAX_SAFE_INTEGER;
}