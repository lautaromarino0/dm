import { Injectable } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';
import { Trabajo } from 'src/trabajo/entities/trabajo.entity';
import { Estado } from 'src/estado/entities/estado.entity';

@Injectable()
export class PagoService {

  constructor(@InjectRepository(Pago) private pagoRepository : Repository<Pago>,
  @InjectRepository(Trabajo) private trabajoRepository: Repository<Trabajo>,
  @InjectRepository(Estado) private estadoRepository: Repository<Estado>
){}

  async create(createPagoDto: CreatePagoDto) {
    const pago = await this.pagoRepository.save(createPagoDto);

    const trabajos = await this.trabajoRepository.findByIds(createPagoDto.trabajos);
    const estadoPagado = await this.estadoRepository.findOne({ where: { nombre: 'Pagado' } });
    trabajos.forEach(trabajo => {
      trabajo.id_pago = pago;
      trabajo.id_estado = estadoPagado;
    });
    await this.trabajoRepository.save(trabajos);
    return pago;
  }

  findAll() {
    return this.pagoRepository.find({relations: ['trabajos', 'trabajos.id_vehiculo', 'trabajos.id_estado', 'trabajos.id_vehiculo.id_modelo','id_empleado','trabajos.id_vehiculo.id_cliente']});
  }

  findOne(id: number) {
    return this.pagoRepository.findOne({
      where: {id_pago: id},
      relations: ['trabajos', 'trabajos.id_vehiculo', 'trabajos.id_estado', 'trabajos.id_vehiculo.id_modelo','id_empleado','trabajos.id_vehiculo.id_cliente']
    });
  }

  update(id: number, updatePagoDto: UpdatePagoDto) {
    return this.pagoRepository.update(id, updatePagoDto);
  }

  remove(id: number) {
    return this.pagoRepository.delete(id);
  }
}
