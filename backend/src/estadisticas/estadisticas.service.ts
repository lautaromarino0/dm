import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trabajo } from 'src/trabajo/entities/trabajo.entity';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { startOfMonth } from 'date-fns'; 

@Injectable()
export class EstadisticasService {

  constructor(@InjectRepository(Trabajo) private trabajoRepository : Repository<Trabajo>

) {}

    async getEstadisticasUltimoMes(){

    const fechaInicioMes = startOfMonth(new Date());

    const trabajos = await this.trabajoRepository.find({relations:['detalles','id_empleado','detalles'],where: {fechaIngreso: MoreThanOrEqual(fechaInicioMes)}});

    const totalTrabajos: number = trabajos.length;

    const topTareas = this.trabajoRepository
      .createQueryBuilder('trabajo')
      .leftJoinAndSelect('trabajo.detalles', 'detalle')
      .leftJoinAndSelect('detalle.id_tarea', 'tarea')
      .select(['tarea.id_tarea', 'tarea.nombre', 'COUNT(tarea.id_tarea) as count'])
      .groupBy('tarea.id_tarea')
      .orderBy('count', 'DESC')
      .take(10)
      .getRawMany();
    
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

    const totalACobrar: number = await this.trabajoRepository
    .createQueryBuilder('trabajo')
    .leftJoinAndSelect('trabajo.id_estado', 'estado')
    .select('SUM(trabajo.total - COALESCE(trabajo.totalEntregado, 0))', 'totalSum')  // Suma total restando totalEntregado
    .where('estado.nombre = :nombre', { nombre: 'Completado' })
    .getRawOne();

    let totalIngreso: number = 0;
    let totalRepuestos: number = 0;
    let totalManoObra: number = 0;
    trabajos.map(trabajo => {
      totalIngreso += trabajo.total;
      trabajo.detalles.map(detalle => {
        totalRepuestos += detalle.precioRepuestos;
        totalManoObra += detalle.precioManoObra;
      });
    })

    const totalSueldos: number = totalManoObra * 0.3; // 30% de la mano de obra
    const gananciaNeta: number = totalManoObra * 0.7; // 70% de la mano de obra

    const estadisticas = {
      totalTrabajos, totalPendientes, totalCompletados, totalCobrados, totalPagados, totalIngreso, totalManoObra, totalRepuestos, totalSueldos, gananciaNeta, totalACobrar, topTareas
    }
    return estadisticas;
  }
}
