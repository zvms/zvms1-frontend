export * from "./types"
export { genPy } from "./py/gen";
export { genTs } from "./ts/gen";

// import { Apis } from "./types";
// import { mkdirSync, rmSync, writeFileSync } from "fs";
// import { tsPath } from "./ts/path";
// import { pyPath } from "./py/path";
// import { format } from "prettier"

// main();

// function main() {
//     mkdirSync("./gen", { recursive: true });
//     rmSync("./gen", { recursive: true });
//     mkdirSync("./gen", { recursive: false });
//     mkdirSync("./gen/ts", { recursive: true });
//     rmSync("./gen/ts", { recursive: true });
//     mkdirSync("./gen/ts", { recursive: false });
//     mkdirSync("./gen/py", { recursive: true });
//     rmSync("./gen/py", { recursive: true });
//     mkdirSync("./gen/py", { recursive: false });
// }
