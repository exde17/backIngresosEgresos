import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateEntradaDto {

    @IsString()
    readonly nombre: string;

    @IsDateString()
    readonly fecha: string;

    @IsString()
    readonly mes: string;

    @IsString()
    readonly año: string;

    @IsNumber()
    readonly valor: number;

}
