import { Module } from '@nestjs/common';
import { TrabajoService } from './trabajo.service';
import { TrabajoController } from './trabajo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trabajo } from './entities/trabajo.entity';
import { Estado } from 'src/estado/entities/estado.entity';
import { DetalleTrabajo } from 'src/detalle-trabajo/entities/detalle-trabajo.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trabajo]),TypeOrmModule.forFeature([Estado]),TypeOrmModule.forFeature([DetalleTrabajo]),TypeOrmModule.forFeature([Empleado])],
  controllers: [TrabajoController],
  providers: [TrabajoService],
})
export class TrabajoModule {}
