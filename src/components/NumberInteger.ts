
type Distinct<T, DistinctName> = T & { __TYPE__: DistinctName };

export type numberTimesHundred = Distinct<number, "numberTimesHundred">;
export type numberTimesThousand = Distinct<number, "numberTimesThousand">;

export type numberInteger = numberTimesHundred | numberTimesThousand;

export function toTimesHundred(n: number): numberTimesHundred {
    return Math.round(n * 100) as numberTimesHundred;
}

export function fromTimesHundred(n: numberTimesHundred): number {
    return n / 100;
}

export function toTimesThousand(n: number): numberTimesThousand {
    return Math.round(n * 1000) as numberTimesThousand;
}

export function fromTimesThousand(n: numberTimesThousand): number {
    return n / 1000;
}

export function numberFloorDivide<T extends numberInteger>(n: T, d: number): T {
    return Math.floor(n / d) as T;
}