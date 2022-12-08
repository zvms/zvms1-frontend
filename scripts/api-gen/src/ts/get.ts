import { Context, Method } from "../../types";
import { path2LCamal, req2paramsApply, tsReq2paramsDecl, tsResType, tsComments } from "./utils";



export function tsGet(ctx: Context, get?: Method) {
    const crtItemPath = ctx.path;
    if (get !== undefined) {
        const decl = tsReq2paramsDecl(ctx, get.req);
        return `
${ctx.addBefore.join("\n")}
/**
 * ## GET ${crtItemPath}
${tsComments(ctx, get)}
 */
function get${path2LCamal(crtItemPath)}(${decl}): ${tsResType(ctx, get.res)} {
\treturn get("${crtItemPath}",{
\t\t${req2paramsApply(get.req)}
\t});
}
`
    } else {
        return "";
    }
}