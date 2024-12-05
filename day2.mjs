import { input } from "./d2input.mjs";

// const input = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`;

const reports = input.split("\n").map((x) => x.split(/ /).map(Number));

const reportIsSafe = (report, allowCorrection = false) => {
  const diffs = report.reduce(
    (arr, n, i) => (i === 0 ? [] : [...arr, n - report[i - 1]]),
    []
  );
  const isAllInc = diffs.every((x) => x > 0);
  const isAllDec = diffs.every((x) => x < 0);
  const isWithinRange = diffs.every(
    (x) => Math.abs(x) >= 1 && Math.abs(x) <= 3
  );
  if ((isAllDec || isAllInc) && isWithinRange) {
    return true;
  }
  if (allowCorrection === false) {
    return false;
  }
  // now allow for 1 correction
  const variations = report.reduce((arr, _, i) => {
    return [...arr, report.toSpliced(i, 1)];
  }, []);
  return variations.some((x) => reportIsSafe(x, false));
};

const p1 = reports
  .map((x) => reportIsSafe(x, false))
  .reduce((t, b) => (b ? t + 1 : t), 0);

console.log(p1);

const p2 = reports
  .map((x) => reportIsSafe(x, true))
  .reduce((t, b) => (b ? t + 1 : t), 0);

console.log(p2);
