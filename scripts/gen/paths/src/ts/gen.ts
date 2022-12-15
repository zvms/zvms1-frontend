import { format } from "prettier";
import { Apis } from "../types";
import { tsPath } from "./path";

const tsAddBeforeFile = `
import{get, post} from "./utils.js";
`;
const tsAddAfterFile = "";

export function genTs(data: Apis): Record<keyof typeof data, string> {
    let result: Record<keyof typeof data, string> = {};
    for (const partName in data) {
        const part = (data as Apis)[partName];

        let str = tsAddBeforeFile;
        str += tsPath(part);
        str += tsAddAfterFile;
        str = format(str, { parser: "typescript" });

        result[partName] = str;
    }
    return result;
}