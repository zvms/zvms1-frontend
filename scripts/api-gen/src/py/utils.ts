import { Context, Method, Params } from "../../types";
import { cfg2str, createUniqueTypeName, paramName } from "../commonUtils";

export * from "../commonUtils";

export function pyReq2paramsDecl(ctx: Context, req?: Params): string {
    if (!req) return "";
    let ks: string[] = [];
    for (const k in req) {
        let ctx2 = { ...ctx, param: paramName(k) }
        ks.push(paramName(k) + ": " + req[k].py(ctx2));
    }
    return ks.join(",\n");
}

export function pyReq2paramsDesc(ctx: Context, req?: Params): string[] {
    if (!req) return [];
    // let descs: string[] = [];
    // for (const k in req) {
    //     descs.push(` * @param ${paramName(k)} ${req[k].desc || ""}`)
    // }
    // return descs;
    return [];
}

export function pyResType(ctx: Context, res?: Params) {
    if (!res) return "None";
    let type = createUniqueTypeName(ctx);
    let members: string[] = [];
    for (const k in res) {
        members.push(`"${paramName(k)}": ${res[k].py(ctx)}`);
    }
    ctx.addBefore.push(`${type} = typing.TypedDict("${type}",{
        ${members.join(",\n")}
    })`)
    return type;
}

export function pyComments(ctx: Context, m: Method) {
    return `${pyAddSharp(ctx, m.desc)}${pyAddSharp(ctx, cfg2str(m.cfg))}${pyReq2paramsDesc(ctx, m.req).join("\n")}`
}

export function pyAddSharp(ctx: Context, str: string | undefined) {
    return str ? "# " + str + "\n" : "";
}

export function pyCommentStr(ctx: Context, comment?: string) {
    return comment ?
        `# ${comment}\n` :
        "\n";
}