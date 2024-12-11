import fs from "fs";
const input = await fs.promises.readFile("d5.txt", "utf-8");

const rules = input
  .matchAll(/(\d+)\|(\d+)/g)
  .reduce((arr, match) => [...arr, [Number(match[1]), Number(match[2])]], []);

const pages = input
  .matchAll(/^\d+(,\d+)*$/gm)
  .reduce((arr, match) => [...arr, match[0].split(",").map(Number)], []);

const sortIt = (pgs) => {
  return [...pgs].sort((a, b) => {
    const rls = rules.filter(
      (rl) => (rl[0] === a && rl[1] === b) || (rl[0] === b && rl[1] === a)
    );
    if (rls.length > 1) throw new Error("rls>1");
    if (!rls[0]) return 0;
    if (rls[0][0] === a) return -1;
    return 1;
  });
};

const arrEq = (a, b) => a.join(",") === b.join(",");
const arrMid = (a) => a[(a.length - 1) / 2];

const p1 = pages.reduce(
  (t, pgs) => (arrEq(pgs, sortIt(pgs)) ? t + arrMid(pgs) : t),
  0
);

console.log({ p1 }); // 5964

const p2 = pages.reduce((t, pgs) => {
  const sorted = sortIt(pgs);
  return arrEq(pgs, sorted) ? t : t + arrMid(sorted);
}, 0);

console.log({ p2 }); // 4719
