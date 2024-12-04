import { input } from "./d1input.mjs";

// const input = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3`;

const lists = input
  .split("\n")
  .map((x) => x.split(/   /))
  .reduce(
    ([left, right], [l, r]) => [
      [...left, Number(l)],
      [...right, Number(r)],
    ],
    [[], []]
  );

console.log(lists);

const left = [...lists[0]].sort();
const right = [...lists[1]].sort();

console.log({ left, right });

const p1 = left.reduce((result, l, i) => {
  const r = right[i];
  const diff = Math.abs(l - r);
  return result + diff;
}, 0);

console.log(p1);

const rFeq = right.reduce((obj, r) => ({ ...obj, [r]: (obj[r] ?? 0) + 1 }), {});

console.log(rFeq);

const p2 = left.reduce((t, l) => {
  return t + l * (rFeq[l] ?? 0);
}, 0);

console.log(p2);
