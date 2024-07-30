import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Marca } from "src/marca/entities/marca.entity";

export class CreateModeloDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
    @IsNumber()
    @IsNotEmpty()
    marca: Marca;
}
