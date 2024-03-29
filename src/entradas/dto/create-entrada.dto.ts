import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEntradaDto {

    @IsString()
    readonly nombre: string;

    @IsDateString()
    readonly fecha: string;

    @IsString()
    @IsOptional()
    readonly mes?: string;

    @IsString()
    @IsOptional()
    readonly año?: string;

    @IsNumber()
    readonly valor: number;

}
