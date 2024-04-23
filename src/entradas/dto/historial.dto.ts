import { IsNumber, IsOptional } from "class-validator";

export class HistorialDto{

    @IsNumber()
    @IsOptional()
    mes?: number;

    @IsNumber()
    año: number;
}