import { Path } from "../types";
import { pyGet } from "./get";
import { pyPost } from "./post";

export function pyPath(path: Path) {
    let str = "";
    if (path.paths) {
        for (let itemName in path.paths) {
            let item = path.paths[itemName];
            let crtPath = path + itemName;
            str +=
                `${item.desc ? `'''
${item.desc}
'''`: ""}
${pyGet(crtPath, item.get)} 
${pyPost(crtPath, item.post)}
`
            str += pyPath(item);
        }
    }
    return str;
}