import { Part } from "../types";
import { tsPath } from "./path";

const tsAddBeforeFile = `
import{get, post} from "./utils.js";
`;
const tsAddAfterFile = "";

export function genTs(part: Part): string {
    let str = tsAddBeforeFile;
    str += tsPath(part);
    str += tsAddAfterFile;
    str = str;
    return str;
}