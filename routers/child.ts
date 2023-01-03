import {Router} from "express";
import {ChildRecord} from "../records/child.record";
import {GiftRecord} from "../records/gift.record";
import {ValidationError} from "../utils/error";
import {ListChildrenRes} from "../types/child/child";


export const childRouter = Router();

childRouter
    .get('/', async (req,res)=>{
        const childrenList = await ChildRecord.listAll()  // over here we are taking all kids from function created inside Class ChildRecord. Later we need to create layout in list.hbs
        const giftsList = await GiftRecord.listAll();
        res.json({
            childrenList,
            giftsList,
        } as unknown as ListChildrenRes);
    })
    .post('/', async (req,res)=>{
        const newChild = new ChildRecord(req.body); // over here we are taking data like name from our website
        await newChild.insert();

        res.redirect('/child');
    })
    .patch('/gift/:childId', async (req,res)=>{
    const child = await ChildRecord.getOne(req.params.childId)
        if(child === null){
            throw new ValidationError('Nie znaleziono dziecka z podanym ID')
        }

        const gift = req.body.giftid === '' ? null : await GiftRecord.getOne(req.body.giftid)
        if(gift){
            if(gift.count <= await gift.countGivenGifts()){
                throw new ValidationError('Tego prezentu jest za mało')
            }
        }

        child.giftId = gift?.id ?? null;
        await child.update()

        res.redirect('/child')

    })

