import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {

  constructor(@InjectRepository(Cliente) private clienteRepository: Repository<Cliente>){}

  create(createClienteDto: CreateClienteDto) {
    return this.clienteRepository.save(createClienteDto);
  }

  findAll() {
    return this.clienteRepository.find();
  }

  findOne(id: number) {
    return this.clienteRepository.findOne({
      where: {id_cliente: id}
    });
  }
  
  update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.clienteRepository.update(id, updateClienteDto);
  }

  remove(id: number) {
    return this.clienteRepository.delete(id);
  }
}
