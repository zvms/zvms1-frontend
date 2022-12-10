
import { createUniqueTypeName, tsCommentStr } from "./src/ts/utils";

export interface Type {
    desc?: Description;
    ts: (ctx: Context) => string;
    py: (ctx: Context) => string;
}

export type Description = string;

export interface Context {
    path:string;
    param?:string;
    addBefore: string[];
}

export type GenFunc = (params: any) => Type;

export function obj(...members: [name: string, type: Type, desc?: Description][]): Type {
    return {
        ts: (ctx) => `{
    ${members.map(m => `${tsCommentStr(ctx, m[2])}${m[0]}: ${m[1].ts(ctx)};`).join("\n")}
}`,
        py: (ctx) => {
            let type = createUniqueTypeName(ctx);
            ctx.addBefore.push(`${type} = typing.TypedDict("${type}",{
    ${members.map(m => `"${m[0]}": ${m[1].py(ctx)}`).join(",\n")}
})`);
            return type;
        },
    }
}
export function arr(type: Type, desc?: Description): Type {
    return {
        ts: (ctx) => `Array<${type.ts(ctx)}>`,
        py: (ctx) => `typing.Sequence[${type.py(ctx)}]`,
        desc
    }
}
export function str(desc?: Description): Type {
    return {
        ts: () => "string",
        py: () => "str",
        desc
    }
}
export function int(desc?: Description): Type {
    return {
        ts: () => "number",
        py: () => "int",
        desc
    }
}
export function float(desc?: Description): Type {
    return {
        ts: () => "number",
        py: () => "float",
        desc
    }
}
export function bool(desc?: Description): Type {
    return {
        ts: () => "boolean",
        py: () => "bool",
        desc
    }
}