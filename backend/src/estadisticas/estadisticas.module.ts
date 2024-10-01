import { Module } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasController } from './estadisticas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trabajo } from 'src/trabajo/entities/trabajo.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Tarea } from 'src/tarea/entities/tarea.entity';

@Module({
  controllers: [EstadisticasController],
  providers: [EstadisticasService],
  imports: [TypeOrmModule.forFeature([Trabajo, Empleado, Tarea])],
})
export class EstadisticasModule {}
