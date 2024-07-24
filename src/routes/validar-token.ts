import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

const validarToken = (req:Request, res:Response, next:NextFunction) => {
    const headerToken = req.headers['authorization']
    
    
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        
        // Tiene token
        try {
            const bearerToken = headerToken.slice(7);
            console.log(bearerToken)
            jwt.verify(bearerToken, process.env.CLAVE_SECRETA || 'juan12345');
            next()
        } catch (error) {
            res.status(401).json({
                msg: 'token no valido'
            })
        }

    } else {
        res.status(401).json({
            msg: 'Acceso denegado'
        })
    }
}

export default validarToken;