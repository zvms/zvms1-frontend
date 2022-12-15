import { int, str, createStructs } from "zvms-apis-types-gen";

export const structs = createStructs({
    Notice: {
        content: str(),
        announcer: str(),
        time: str(),
        id: int()
    }
});