import { Injectable } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado } from './entities/estado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoService {

  constructor(@InjectRepository(Estado) private estadoRepository:Repository<Estado>){}

  create(createEstadoDto: CreateEstadoDto) {
    return this.estadoRepository.save(createEstadoDto);
  }

  findAll() {
    return this.estadoRepository.find();
  }

  async findOne(nombre: string) {
    const estado  = await this.estadoRepository.findOne({
      where: {nombre: nombre }, relations: ['trabajos', 'trabajos.id_vehiculo', 'trabajos.id_vehiculo.id_modelo', 'trabajos.id_vehiculo.id_cliente', 'trabajos.id_estado','trabajos.id_empleado','trabajos.id_empleado']
    });
    return estado.trabajos
  }

  update(id: number, updateEstadoDto: UpdateEstadoDto) {
    return this.estadoRepository.update(id, updateEstadoDto);
  }

  remove(id: number) {
    return this.estadoRepository.delete(id);
  }
}
