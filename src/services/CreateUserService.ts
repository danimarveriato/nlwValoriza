import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute({ name, email, admin = false, password }: IUserRequest) {
        const UsersRepository = getCustomRepository(UsersRepositories);

        //Verifica se não foi informado e-mail
        if (!email) {
            throw new Error("E-mail incorreto");
        }

        //Verifica se o usuário já existe. Se sim, lança erro pra camada de cima
        const userAlreadyExists = await UsersRepository.findOne({
            email,
        });

        if (userAlreadyExists) {
            throw new Error("Esse usuário já existe");
        }

        //Cria a criptografia p/ senha do usuário
        const passwordHash = await hash(password, 8);

        //Cria a instância do usuário
        const user = UsersRepository.create({
            name,
            email,
            admin,
            password: passwordHash, //atribui o valor da variável com a hash
        })

        //Salva no BD
        await UsersRepository.save(user);
    }
}

export { CreateUserService }