import { Router,Request,Response, NextFunction,RequestHandler } from "express";

import { body, validationResult } from "express-validator";

export default class AuthController {
    private router = Router();
    registerRoute():Router {
        this.router.post("login",this.loginValidationRules(),this.validate,this.login())
        return this.router
    }
    private login():RequestHandler {
        return async (req:Request,res:Response) => {
           return res.status(200).json({message:'a'})
        }
    }
    private loginValidationRules = () => {
        return [
        body('token').exists().withMessage('Token is required'),
        body('metadata').exists().withMessage('Metadata is required')
        ]
    }

    /* Express validator fn resoposible to check error
    *  that has been been thrown 
    */
    private validate = (req:Request,res:Response,next:NextFunction) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        return res.status(422).json(errors);
    }
}