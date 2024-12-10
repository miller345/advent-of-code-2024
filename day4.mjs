import fs from "fs";
const input = await fs.promises.readFile("d4.txt", "utf-8");

// const input = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`;

const grid = input.split("\n").map((x) => x.split(""));

const getCell = ({ x, y }) => {
  try {
    return grid[y][x];
  } catch (error) {
    return null;
  }
};

const translateCellCoords = ({ x, y }, dir, n = 1) => {
  if (dir === "N") return { x, y: y - n };
  if (dir === "NE") return { x: x + n, y: y - n };
  if (dir === "E") return { x: x + n, y };
  if (dir === "SE") return { x: x + n, y: y + n };
  if (dir === "S") return { x, y: y + n };
  if (dir === "SW") return { x: x - n, y: y + n };
  if (dir === "W") return { x: x - n, y };
  if (dir === "NW") return { x: x - n, y: y - n };
};

const lookInDirection = ({ x, y }, dir, n) => {
  return [...Array(n).keys()].reduce((str, i) => {
    const coords = translateCellCoords({ x, y }, dir, i);
    return str + getCell(coords) ?? "";
  }, "");
};

const lookAround = ({ x, y }, n) => {
  return ["N", "NE", "E", "SE", "S", "SW", "W", "NW"].map((dir) =>
    lookInDirection({ x, y }, dir, n)
  );
};

const search = ({ x, y }, word = "XMAS") => {
  return lookAround({ x, y }, word.length).reduce(
    (t, str) => (str === word ? t + 1 : t),
    0
  );
};

let p1 = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    p1 += search({ x, y });
  }
}

console.log({ p1 }); // 2414
