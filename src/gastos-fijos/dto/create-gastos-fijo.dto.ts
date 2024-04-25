import { IsNumber, IsString } from "class-validator";

export class CreateGastosFijoDto {

    @IsString()
    readonly nombre: string;

    @IsNumber()
    readonly valor: number;
}
