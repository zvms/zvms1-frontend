import * as fs from "node:fs";
import { resolve } from "node:path";

export function toRoot(path:string){
    return resolve("../../../../",path);
}

export function cpSync(source: string, destination: string){
    return fs.cpSync(toRoot(source),toRoot(destination));
}

export function mkdirSync(path: string){
    return fs.mkdirSync(toRoot(path));
}

export function writeFileSync(file: string, data: string){
    return fs.writeFileSync(toRoot(file),data);
}