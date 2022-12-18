import { Part, ImplFiles } from "../types";
import { pyViewsPath, pyImplsPath } from "./path";

const pyViewsAddBeforeFile = `
import typing
`;
const pyViewsAddAfterFile = "";

export function genViewsPy(part: Part): string {
    let str = pyViewsAddBeforeFile;
    str += pyViewsPath(part);
    str += pyViewsAddAfterFile;
    return str;
}

const pyImplsAddBeforeFile = `
import typing
`;
const pyImplsAddAfterFile = "";

export function genImplsPy(part: Part,implFiles:ImplFiles): string {
    let str = pyImplsAddBeforeFile;
    str += pyImplsPath(part);
    str += pyImplsAddAfterFile;
    return str;
}