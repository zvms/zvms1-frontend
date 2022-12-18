import { Path } from "../types";
import { pyViewsGet, pyImplsGet } from "./get";
import { pyViewsPost, pyImplsPost } from "./post";

export function pyViewsPath(path: Path) {
    let str = "";
    if (path.paths) {
        for (let itemName in path.paths) {
            let item = path.paths[itemName];
            let crtPath = path + itemName;
            str +=
                `${item.desc ? `'''
${item.desc}
'''`: ""}
${pyViewsGet(crtPath, item.get)} 
${pyViewsPost(crtPath, item.post)}
`
            str += pyViewsPath(item);
        }
    }
    return str;
}

export function pyImplsPath(path: Path) {
    let str = "";
    if (path.paths) {
        for (let itemName in path.paths) {
            let item = path.paths[itemName];
            let crtPath = path + itemName;
            str +=
                `${item.desc ? `'''
${item.desc}
'''`: ""}
${pyImplsGet(crtPath, item.get)} 
${pyImplsPost(crtPath, item.post)}
`
            str += pyImplsPath(item);
        }
    }
    return str;
}