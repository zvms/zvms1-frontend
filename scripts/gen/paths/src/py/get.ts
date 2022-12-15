import { Method } from "../types";
import { path2LCamal, pyReq2paramsDecl, pyResType, pyComments } from "./utils";

export function pyGet(path: string, get?: Method) {
    const crtItemPath = path;
    if (get !== undefined) {
        const decl = pyReq2paramsDecl(get.req);
        const res = pyResType(path2LCamal(crtItemPath), get.res);
        return `
${res.decl}
def get${path2LCamal(crtItemPath)}(${decl})\
 -> ${res.name} : '''
## GET ${crtItemPath}
${pyComments(get)}
'''`
    } else {
        return "";
    }
}