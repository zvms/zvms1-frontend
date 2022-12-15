import { Type } from "./types";

export type StructRaw = Record<string, Type>;

export type StructsRaw = Record<string, StructRaw>;

export type Structs<Raw> = Record<keyof Raw, Type>;

export function genStructs(raw: Structs<any>): {
    py: string,
    ts: string
} {
    let ts = "";
    let py = "";
    for (const name in raw) {
        const struct = raw[name];
        ts += struct.ts;
        py += struct.py;
    }
    return {
        ts,
        py
    }
}

export function createStructs<Raw extends StructsRaw>(raw: Raw): Structs<Raw> {
    let result: Structs<Raw> = {} as any;
    for (const name in raw) {
        const struct = raw[name];
        let ts = `export interface ${name}{\n`;
        let py = `${name} = TypedDict('${name}',{`;
        for (const key in struct) {
            const type = struct[key];
            ts += `\t${key}:${type.ts};\n`;
            py += `\t'${key}':${type.py},\n`;
        }
        ts += "}\n";
        py += "})\n";
        result[name] = {
            ts,
            py,

        }
    }
    return result;
}