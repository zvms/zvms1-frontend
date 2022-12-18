import { genImplsPy, genViewsPy } from "./py/gen";
import { genTs } from "./ts/gen";
import { ImplFiles, Apis } from "./types";

export * from "./types"
export * from "./rawCodes"
export { genViewsPy, genImplsPy } from "./py/gen";
export { genTs } from "./ts/gen";

export type PathsGenerated = { name: string, fApi: string, views: string, impls: string }[];
export function pathsGen(apis: Apis, implFiles: ImplFiles): PathsGenerated {
    const result: PathsGenerated = [];
    for (const partName in apis) {
        const part = (apis)[partName];
        result.push({
            name: partName,
            fApi: genTs(part),
            views: genViewsPy(part),
            impls: genImplsPy(part, implFiles)
        })
    }
    return result;
}