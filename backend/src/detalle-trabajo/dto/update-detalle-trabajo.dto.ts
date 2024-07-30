import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleTrabajoDto } from './create-detalle-trabajo.dto';

export class UpdateDetalleTrabajoDto extends PartialType(CreateDetalleTrabajoDto) {}
