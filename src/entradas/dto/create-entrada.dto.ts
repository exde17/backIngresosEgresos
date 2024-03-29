import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

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

    // @IsString()
    readonly userid: User;

}
