import { Injectable } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './entities/tarea.entity';

@Injectable()
export class TareaService {

  constructor(@InjectRepository(Tarea) private tareaRepository : Repository<Tarea>){}

  create(createTareaDto: CreateTareaDto) {
    return this.tareaRepository.save(createTareaDto);
  }

  findAll() {
    return this.tareaRepository.find();
  }

  findOne(id: number) {
    return this.tareaRepository.findOne({
      where: {id_tarea: id}
    }); 
  }

  update(id: number, updateTareaDto: UpdateTareaDto) {
    return this.tareaRepository.update(id, updateTareaDto); 
  }

  remove(id: number) {
    return this.tareaRepository.delete(id);
  }
}
