import { Request , Response } from "express";
import  bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken"

export const newUser = async(req : Request , res:Response) =>{

    const {username, password} = req.body;

    //Validacion de usuario
    const user = await User.findOne({where: {username:username}});

    if(user){
        return  res.status(400).json({
            msg:`Ya existe un usuario con el nombre ${username}`
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        //Guarda el usuario en la base de datos
        await User.create({
            username: username,
            password: hashPassword
        });
        res.json({
            msg:`Usuario ${username} creado exitosamente!`,
        })
        
    } catch (error) {
        res.status(400).json({
            msg:"Ocurrio un error",
            error
        })
    }
}

export const loginUser = async(req : Request , res:Response) =>{

    const {username, password} = req.body;

    //se valida si el usuario exite en la base de datos
    const user:any = await User.findOne({where: {username:username}});

    if (!user){
        return res.status(400).json({
            msg: `No exite el usuario ${username} en la base de datos!`
        })
    }

    //Validacion de password
    const passwordValida = await bcrypt.compare(password, user.password)

    if(!passwordValida){
        return res.status(400).json({
            msg:`Password incorrecta!`
        })
    }

    //Genera el token
    const token = jwt.sign({
    username:username
    },process.env.CLAVE_SECRETA || 'juan12345',{expiresIn:'3600000'});
    /*res.cookie('token', token,{httpOnly: true,maxAge: 3600000})*/

    console.log(token)

    res.json(token);

}