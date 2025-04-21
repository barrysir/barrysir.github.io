import type { Result } from "@components/utils";
import { Err, Ok } from "@components/utils";
import { computeRating } from "./ongeki";

export type Score = {
    level: number;
    score: number | null;
    allBreak: boolean;
    fullBell: boolean;
}

export type ScoreWithRating = Score & {rating: number};

export function parseScore(text: string): Result<Score | undefined, string> {
    // remove comment
    text = text.replace(/\/\/.*$/, '');
    // trim whitespace
    text = text.trim();
    // lowercase so "AB" and "ab" are read the same
    text = text.toLowerCase();

    if (text == "") {
        return Ok(undefined);
    }

    const matches = text.match(/\d+(\.\d+)?/g);
    if (!matches || matches.length < 1) {
        return Ok(undefined);
        // return Err("Line contains no rating number");
    }
    const level = parseFloat(matches[0]);
    const score = (matches.length > 1) ? parseFloat(matches[1]) : null;

    let allBreak = (text.includes("ab"));
    let fullBell = (text.includes("fb"));

    if (score === 1010000) {    // all crit break => AB and FB lamps
        allBreak = true;
        fullBell = true;
    }

    return Ok({level, score, allBreak, fullBell});
}

export function parseBestFrame(text: string, size: number): ScoreWithRating[] {
    let raw = text.split('\n').map(parseScore);

    let scoresWithRating: ScoreWithRating[];
    {
        let scores: Score[] = [];
        let errors = [];
        for (let r of raw) {
            if (r.ok == false) {
                errors.push(r.error);
            } else {
                if (r.value !== undefined) {
                    scores.push(r.value);
                }
            }
        }

        if (errors.length > 0) {
            // report errors... idk
            return;
        }

        for (let s of scores as ScoreWithRating[]) {
            let rating;
            if (s.score === null) {
                rating = s.level;
            } else {
                rating = computeRating(s.score, s.level);
            }
            s.rating = rating;
        }
        scoresWithRating = scores as ScoreWithRating[];
    }

    scoresWithRating.sort((a, b) => b.rating - a.rating);
    scoresWithRating.splice(size);
    return scoresWithRating;
}
