import { Injectable } from '@nestjs/common';
import { CreateDetalleTrabajoDto } from './dto/create-detalle-trabajo.dto';
import { UpdateDetalleTrabajoDto } from './dto/update-detalle-trabajo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleTrabajo } from './entities/detalle-trabajo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetalleTrabajoService {

  constructor(@InjectRepository(DetalleTrabajo) private detalleRepository:Repository<DetalleTrabajo>){}

  create(createDetalleTrabajoDto: CreateDetalleTrabajoDto) {
    return this.detalleRepository.save(createDetalleTrabajoDto);
  }

  findAll() {
    return this.detalleRepository.find({relations: ['id_tarea','id_trabajo']});
  }

  findOne(id: number) {
    return this.detalleRepository.findOne({
      where: {id_detalle:id},
      relations: ['id_tarea','id_trabajo']
    });
  }

  update(id: number, updateDetalleTrabajoDto: UpdateDetalleTrabajoDto) {
    return this.detalleRepository.update(id, updateDetalleTrabajoDto);
  }

  remove(id: number) {
    return this.detalleRepository.delete(id);
  }
}
