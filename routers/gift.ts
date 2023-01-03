import {Router} from "express";

import {GiftRecord} from "../records/gift.record";
import {ValidationError} from "../utils/error";
import {CreateGiftReq, GetSingleGiftRes, GiftEntity} from "../types";

export const   giftRouter = Router();

giftRouter
    .get('/', async (req,res)=>{
        const giftsList = await GiftRecord.listAll()// over here we are taking all gifts from function created inside Class GiftRecord. Later we need to create layout in list.hbs
        res.json({
            giftsList,
        })
    })
    .get('/:giftId', async (req,res)=>{
        const gift = await GiftRecord.getOne(req.params.giftId)

    const givenCount = await gift.countGivenGifts()
        res.json({
            gift,
            givenCount,
        } as GetSingleGiftRes)
    })

    .delete('/:id',async(req,res) =>{
        const gift = await GiftRecord.getOne(req.params.id);

        if(!gift){
            throw new ValidationError('No such gift')
        }

        if( await gift.countGivenGifts() > 0){
            throw new ValidationError('Cannot remove given gift');
        }

        await gift.delete();

        res.end();
    })
    .post('/', async (req,res)=>{
        // req.body show us exactly that what we are sendin from page. For example we adding new presents to list and in moment when we click save everything what we add go to req.body like name and count

        const newGift = new GiftRecord(req.body as CreateGiftReq);
        await newGift.insert();

        res.json(newGift);

        //error shows on list.hbs. It replace place of GiftList and Add gift to list. Shows under the same link.
});

