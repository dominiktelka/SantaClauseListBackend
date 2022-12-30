import * as express from "express";
import * as cors from 'cors';
import 'express-async-errors';

import {giftRouter} from "./routers/gift";

import {childRouter} from "./routers/child";


import {handleError} from "./utils/error";

import './utils/db'



const app = express();

        app.use(cors({
                origin: 'http://localhost:3000',
            }
        ));

        app.use(express.json());

        app.use('/child',childRouter);
        app.use('/gift', giftRouter)

        app.use(handleError);

        app.listen(3001, 'localhost', ()=>{
            console.log('Listening on http://localhost:3001')
        });