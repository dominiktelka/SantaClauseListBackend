import {GiftEntity} from "./gift.entity";

export type CreateGiftReq = Omit<GiftEntity, 'id'>
//omit will take GiftEntity and remove id

export interface GetSingleGiftRes {
    gift: GiftEntity;
    givenCount: number;
}
