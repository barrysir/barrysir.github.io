import { toTimesHundred, type numberTimesHundred } from "@components/NumberInteger";
import { assert } from "@components/utils";

//---------------------------
//  Utils
//---------------------------

function lerpTable(coords: [number, number][], x: number): number | null {
    // Find the two points that `x` lies between
    for (let i = 0; i < coords.length - 1; i++) {
      const [x1, y1] = coords[i];
      const [x2, y2] = coords[i + 1];
  
      if (x >= x1 && x <= x2) {
        // Perform linear interpolation
        const y = y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
        return y;
      }
    }
  
    // If no interpolation was possible (x out of bounds), return null
    return null;
}  

function findRegion<T>(arr: T[], val: number, key: (a: T) => number): number | null {
    function myInsert(element: number, array: T[]): number {
        if (array.length === 0)
            return 0;
    
        let start = 0;
        let end = array.length;
    
        while (true) {
            const pivot = (start + end) >> 1;  // should be faster than dividing by 2
            const c = element - key(array[pivot]);
            if (end - start <= 1) return c < 0 ? pivot : pivot+1;
            
            if (c < 0) {
                end = pivot;
            } else if (c > 0) {
                start = pivot;
            } else {
                return pivot+1;
            }
        }
    }

    let pivot = myInsert(val, arr);
    return (pivot != 0) ? pivot-1 : null;
}

function getRegion<T>(arr: T[], val: number, key: (a: T) => number): T | null {
    let i = findRegion(arr, val, key);
    if (i == null) {
        return null;
    }
    return arr[i];
}

//---------------------------
//  Rating Calculation
//---------------------------

export enum Grade {
    None =         0,
    S =      970_000,
    SS =     990_000,
    SSS =  1_000_000,
    SSSP = 1_007_500,
    MAX =  1_010_000,
};

let refreshTechnicalRankBonus: [number, number][] = [
    [Grade.SS, 0.1],
    [Grade.SSS, 0.2],
    [Grade.SSSP, 0.3],
];

let scoreBonus: [number, number][] = [
    [Grade.S, 0],
    [Grade.SS, 1],
    [Grade.SSS, 1.5],
    [Grade.SSSP, 2],
];

let refreshScoreBonus: [number, number][] = [
    [800000, -6],
    [900000, -4],
    [Grade.S, 0],
    [Grade.SS, 0.75],
    [Grade.SSS, 1.25],
    [Grade.SSSP, 1.75],
    [Grade.MAX, 2],
];

let platinumGrades = [
    [0.94, 1, 1],
    [0.95, 2, 2],
    [0.96, 3, 3],
    [0.97, 4, 4],
    [0.98, 5, 5],
    [0.99, 6, 5],
];

export enum ClearBadge {
    NONE = 0,
    FULL_COMBO = 1,
    ALL_BREAK = 2,
    ALL_BREAK_PLUS = 3,
}

const clearBadgeTable = new Map([
    [ClearBadge.NONE, 0],
    [ClearBadge.ALL_BREAK_PLUS, 0.35],
    [ClearBadge.ALL_BREAK, 0.3],
    [ClearBadge.FULL_COMBO, 0.1],
])

const fullBellBonus = 0.5;

export function computeRating(points: number, level: number): numberTimesHundred {
    let rating;
    if (points >= Grade.SSSP) {
        rating = 2;
    } else if (points >= Grade.S) {
        rating = lerpTable(scoreBonus, points);
        assert(rating !== null);
    } else {
        // -0.01 rating every 175 points
        rating = (points - Grade.S) / 175 * 0.01;
    }

    return Math.max(0, toTimesHundred(level) + Math.floor(rating * 100)) as numberTimesHundred;
}

export function computeRefreshRating(points: number, level: number, clear_badge: ClearBadge, full_bell: boolean): number {
    let pointBonus;
    if (points >= 800000) {
        // should not be null from the values the table is constructed with
        let t = lerpTable(refreshScoreBonus, points);
        assert(t !== null);
        pointBonus = level + t;
    } else if (points >= 500000) {
        pointBonus = (level - 6) * (points - 500000) / 300000;
    } else {
        pointBonus = 0;
    }

    let clearBadgeBonus = clearBadgeTable.get(clear_badge)!;
    let bellBonus = (full_bell) ? fullBellBonus : 0;
    let item = getRegion(refreshTechnicalRankBonus, points, ([grade, bonus]) => grade);
    let technicalRankBonus = (item !== null) ? item[1] : 0;
    
    return pointBonus + clearBadgeBonus + bellBonus + technicalRankBonus;
}

export function computeRefreshPlatinumRating(platScore: number, maxPlatScore: number, level: number): number {
    let platRatio = platScore / maxPlatScore;
    let item = getRegion(platinumGrades, platRatio, ([ratio, rank, bonus]) => ratio);
    let bonus = (item !== null) ? item[2] : 0;

    return bonus * level * level / 1000;
}