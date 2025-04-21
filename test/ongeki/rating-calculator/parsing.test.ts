import { expect, test } from 'vitest';
import { parseScore } from '@components/ongeki/rating-calculator/parsing.ts';
import type { Result } from "@components/utils";
import { Err, Ok } from "@components/utils";

test('parseScore', () => {
  function runCase(t, o) {
    expect.soft(parseScore(t)).toStrictEqual(Ok(o));  
  }
  function runCaseError(t, msg?: string) {
    if (msg === undefined) {
      expect.soft(parseScore(t).ok).toBe(false); 
    } else {
      expect.soft(parseScore(t)).toStrictEqual({ok: false, error: msg});
    }
  }

  const ZERO_MULTIPLIER = "Cannot have a zero multiplier";
  const MULTIPLE_NUMBERS = "Line contains too many numbers: possible parsing error";

  // blank line
  runCase("", undefined);
  runCase("      ", undefined);
  runCase("  // aaa", undefined);

  // single number
  runCase("14.77", {level: 14.77, score: null, allBreak: false, fullBell: false, multiplier: null});
  // integer
  runCase("14", {level: 14, score: null, allBreak: false, fullBell: false, multiplier: null});

  // with whitespace
  runCase("   14.77    ", {level: 14.77, score: null, allBreak: false, fullBell: false, multiplier: null});

  // rating + score
  runCase("14.77 1004311", {level: 14.77, score: 1004311, allBreak: false, fullBell: false, multiplier: null});
  
  // AB, FB flags
  // basic AB FB
  runCase("15.25 1004311 AB", {level: 15.25, score: 1004311, allBreak: true, fullBell: false, multiplier: null});
  runCase("15.25 1004311 FB", {level: 15.25, score: 1004311, allBreak: false, fullBell: true, multiplier: null});
  // with + (should be ignored)
  runCase("15.25 1004311 +AB", {level: 15.25, score: 1004311, allBreak: true, fullBell: false, multiplier: null});
  // lowercase ab / fb
  runCase("15.25 1004311 +ab", {level: 15.25, score: 1004311, allBreak: true, fullBell: false, multiplier: null});
  runCase("15.25 1004311 +fb", {level: 15.25, score: 1004311, allBreak: false, fullBell: true, multiplier: null});
  // AB FB together
  runCase("15.25 1004311 ABFB", {level: 15.25, score: 1004311, allBreak: true, fullBell: true, multiplier: null});
  runCase("15.25 1004311 +AB +FB", {level: 15.25, score: 1004311, allBreak: true, fullBell: true, multiplier: null});
  // in different places within the string
  runCase("15.25 AB FB 1004311", {level: 15.25, score: 1004311, allBreak: true, fullBell: true, multiplier: null});
  runCase("15.25 FB 1004311 AB", {level: 15.25, score: 1004311, allBreak: true, fullBell: true, multiplier: null});

  // comments
  runCase("15.25 1004311 +AB +FB // comment ignored", {level: 15.25, score: 1004311, allBreak: true, fullBell: true, multiplier: null});
  // AB, FB, score in comments should be ignored
  runCase("15.25 1004311 // AB comment FB ignored", {level: 15.25, score: 1004311, allBreak: false, fullBell: false, multiplier: null});
  runCase("15.25 AB // 1004311", {level: 15.25, score: null, allBreak: true, fullBell: false, multiplier: null});

  // negative numbers (negative sign should be ignored)
  runCase("-5.20", {level: 5.20, score: null, allBreak: false, fullBell: false, multiplier: null});
  runCase("5.20 -999000", {level: 5.20, score: 999000, allBreak: false, fullBell: false, multiplier: null});

  // all crit break should set AB and FB lamps automatically
  runCase("13.33 1010000", {level: 13.33, score: 1010000, allBreak: true, fullBell: true, multiplier: null});

  // multiplier
  runCase("13.4 1006814 FB x5 // asdf", {level: 13.4, score: 1006814, allBreak: false, fullBell: true, multiplier: 5});
  // x5 squished into other word, confusing syntax so throwing error
  runCaseError("13.4 1006814 FBx5", MULTIPLE_NUMBERS);
  // multiplier in middle of string -- not detected, should raise error
  runCaseError("13.4 x5 1006814 FB // asdf", MULTIPLE_NUMBERS);
  runCaseError("x5 13.4 1006814 FB // asdf", MULTIPLE_NUMBERS);
  // multiple multipliers
  runCaseError("13.4 1006814 FB x5 x4 // asdf", MULTIPLE_NUMBERS);   // should return multiple numbers error
  runCaseError("x5 13.4 1006814 FB x4 // asdf", MULTIPLE_NUMBERS);
  runCaseError("x5 13.4 x4 1006814 FB // asdf", MULTIPLE_NUMBERS);
  // zero multiplier, negative multiplier
  runCaseError("13.4 1006814 FB x0", ZERO_MULTIPLIER);
  runCaseError("13.4 1006814 FB x-3", MULTIPLE_NUMBERS);
  // x4 or 4x
  runCase("13.4 1006814 FB 5x", {level: 13.4, score: 1006814, allBreak: false, fullBell: true, multiplier: 5});

  // not enough numbers given should return error
  runCaseError("sldkfjlskdfjksdjf");
  // too many numbers should return error
  runCaseError("13.4 500000 55", MULTIPLE_NUMBERS);
  runCaseError("13.4 5x 500000", MULTIPLE_NUMBERS);
})

// test('parsePlatinumScore', () => {
//   runCase("14.10 0.99", {level: 13.33, score: 1010000, allBreak: true, fullBell: true});
//   runCase("14.10 0.86", {level: 13.33, score: 1010000, allBreak: true, fullBell: true});
//   runCase("14.10 2619 / 2910", {level: 13.33, score: 1010000, allBreak: true, fullBell: true});
// });