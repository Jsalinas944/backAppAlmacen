import express, {Application} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routesProduct from "../routes/product";
import routesUser from "../routes/user";
import { Product } from "./product";
import { User } from "./user";

class Server{
    
    private app:Application;
    private port:string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
        console.log()
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Aplicacion corriendo en el puerto"+ this.port)
        })
    }

    routes(){
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser);
    }

    midlewares(){
        // Parseo body
        this.app.use(express.json());

        //Cors
        this.app.use(cors())

        this.app.use(cookieParser());
    }

    async dbConnect(){
        try{
            await Product.sync()
            await User.sync()
            console.log("base conectada")
        }catch (error){
            console.log("No se puede establecer la conexion.", error)
        }
    }
}

export default Server