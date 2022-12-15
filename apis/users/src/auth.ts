import { userCatagories } from "./catagories";
import { AuthData } from "zvms-apis-users-gen";

const {
    none,
    student
} = userCatagories.raw;
const {
    except
} = userCatagories

export const auth: AuthData = {
    mePageOnNav: except(none),
    abc:[student]
}   
