import { Injectable } from '@nestjs/common';
import { CreateCobroDto } from './dto/create-cobro.dto';
import { UpdateCobroDto } from './dto/update-cobro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cobro } from './entities/cobro.entity';
import { Repository } from 'typeorm';
import { Cheque } from 'src/cheque/entities/cheque.entity';

@Injectable()
export class CobroService {

  constructor(@InjectRepository(Cobro) private cobroRepository:Repository<Cobro>,
  @InjectRepository(Cheque) private chequeRepository:Repository<Cheque>
){}

  async create(createCobroDto: CreateCobroDto) {
    const cobro = await this.cobroRepository.save(createCobroDto);
    const cheques = createCobroDto.cheques
    if (cheques && cheques.length > 0) {
      const chequesValidos = cheques.filter(cheque => cheque.numero !== "" && cheque.banco !== "" && cheque.monto > 0 );
      const chequesConCobroId = chequesValidos.map(cheque => {
        
        return this.chequeRepository.create({
          ...cheque,
          id_cobro: cobro
        });
      });
      await this.chequeRepository.save(chequesConCobroId);
    } 
    return cobro
  }
  
  findAll() {
    return this.cobroRepository.find({relations: ['cheques']});
  }

  findOne(id: number) {
    return this.cobroRepository.findOne({
      where: {id_cobro: id},
      relations: ['cheques','id_trabajo','id_trabajo.id_vehiculo','id_trabajo.id_vehiculo.id_cliente','id_trabajo.id_vehiculo.id_modelo','id_trabajo.detalles','id_trabajo.detalles.id_tarea']
    });
  }

  update(id: number, updateCobroDto: UpdateCobroDto) {
    return this.cobroRepository.update(id, updateCobroDto);
  }

  remove(id: number) {
    return this.cobroRepository.delete(id);
  }
}
