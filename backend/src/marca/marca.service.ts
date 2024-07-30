import { Injectable } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Marca } from './entities/marca.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarcaService {

  constructor(@InjectRepository(Marca) private marcaRespository : Repository<Marca>){}

  create(createMarcaDto: CreateMarcaDto) {
    return this.marcaRespository.save(createMarcaDto);
  }

  findAll() {
    return this.marcaRespository.find();
  }

  findOne(id: number) {
    return this.marcaRespository.findOne({
      where: {id_marca: id}
    });
  }

  update(id: number, updateMarcaDto: UpdateMarcaDto) {
    return this.marcaRespository.update(id, updateMarcaDto);
  }

  remove(id: number) {
    return this.marcaRespository.delete(id);  

  }
}
