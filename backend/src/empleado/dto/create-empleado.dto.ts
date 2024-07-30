import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateEmpleadoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
    @IsString()
    @IsNotEmpty()
    apellido: string;
    @IsString()
    @IsNotEmpty()
    telefono: string;
    @IsEmail()  
    @IsNotEmpty()
    email: string;
}
