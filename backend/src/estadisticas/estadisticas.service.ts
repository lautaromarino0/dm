import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trabajo } from 'src/trabajo/entities/trabajo.entity';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { startOfMonth } from 'date-fns'; 
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Tarea } from 'src/tarea/entities/tarea.entity';

@Injectable()
export class EstadisticasService {

  constructor(@InjectRepository(Trabajo) private trabajoRepository : Repository<Trabajo>,
  @InjectRepository(Empleado) private empleadoRepository : Repository<Empleado>,
  @InjectRepository(Tarea) private tareaRepository : Repository<Tarea>
) {}

    async getEstadisticasUltimoMes(){

    const fechaInicioMes = startOfMonth(new Date());

    const trabajos = await this.trabajoRepository.find({relations:['detalles','id_empleado','detalles','id_estado'],where: {fechaIngreso: MoreThanOrEqual(fechaInicioMes)}});

    const totalTrabajos: number = trabajos.length;
    const topTareas = [];
    const tareas = await this.tareaRepository.find({relations:['detalles','detalles.id_trabajo']});
    tareas.map(tarea => {
      tarea.detalles = tarea.detalles.filter(detalle => detalle.id_trabajo.fechaIngreso >= fechaInicioMes);
      topTareas.push({nombre: tarea.nombre, cantidad: tarea.detalles.length});
      topTareas.sort((a, b) => b.cantidad - a.cantidad);
    });
    
    

    const totalPendientes: number = await this.trabajoRepository
    .createQueryBuilder('trabajo')
    .leftJoinAndSelect('trabajo.id_estado', 'estado')
    .where('estado.nombre = :nombre', { nombre: 'Pendiente' })
    .andWhere('trabajo.fechaIngreso >= :fechaInicioMes', { fechaInicioMes }) 
    .getCount();

    const totalCompletados: number = await this.trabajoRepository
      .createQueryBuilder('trabajo')
      .leftJoinAndSelect('trabajo.id_estado', 'estado')
      .where('estado.nombre = :nombre', { nombre: 'Completado' })
      .andWhere('trabajo.fechaIngreso >= :fechaInicioMes', { fechaInicioMes }) 
      .getCount();

    const totalCobrados: number = await this.trabajoRepository
      .createQueryBuilder('trabajo')
      .leftJoinAndSelect('trabajo.id_estado', 'estado')
      .where('estado.nombre = :nombre', { nombre: 'Cobrado' })
      .andWhere('trabajo.fechaIngreso >= :fechaInicioMes', { fechaInicioMes }) 
      .getCount();

    const totalPagados: number = await this.trabajoRepository
      .createQueryBuilder('trabajo')
      .leftJoinAndSelect('trabajo.id_estado', 'estado')
      .where('estado.nombre = :nombre', { nombre: 'Pagado' })
      .andWhere('trabajo.fechaIngreso >= :fechaInicioMes', { fechaInicioMes }) 
      .getCount();

    const totalACobrar = await this.trabajoRepository
    .createQueryBuilder('trabajo')
    .leftJoin('trabajo.id_estado', 'estado')
    .where('estado.nombre = :nombre', { nombre: 'Completado' })
    .select('SUM(trabajo.total - trabajo.totalEntregado)', 'totalACobrar')
    .getRawOne();

    let totalIngreso: number = 0;
    let totalRepuestos: number = 0;
    let totalManoObra: number = 0;
    trabajos.map(trabajo => {
      if (trabajo.id_estado.nombre === 'Cobrado'){
        totalIngreso += trabajo.total;
      } else if (trabajo.id_estado.nombre === 'Completado'){
        totalIngreso += trabajo.totalEntregado;
      }
      trabajo.detalles.map(detalle => {
        totalRepuestos += detalle.precioRepuestos;
        totalManoObra += detalle.precioManoObra;
      });
    })
    
    const empleados = await this.empleadoRepository.find({ relations: ['trabajos', 'trabajos.id_vehiculo', 'trabajos.id_vehiculo.id_modelo', 'trabajos.id_estado', 'trabajos.detalles', 'trabajos.detalles.id_tarea'],where: {trabajos: {fechaIngreso: MoreThanOrEqual(fechaInicioMes)}}});
    const trabajosPorEmpleado = []
    empleados.map(empleado => {
      let ingreso = 0;
      empleado.trabajos.map(trabajo => {
        if (trabajo.id_estado.nombre === 'Cobrado'){
          ingreso += trabajo.total;
        } else if (trabajo.id_estado.nombre === 'Completado'){
          ingreso += trabajo.totalEntregado;
        }
      });
      trabajosPorEmpleado.push({nombre: empleado.nombre, cantidad: empleado.trabajos.length, ingreso: ingreso});
    });
    const totalSueldos: number = totalManoObra * 0.3; // 30% de la mano de obra
    const gananciaNeta: number = totalManoObra * 0.7; // 70% de la mano de obra

    if (totalACobrar.totalACobrar === null){
      totalACobrar.totalACobrar = 0;
    } 

    

    const estadisticas = {
      "totalTrabajos" : totalTrabajos,
      "totalPendientes" : totalPendientes,
      "totalCompletados" : totalCompletados,
      "totalCobrados" : totalCobrados,
      "totalPagados" : totalPagados,
      "totalIngreso" : totalIngreso,
      "totalManoObra" : totalManoObra,
      "totalRepuestos" : totalRepuestos,
      "totalSueldos" : totalSueldos,
      "gananciaNeta" : gananciaNeta,
      "totalACobrar" : totalACobrar,
      "topTareas" : topTareas,
      "trabajosPorEmpleado" : trabajosPorEmpleado
    }

    return estadisticas;
  }
}
