import { Injectable } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadoService {

  constructor(@InjectRepository(Empleado) private empleadoRepository:Repository<Empleado>){}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadoRepository.save(createEmpleadoDto);
  }

  async findAll() {
    return this.empleadoRepository.find();
  }

  async findOne(id: number) {
    return this.empleadoRepository.findOne({
      where: {id_empleado: id}, relations: ['trabajos', 'pagos']
    });
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    return this.empleadoRepository.update(id, updateEmpleadoDto);
  }

  async remove(id: number) {
    return this.empleadoRepository.delete(id);
  }
}
