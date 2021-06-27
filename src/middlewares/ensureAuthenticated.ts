import { Request, Response, NextFunction } from "express";
//Verifica se o token é válido
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    //Receber o token 
    const authToken = request.headers.authorization;

    //Validar se token está preenchido
    if (!authToken) {
        return response.status(401).json().end();
    }

    const [, token] = authToken.split(" ");

    //Validar se token é válido
    try {
        const { sub } = verify(token, "acd29849d3ea24c085bc84bfa28f32c8") as IPayload;
        //console.log(decode);
        request.user_id = sub;

        return next();
    } catch (error) {
        return response.status(401).end();
    }

}