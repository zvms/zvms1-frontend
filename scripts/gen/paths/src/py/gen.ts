import { Apis } from "../types";
import { pyPath } from "./path";

const pyAddBeforeFile = `
import typing
`;
const pyAddAfterFile = "";

export function genPy(data: Apis): Record<keyof typeof data, string> {
    let result: Record<keyof typeof data, string> = {};
    for (const partName in data) {
        const part = (data as Apis)[partName];

        let str = pyAddBeforeFile;
        str += pyPath(part);
        str += pyAddAfterFile;
        // try {
        //     str = format(str, { parser: "typescript" });
        // } catch (e: any) {
        //     console.error(e.message);
        // }
        //---//writeFileSync(`./gen/py/${partName}.pyi`, str);
        //---//console.log(`[PY] [${partName}] generated -> ./gen/py/${partName}.pyi`);
        result[partName] = str;
    }
    return result;
}