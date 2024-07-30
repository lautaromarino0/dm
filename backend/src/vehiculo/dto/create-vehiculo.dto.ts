import { IsNumber, IsString } from "class-validator"
import { Cliente } from "src/cliente/entities/cliente.entity"
import { Modelo } from "src/modelo/entities/modelo.entity"


export class CreateVehiculoDto {
    @IsNumber()
    año: number
    @IsNumber()
    id_modelo: Modelo
    @IsNumber() 
    id_cliente: Cliente
    @IsString()
    patente?: string
}
