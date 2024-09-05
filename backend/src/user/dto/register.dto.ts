import { IsEmail, IsNumber, IsString } from "class-validator";
import { Rol } from "src/rol/entities/rol.entity";

export class RegisterDto {
    @IsString()
    username: string;
    @IsString()
    password: string;
    @IsEmail()
    email: string;
    @IsNumber()
    rol: Rol;
}
