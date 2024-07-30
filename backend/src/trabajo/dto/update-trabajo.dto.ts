import { PartialType } from '@nestjs/mapped-types';
import { CreateTrabajoDto } from './create-trabajo.dto';

export class UpdateTrabajoDto extends PartialType(CreateTrabajoDto) {}
