import { UserCatagoryList } from "./catagories";

export type AuthData = {
    [k: string]: UserCatagoryList;
}

export function authGenTs(data: AuthData) {
    let str = `export const auth = {\n`;
    for (const name in data) {
        str += `\t${str}: ${data[name].reduce((p, c) => p & c.id, 0)},\n`
    }
    str += `}`;
    return str;
}