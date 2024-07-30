import { IsEmail, IsString } from "class-validator";

export class RegisterDto {
    @IsString()
    username: string;
    @IsString()
    password: string;
    @IsEmail()
    email: string;
}
