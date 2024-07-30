import { Injectable } from '@nestjs/common';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modelo } from './entities/modelo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModeloService {

  constructor(@InjectRepository(Modelo) private modeloRepository : Repository<Modelo>){}

  create(createModeloDto: CreateModeloDto) {
    return this.modeloRepository.save(createModeloDto);
  }

  findAll() {
    return this.modeloRepository.find({
      relations: ['marca']
    });  
  }

  findOne(id: number) {
    return this.modeloRepository.findOne({
      where: {id_modelo: id},
      relations: ['marca']
    });
  }

  update(id: number, updateModeloDto: UpdateModeloDto) {
    return this.modeloRepository.update(id, updateModeloDto);
  }

  remove(id: number) {
    return this.modeloRepository.delete(id);
  }
}
