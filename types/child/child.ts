import {ChildEntity} from "./child.entity";
import {GiftEntity} from "../gift";

export interface ListChildrenRes {
    childrenList: ChildEntity[];
    giftList: GiftEntity[];
}