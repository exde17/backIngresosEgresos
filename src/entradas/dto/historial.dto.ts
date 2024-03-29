import { IsNumber } from "class-validator";

export class HistorialDto{

    @IsNumber()
    mes: number;

    @IsNumber()
    año: number;
}