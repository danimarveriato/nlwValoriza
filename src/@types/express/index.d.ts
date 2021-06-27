//Sobrescreve a biblioteca do node_modules e acrescenta as variáveis daqui junto 
declare namespace Express {
    export interface Request {
        user_id: string;
    }
}