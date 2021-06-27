import { Request, Response, NextFunction, request } from "express";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";


export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { user_id } = request;

    //Busca dados do usuário e verifica se ele é admin
    const userRepositories = getCustomRepository(UsersRepositories);

    const { admin } = await userRepositories.findOne(user_id);

    //console.log(admin);
    if (admin) {
        return next();
    }

    return response.status(401).json({
        error: "Unauthorized",
    });
}