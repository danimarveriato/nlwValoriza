import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
// Vai gerar o token
import { sign } from "jsonwebtoken"
//Permite comparar a senha com hash
import { compare } from "bcryptjs"


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({ email, password }: IAuthenticateRequest) {
        const userRepositories = getCustomRepository(UsersRepositories);

        // Verificar se email existe
        const user = await userRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("E-mail/Password incorrect")
        }

        // Verificar se senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("E-mail/Password incorrect")
        }


        // Gerar token
        const token = sign({
            email: user.email
            //Chave secreta (para mais segurança, gerar com um gerador MD5 online)
        }, "acd29849d3ea24c085bc84bfa28f32c8", {
            subject: user.id,
            expiresIn: "1d" //expira em 1 dia
        });

        return token;
    }

}

export { AuthenticateUserService }