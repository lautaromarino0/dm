import { Module } from '@nestjs/common';
import { CobroService } from './cobro.service';
import { CobroController } from './cobro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cobro } from './entities/cobro.entity';
import { Cheque } from 'src/cheque/entities/cheque.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cobro]), TypeOrmModule.forFeature([Cheque])],
  controllers: [CobroController],
  providers: [CobroService],
})
export class CobroModule {}
