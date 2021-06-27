import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompliments1624687836327 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "compliments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_sender",
                        type: "uuid",
                    },
                    {
                        name: "user_receiver",
                        type: "uuid",
                    },
                    {
                        name: "tag_id",
                        type: "uuid",
                    },
                    {
                        name: "message",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUserSenderCompliments",
                        referencedTableName: "users", //Tabela origem
                        referencedColumnNames: ["id"], //Coluna Origem
                        columnNames: ["user_sender"], //Coluna tabela local
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKUserReceiverCompliments",
                        referencedTableName: "users", //Tabela origem
                        referencedColumnNames: ["id"], //Coluna Origem
                        columnNames: ["user_receiver"], //Coluna tabela local
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKTagCompliments",
                        referencedTableName: "tags", //Tabela origem
                        referencedColumnNames: ["id"], //Coluna Origem
                        columnNames: ["tag_id"], //Coluna tabela local
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })

        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments");
    }

}
