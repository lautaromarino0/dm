import { IsString } from "class-validator";

export class CreateTareaDto {
    @IsString()
    nombre: string;
    @IsString()
    descripcion: string;
}
