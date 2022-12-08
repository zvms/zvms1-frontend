import { Context, Method } from "../../types";
import { path2LCamal, pyReq2paramsDecl, pyResType, pyComments, addBefore } from "./utils";



export function pyGet(ctx: Context, get?: Method) {
    const crtItemPath = ctx.path;
    if (get !== undefined) {
        const decl = pyReq2paramsDecl(ctx, get.req);
        const res = pyResType(ctx,get.res);
        return `
${addBefore(ctx)}
def get${path2LCamal(crtItemPath)}(${decl})\
 -> ${res} : '''
## GET ${crtItemPath}
${pyComments(ctx, get)}
'''`
    } else {
        return "";
    }
}