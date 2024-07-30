import { IsNotEmpty, IsNumber  } from "class-validator";
import { CreateChequeDto } from "src/cheque/dto/create-cheque.dto";
import { Trabajo } from "src/trabajo/entities/trabajo.entity";

export class CreateCobroDto {
    @IsNumber() 
    @IsNotEmpty()
    monto: number;
    @IsNumber()
    @IsNotEmpty()
    id_trabajo : Trabajo;

    cheques?: CreateChequeDto[]
}
