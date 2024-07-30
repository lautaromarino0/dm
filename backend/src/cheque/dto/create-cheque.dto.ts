import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Cobro } from "src/cobro/entities/cobro.entity";

export class CreateChequeDto {
    @IsString()
    @IsNotEmpty()
    numero: string;

    @IsString()
    @IsNotEmpty()
    banco: string;

    @IsNumber()
    @IsNotEmpty()
    monto: number
    
    @IsDate()
    @IsNotEmpty()
    fechaRetiro: Date

    @IsNumber()
    @IsNotEmpty()
    id_cobro: Cobro

    @IsString()
    @IsNotEmpty()
    paguese_a: string
}
