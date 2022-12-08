import { Context, Method } from "../../types";
import { path2LCamal, pyReq2paramsDecl, pyResType, pyComments, addBefore } from "./utils";

export function pyPost(ctx: Context, post?: Method) {
    const crtItemPath = ctx.path;
    if (post !== undefined) {
        const decl = pyReq2paramsDecl(ctx, post.req);
        const res = pyResType(ctx,post.res);
        return `
${addBefore(ctx)}
def post${path2LCamal(crtItemPath)}(${decl})\
 -> ${res} : '''
## POST ${crtItemPath}
${pyComments(ctx,post)}
'''`
    } else {
        return "";
    }
}