import { Injectable } from '@nestjs/common';
import { CreateChequeDto } from './dto/create-cheque.dto';
import { UpdateChequeDto } from './dto/update-cheque.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cheque } from './entities/cheque.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChequeService {

  constructor(@InjectRepository(Cheque) private chequeRepository : Repository<Cheque>){}

  create(createChequeDto: CreateChequeDto) {
    return this.chequeRepository.save(createChequeDto);
  }

  findAll() {
    return this.chequeRepository.find({relations: ['id_cobro']});
  }

  findOne(id: number) {
    return this.chequeRepository.findOne({
      where: {id_cheque: id},
      relations: ['id_cobro']
    });
  }

  update(id: number, updateChequeDto: UpdateChequeDto) {
    return this.chequeRepository.update(id, updateChequeDto);
  }

  remove(id: number) {
    return this.chequeRepository.delete(id);
  }
}
