import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateDetalleTrabajoDto } from "src/detalle-trabajo/dto/create-detalle-trabajo.dto";
import { Empleado } from "src/empleado/entities/empleado.entity";
import { Estado } from "src/estado/entities/estado.entity";
import { Vehiculo } from "src/vehiculo/entities/vehiculo.entity";

export class CreateTrabajoDto {
    @IsNumber()
    @IsNotEmpty()
    id_empleado: Empleado;
    @IsNumber()
    @IsNotEmpty()
    id_vehiculo:Vehiculo;
    @IsString()
    kilometraje?: string;
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateDetalleTrabajoDto)
    @ArrayMinSize(1)
    detalles: CreateDetalleTrabajoDto[];
    id_estado: Estado;
}
