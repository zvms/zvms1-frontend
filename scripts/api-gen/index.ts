import * as api from "./apis";
import { Api } from "./types";
import { mkdirSync, rmSync, writeFileSync } from "fs";
import { tsPath } from "./src/ts/path";
import { pyPath } from "./src/py/path";
import { format } from "prettier"

main();

function main() {
    mkdirSync("./gen", { recursive: true });
    rmSync("./gen", { recursive: true });
    mkdirSync("./gen", { recursive: false });
    mkdirSync("./gen/ts", { recursive: true });
    rmSync("./gen/ts", { recursive: true });
    mkdirSync("./gen/ts", { recursive: false });
    mkdirSync("./gen/py", { recursive: true });
    rmSync("./gen/py", { recursive: true });
    mkdirSync("./gen/py", { recursive: false });
    for (const partName in api) {
        const part = (api as Api)[partName];
        {
            let str = `
import{get, post} from "./utils.js";
`
            str += tsPath({ path: "/" + partName, addBefore: [] }, part);

            try {
                str = format(str, { parser: "typescript" });
            } catch (e: any) {
                console.error(e.message);
            }
            writeFileSync(`./gen/ts/${partName}.ts`, str);
            console.log(`[TS] [${partName}] generated -> ./gen/ts/${partName}.ts`);
        } {
            let str = `
import typing
`

            str += pyPath({ path: "/" + partName, addBefore: [] }, part);

            // try {
            //     str = format(str, { parser: "typescript" });
            // } catch (e: any) {
            //     console.error(e.message);
            // }
            writeFileSync(`./gen/py/${partName}.pyi`, str);
            console.log(`[PY] [${partName}] generated -> ./gen/py/${partName}.pyi`);
        }
    }
    writeFileSync(`./gen/ts/utils.d.ts`, `
declare function get<REQ, RES>(url: string, req: REQ): Promise<RES>;
declare function post<REQ, RES>(url: string, req: REQ): Promise<RES>;
`);
    writeFileSync(`./gen/ts/utils.js`, `
export async function get(url, req){
    throw new Error();
}
export async function post(url, req){
    throw new Error();
}
`);
}