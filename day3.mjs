import fs from "fs";
const input = await fs.promises.readFile("d3.txt", "utf-8");

// const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
// const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const partOne = (str) => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const matches = str.matchAll(regex);
  return matches.reduce((t, match) => t + match[1] * match[2], 0);
};

const p1 = partOne(input);
console.log(p1); // 182619815

const regex2 = /(don't\(\))|(do\(\))/;

const segments = input.split(regex2).filter((x) => x !== undefined);

let filtered = "";
let doOrDont = true;
for (const segment of segments) {
  if (segment === "do()") {
    doOrDont = true;
  } else if (segment === "don't()") {
    doOrDont = false;
  } else if (doOrDont) {
    // do it
    filtered = filtered + segment;
  } else {
    // don't
  }
}

const p2 = partOne(filtered);
console.log(p2); // 80747545
