import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrabajoDto } from './dto/create-trabajo.dto';
import { UpdateTrabajoDto } from './dto/update-trabajo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trabajo } from './entities/trabajo.entity';
import { Repository } from 'typeorm';
import { Estado } from 'src/estado/entities/estado.entity';
import { DetalleTrabajo } from 'src/detalle-trabajo/entities/detalle-trabajo.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';

@Injectable()
export class TrabajoService {

  constructor(@InjectRepository(Trabajo) private trabajoRepository : Repository<Trabajo>,
  @InjectRepository(Estado) private readonly estadoRepository: Repository<Estado>,
  @InjectRepository(DetalleTrabajo) private readonly detalleTrabajoRepository: Repository<DetalleTrabajo>,
  @InjectRepository(Empleado) private readonly empleadoRepository: Repository<Empleado>
  ){}

  async create(createTrabajoDto: CreateTrabajoDto) {
    const { detalles, ...trabajoData } = createTrabajoDto;
  
    // Encuentra el estado por defecto
    const estadoPendiente = await this.estadoRepository.findOne({ where: { nombre: 'Pendiente' } });
    if (!estadoPendiente) {
      throw new NotFoundException('Estado pendiente no encontrado');
    }
    let total = 0
    detalles.forEach(detalle => {
      total += detalle.precioManoObra + detalle.precioRepuestos
    });
  
    // Crea la instancia de Trabajo y asigna el estado pendiente
    const trabajo = this.trabajoRepository.create({ ...trabajoData, id_estado: estadoPendiente,total:total });
  
    // Guarda la instancia de Trabajo

    const savedTrabajo = await this.trabajoRepository.save(trabajo);
    
    // Crea y guarda los DetalleTrabajo asociados
    const detalleTrabajoEntities = detalles.map(detalle => {
      return this.detalleTrabajoRepository.create({
        ...detalle,
        id_trabajo: savedTrabajo,  // Asigna la instancia de trabajo guardada
      });
    });
  
    await this.detalleTrabajoRepository.save(detalleTrabajoEntities);
  
    // Devuelve el trabajo creado con los detalles
    return this.findOne(savedTrabajo.id_trabajo);
  }
  async entregarTrabajo(id: number, monto: number) {
    const trabajo = await this.trabajoRepository.findOne({where: {id_trabajo: id},});
    trabajo.totalEntregado += monto
    if (trabajo.totalEntregado >= trabajo.total) {
      return this.cobrarTrabajo(id)
    }
    return this.trabajoRepository.save(trabajo);
  }

  findAll() {
    return this.trabajoRepository.find({ order: {
      fechaIngreso: 'DESC' // Ordenar por la columna fechaCreacion en orden descendente
    },relations: ['id_empleado', 'id_vehiculo', 'detalles','detalles.id_tarea', 'id_estado', 'id_vehiculo.id_modelo' , 'id_vehiculo.id_cliente']})
  }

  findOne(id: number) {
    return this.trabajoRepository.findOne({
      where: {id_trabajo: id},
      relations: ['id_empleado', 'id_vehiculo', 'detalles','detalles.id_tarea', 'id_estado', 'id_vehiculo.id_modelo' , 'id_vehiculo.id_cliente']
    });
  }

  async update(id: number, updateTrabajoDto: UpdateTrabajoDto) {
    // Paso 1: Obtener el trabajo existente y sus detalles
    const trabajo = await this.trabajoRepository.findOne({
      where: { id_trabajo: id },
      relations: ['detalles']
    });
  
    if (!trabajo) {
      throw new Error('Trabajo no encontrado');
    }
  
    const detallesEnviados = updateTrabajoDto.detalles;
    const detallesExistentes = trabajo.detalles;
    // Paso 2: Actualizar o crear detalles
    let total = 0
    detallesEnviados.forEach(detalle => {
      total += detalle.precioManoObra + detalle.precioRepuestos
    });
    trabajo.total = total
    this.trabajoRepository.save(trabajo)
    for (const detalleEnviado of detallesEnviados) {
      if (detalleEnviado.id_detalle != 0) {
        // Actualizar detalle existente
        const detalleExistente = detallesExistentes.find(d => d.id_detalle === detalleEnviado.id_detalle);
        if (detalleExistente) {
          detalleExistente.id_tarea = detalleEnviado.id_tarea;
          detalleExistente.precioManoObra = detalleEnviado.precioManoObra;
          detalleExistente.precioRepuestos = detalleEnviado.precioRepuestos;
          await this.detalleTrabajoRepository.save(detalleExistente);
        }
      } else {
        // Crear nuevo detalle
        const nuevoDetalle = {
          ...detalleEnviado,
          id_trabajo: trabajo // Asegúrate de establecer la relación con el trabajo
        };
        await this.detalleTrabajoRepository.save(nuevoDetalle);
      }
    }
  
    // Paso 3: Eliminar detalles no enviados
    const idsEnviados = detallesEnviados.map(d => d.id_detalle).filter(id => id != null);
    const detallesAEliminar = detallesExistentes.filter(d => !idsEnviados.includes(d.id_detalle));
    for (const detalleAEliminar of detallesAEliminar) {
      await this.detalleTrabajoRepository.remove(detalleAEliminar);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    // Paso 1: Buscar el trabajo por ID, asegurándose de cargar los detalles relacionados
    const trabajo = await this.trabajoRepository.findOne({ where: { id_trabajo: id }, relations: ['detalles'] });
  
    // Paso 2: Verificar si el trabajo existe
    if (!trabajo) {
      throw new NotFoundException('Trabajo no encontrado');
    }
  
    // Paso 3 y 4: Eliminar detalles del trabajo
    if (trabajo.detalles && trabajo.detalles.length > 0) {
      for (const detalle of trabajo.detalles) {
        await this.detalleTrabajoRepository.remove(detalle);
      }
    }
  
    // Paso 5: Eliminar el trabajo
    return this.trabajoRepository.delete(id);
  }
  async completarTrabajo(id: number) {
    const estadoCompletado = await this.estadoRepository.findOne({ where: { nombre: 'Completado' } });
    const trabajo = await this.trabajoRepository.findOne({where: {id_trabajo: id},relations: ['id_estado'],});
    if (!trabajo) {
      throw new NotFoundException('Trabajo no encontrado');
    } else if (trabajo.id_estado.nombre !== 'Pendiente') {
      throw new Error('El trabajo no está pendiente');
    }
    trabajo.id_estado = estadoCompletado;
    return this.trabajoRepository.save(trabajo);
  }

  async cobrarTrabajo(id: number) {
    const estadoCobrado = await this.estadoRepository.findOne({ where: { nombre: 'Cobrado' } });
    const trabajo = await this.trabajoRepository.findOne({where: {id_trabajo: id},relations: ['id_estado'],});
    if (!trabajo) {
      throw new NotFoundException('Trabajo no encontrado');
    } else if (trabajo.id_estado.nombre !== 'Completado') {
      throw new Error('El trabajo no ha sido completado');
    }
    trabajo.id_estado = estadoCobrado;
    return this.trabajoRepository.save(trabajo);
  }

  async pagarTrabajo(id: number) {
    const estadoPagado = await this.estadoRepository.findOne({ where: { nombre: 'Pagado' } });
    const trabajo = await this.trabajoRepository.findOne({where: {id_trabajo: id},relations: ['id_estado'],});
    if (!trabajo) {
      throw new NotFoundException('Trabajo no encontrado');
    } else if (trabajo.id_estado.nombre !== 'Cobrado') {
      throw new Error('El trabajo no ha sido cobrado');
    }
    trabajo.id_estado = estadoPagado;
    return this.trabajoRepository.save(trabajo);
  }

  async getTrabajosPorEmpleado(id: number) {
    
    const empleado = await this.empleadoRepository.findOne({where: {id_empleado: id}, relations: ['trabajos', 'trabajos.id_vehiculo', 'trabajos.id_vehiculo.id_modelo', 'trabajos.id_estado', 'trabajos.detalles', 'trabajos.detalles.id_tarea']});
    if (!empleado) {
      throw new NotFoundException('Empleado no encontrado');
    }
    return empleado.trabajos;
    
  }
}
