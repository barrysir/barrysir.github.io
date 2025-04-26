import type { Result } from "@components/utils";
import { Err, Ok } from "@components/utils";
import { computeRating } from "./ongeki";

export type ParsedScore = {
    level: number;
    score: number | null;
    allBreak: boolean;
    fullBell: boolean;
    multiplier: number | null;
}

export type Score = {
    level: number;
    score: number | null;
    allBreak: boolean;
    fullBell: boolean;
    rating: number;
}

export function parseScore(text: string): Result<ParsedScore | undefined, string> {
    // remove comment
    text = text.replace(/\/\/.*$/, '');
    // trim whitespace
    text = text.trim();
    // lowercase so "AB" and "ab" are read the same
    text = text.toLowerCase();

    if (text == "") {
        return Ok(undefined);
    }

    const multRegex = /\b(?:x(\d+)|(\d+)x)\b$/;
    const multMatch = text.match(multRegex);
    let multiplier = null;
    if (multMatch) {
        multiplier = parseInt(multMatch[1] || multMatch[2]);
        text = text.replace(multRegex, '').trim();
        if (multiplier == 0) {
            return Err("Cannot have a zero multiplier");
        }
    }

    const matches = text.match(/\d+(\.\d+)?/g);
    if (!matches || matches.length < 1) {
        return Err("Line contains no rating number");
    } else if (matches.length > 2) {
        return Err("Line contains too many numbers: possible parsing error");
    }
    const level = parseFloat(matches[0]);
    const score = (matches.length > 1) ? parseFloat(matches[1]) : null;

    let allBreak = (text.includes("ab"));
    let fullBell = (text.includes("fb"));

    if (score === 1010000) {    // all crit break => AB and FB lamps
        allBreak = true;
        fullBell = true;
    }

    return Ok({level, score, allBreak, fullBell, multiplier});
}

export function parseBestFrame(text: string, size: number): {scores: Score[], errors: {lineno: number, error: string}[]} {
    let scores: ParsedScore[] = [];
    let errors: {lineno: number, error: string}[] = [];
    text.split('\n').forEach((line, index) => {
        let r = parseScore(line);
        if (r.ok == false) {
            errors.push({lineno: index+1, error: r.error});
        } else {
            if (r.value !== undefined) {
                scores.push(r.value);
            }
        }
    });

    let scoresWithRating: Score[] = [];
    for (let s of scores) {
        let rating;
        if (s.score === null) {
            rating = s.level;
        } else {
            rating = computeRating(s.score, s.level);
        }

        let mult = (s.multiplier == null) ? 1 : s.multiplier;
        for (let i=0; i<mult; i++) {
            scoresWithRating.push({...s, rating});
        }
    }

    scoresWithRating.sort((a, b) => b.rating - a.rating);
    scoresWithRating.splice(size);

    return {
        scores: scoresWithRating,
        errors: errors,
    }
}
