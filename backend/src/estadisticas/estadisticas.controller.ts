import { Controller, Get } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}
  @Get('/ultimo-mes')
  findAll() {
    return this.estadisticasService.getEstadisticasUltimoMes();
  }
}
