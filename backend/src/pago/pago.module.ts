import { Module } from '@nestjs/common';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Trabajo } from 'src/trabajo/entities/trabajo.entity';
import { Estado } from 'src/estado/entities/estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pago]),TypeOrmModule.forFeature([Trabajo]),TypeOrmModule.forFeature([Estado])],
  controllers: [PagoController],
  providers: [PagoService],
})
export class PagoModule {}
