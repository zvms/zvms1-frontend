import { Context, Method, Params } from "../../types";
import { cfg2str, paramName } from "../commonUtils";

export * from "../commonUtils";

export function tsReq2paramsDecl(ctx: Context, req?: Params): string {
    if (!req) return "";
    let ks: string[] = [];
    for (const k in req) {
        let ctx2 = { ...ctx, param: paramName(k) }
        ks.push(paramName(k) + ": " + req[k].ts(ctx2));
    }
    return ks.join(",\n");
}

export function tsReq2paramsDesc(ctx: Context, req?: Params): string[] {
    if (!req) return [];
    let descs: string[] = [];
    for (const k in req) {
        descs.push(` * @param ${paramName(k)} ${req[k].desc || ""}`)
    }
    return descs;
}

export function tsResType(ctx: Context, res?: Params) {
    if (!res) return "undefined";
    let members = "";
    for (const k in res) {
        members += `${tsCommentStr(ctx, res[k].desc)}${paramName(k)}: ${res[k].ts(ctx)}\n`;
    }
    return "Promise<{\n" + members + "}>";
}

export function tsComments(ctx: Context, m: Method) {
    return `${tsAddStar(ctx, m.desc)}${tsAddStar(ctx, cfg2str(m.cfg))}${tsReq2paramsDesc(ctx, m.req).join("\n")}`
}

export function tsAddStar(ctx: Context, str: string | undefined) {
    return str ? " * " + str + "\n" : "";
}

export function tsCommentStr(ctx: Context, comment?: string) {
    return comment ?
        `/** ${comment} */` :
        "";
}