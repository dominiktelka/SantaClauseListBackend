import {Router} from "express";
import {ChildRecord} from "../records/child.record";
import {GiftRecord} from "../records/gift.record";
import {ValidationError} from "../utils/error";
import {
    CreateChildReq,
    ListChildrenRes,
    SetGiftForChildReq
} from "../types/child/child";
//

export const childRouter = Router();

childRouter
    .get('/', async (req,res)=>{
        const childrenList = await ChildRecord.listAll()  // over here we are taking all kids from function created inside Class ChildRecord. Later we need to create layout in list.hbs
        const giftList = await GiftRecord.listAll();
        res.json({
            childrenList,
            giftList,
        } as  ListChildrenRes);
    })
    .post('/', async (req,res)=>{
        const newChild = new ChildRecord(req.body as CreateChildReq); // over here we are taking data like name from our website
        await newChild.insert();

        res.json(newChild);
    })
    .patch('/gift/:childId', async (req,res)=>{

        const {body}:{
            body: SetGiftForChildReq
        } = req;

        const child = await ChildRecord.getOne(req.params.childId)
        if(child === null){
            throw new ValidationError('Nie znaleziono dziecka z podanym ID')
        }

        const gift = body.giftId === '' ? null : await GiftRecord.getOne(body.giftId)
        if(gift){
            if(gift.count <= await gift.countGivenGifts()){
                throw new ValidationError('Tego prezentu jest za mało')
            }
        }

        child.giftId = gift?.id ?? null;
        await child.update()

        res.json(child)

    })

