import { Path } from "../types";
import { tsGet } from "./get";
import { tsPost } from "./post";

export function tsPath(path: Path) {
    let str = "";
    if (path.paths) {
        for (let itemName in path.paths) {
            let item = path.paths[itemName];
            let crtPath = path + itemName;
            str +=
                `${item.desc ? `/**
 * ${item.desc}
 */`: ""}
${tsGet(crtPath, item.get)} 
${tsPost(crtPath, item.post)}
`
            str += tsPath(item);
        }
    }
    return str;
}