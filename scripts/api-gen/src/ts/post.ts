import { Context, Method } from "../../types";
import { path2LCamal, req2paramsApply, tsReq2paramsDecl, tsResType, tsComments, addBefore } from "./utils";

export function tsPost(ctx: Context, post?: Method) {
    const crtItemPath = ctx.path;
    if (post !== undefined) {
        const decl = tsReq2paramsDecl(ctx, post.req);
        return `
${addBefore(ctx)}
/**
 * ## POST ${crtItemPath}
 ${tsComments(ctx, post)}
 */
function post${path2LCamal(crtItemPath)}(${decl}): ${tsResType(ctx, post.res)} {
\treturn post("${crtItemPath}",{
\t\t${req2paramsApply(post.req)}
\t});
}
`
    } else {
        return "";
    }
}