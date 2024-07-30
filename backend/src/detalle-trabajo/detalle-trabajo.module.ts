import { Module } from '@nestjs/common';
import { DetalleTrabajoService } from './detalle-trabajo.service';
import { DetalleTrabajoController } from './detalle-trabajo.controller';
import { DetalleTrabajo } from './entities/detalle-trabajo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleTrabajo])],
  controllers: [DetalleTrabajoController],
  providers: [DetalleTrabajoService],
})
export class DetalleTrabajoModule {}
