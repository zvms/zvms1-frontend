import { Context, Path } from "../../types";
import { tsGet } from "./get";
import { tsPost } from "./post";

export function tsPath(ctx: Context, path: Path) {
    let str = "";
    if (path.paths) {
        for (let itemName in path.paths) {
            let item = path.paths[itemName];
            let ctx2 = { path: ctx.path + itemName, addBefore: [] };
            str +=
                `${item.desc ? `/**
 * ${item.desc}
 */`: ""}
${tsGet(ctx2, item.get)} 
${tsPost(ctx2, item.post)}
`
            str += tsPath(ctx2, item);
        }
    }
    return str;
}