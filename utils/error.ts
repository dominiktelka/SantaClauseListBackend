import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error{}
export class NotFoundError extends Error{}

export const handleError = (err:Error, req:Request,res:Response, next:NextFunction):void =>{
    if(err instanceof NotFoundError){
        res
            .status(404)
            .render('error',{
                message: 'Cant find this ID'
            });
        return
    }
    console.error(err);

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .json({
        message: err instanceof ValidationError ? err.message : 'Sorry, try again later.'
        });
};

module.exports = {
    handleError, ValidationError, NotFoundError
}