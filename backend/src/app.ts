import express,{Request,Response} from 'express'
import cors from 'cors'
export default class App {
    private express = express();
    private readonly PORT = 8080;
    protected registerControllers(): App {
        this.express.get('/',(req:Request,res:Response) => {
            res.status(200).json({'message': 'Hello from streaming app'});
        })
        //this.express.use(this.makeAuthenticationController().registerRoute());
        //this.express.use("/customers",this.makeCustomerController().registerRoute());
        return this;
    }
    async startExpressServer() {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended:true}));
        try {
            // any db connection start
        } catch (error) {
            console.error("some error from connection point");
        }
        this.registerControllers();
        this.express.listen(this.PORT,()=>{
            console.log(`app listing on port ${this.PORT}`);
        })
    }
}