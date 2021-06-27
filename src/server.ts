import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

import "./database";

const app = express();
//Habilita pra receber requisições de fora
app.use(cors());

app.use(express.json());

app.use(router);

//middleware para tratativa de erros
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof Error) {
            return response.status(400).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: "Internal Server Error",
        });
    }
);

app.listen(3000, () => console.log('Server is running'));