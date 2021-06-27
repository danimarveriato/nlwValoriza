import { Exclude } from "class-transformer";
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid"

//Define o nome da tabela no BD
@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    admin: boolean;

    @Exclude() //Exclui da exibição no get a senha
    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    //Executa sempre quando é instanciado a classe
    constructor() {
        if (!this.id) {
            this.id = uuid(); //Cria um uuid quando é um novo usuário
        }
    }
}

export { User };
