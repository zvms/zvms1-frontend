import { Context, Path } from "../../types";
import { pyGet } from "./get";
import { pyPost } from "./post";

export function pyPath(ctx: Context, path: Path) {
    let str = "";
    if (path.paths) {
        for (let itemName in path.paths) {
            let item = path.paths[itemName];
            let ctx2 = { path: ctx.path + itemName, addBefore: [] };
            str +=
                `${item.desc?`'''
${item.desc}
'''`:""}
${pyGet(ctx2, item.get)} 
${pyPost(ctx2, item.post)}
`
            str += pyPath(ctx2, item);
        }
    }
    return str;
}