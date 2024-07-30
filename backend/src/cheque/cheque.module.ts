import { Module } from '@nestjs/common';
import { ChequeService } from './cheque.service';
import { ChequeController } from './cheque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cheque } from './entities/cheque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cheque])],
  controllers: [ChequeController],
  providers: [ChequeService],
})
export class ChequeModule {}
