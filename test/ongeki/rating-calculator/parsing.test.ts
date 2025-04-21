import { expect, test } from 'vitest';
import { parseScore } from '@components/ongeki/rating-calculator/parsing.ts';
import type { Result } from "@components/utils";
import { Err, Ok } from "@components/utils";

test('parseScore', () => {
  function runCase(t, o) {
    expect(parseScore(t)).toStrictEqual(Ok(o));  
  }
  function runCaseError(t) {
    expect(parseScore(t).ok).toBe(false);
  }

  // blank line
  runCase("", undefined);
  runCase("      ", undefined);
  runCase("  // aaa", undefined);

  // single number
  runCase("14.77", {level: 14.77, score: null, allBreak: false, fullBell: false});
  // integer
  runCase("14", {level: 14, score: null, allBreak: false, fullBell: false});

  // with whitespace
  runCase("   14.77    ", {level: 14.77, score: null, allBreak: false, fullBell: false});

  // rating + score
  runCase("14.77 1004311", {level: 14.77, score: 1004311, allBreak: false, fullBell: false});
  
  // AB, FB flags
  // basic AB FB
  runCase("15.25 1004311 AB", {level: 15.25, score: 1004311, allBreak: true, fullBell: false});
  runCase("15.25 1004311 FB", {level: 15.25, score: 1004311, allBreak: false, fullBell: true});
  // with + (should be ignored)
  runCase("15.25 1004311 +AB", {level: 15.25, score: 1004311, allBreak: true, fullBell: false});
  runCase("15.25 1004311 +ab", {level: 15.25, score: 1004311, allBreak: true, fullBell: false});
  // AB FB together
  runCase("15.25 1004311 ABFB", {level: 15.25, score: 1004311, allBreak: true, fullBell: true});
  runCase("15.25 1004311 +AB +FB", {level: 15.25, score: 1004311, allBreak: true, fullBell: true});
  // in different places within the string
  runCase("15.25 AB FB 1004311", {level: 15.25, score: 1004311, allBreak: true, fullBell: true});
  runCase("15.25 FB 1004311 AB", {level: 15.25, score: 1004311, allBreak: true, fullBell: true});

  // comments
  runCase("15.25 1004311 +AB +FB // comment ignored", {level: 15.25, score: 1004311, allBreak: true, fullBell: true});
  // AB, FB, score in comments should be ignored
  runCase("15.25 1004311 // AB comment FB ignored", {level: 15.25, score: 1004311, allBreak: false, fullBell: false});
  runCase("15.25 AB // 1004311", {level: 15.25, score: null, allBreak: true, fullBell: false});

  // negative numbers (negative sign should be ignored)
  runCase("-5.20", {level: 5.20, score: null, allBreak: false, fullBell: false});
  runCase("5.20 -999000", {level: 5.20, score: 999000, allBreak: false, fullBell: false});

  // all crit break should set AB and FB lamps automatically
  runCase("13.33 1010000", {level: 13.33, score: 1010000, allBreak: true, fullBell: true});

  // not enough numbers given should return error
  runCase("sldkfjlskdfjksdjf", undefined);
})

// test('parsePlatinumScore', () => {
//   runCase("14.10 0.99", {level: 13.33, score: 1010000, allBreak: true, fullBell: true});
//   runCase("14.10 0.86", {level: 13.33, score: 1010000, allBreak: true, fullBell: true});
//   runCase("14.10 2619 / 2910", {level: 13.33, score: 1010000, allBreak: true, fullBell: true});
// });