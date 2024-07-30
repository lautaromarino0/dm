import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TrabajoService } from './trabajo.service';
import { CreateTrabajoDto } from './dto/create-trabajo.dto';
import { UpdateTrabajoDto } from './dto/update-trabajo.dto';

@Controller('trabajo')
export class TrabajoController {
  constructor(private readonly trabajoService: TrabajoService) {}

  @Post()
  create(@Body() createTrabajoDto: CreateTrabajoDto) {
    return this.trabajoService.create(createTrabajoDto);
  }

  @Get()
  findAll() {
    return this.trabajoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trabajoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrabajoDto: UpdateTrabajoDto) {
    return this.trabajoService.update(+id, updateTrabajoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trabajoService.remove(+id);
  }

  @Put(':id/completar')
  completarTrabajo(@Param('id') id: string) {
    return this.trabajoService.completarTrabajo(+id);
  }

  @Put(':id/cobrar')
  cobrarTrabajo(@Param('id') id: string) {
    return this.trabajoService.cobrarTrabajo(+id);
  }

  @Put(':id/entregar')
  entregaTrabajo(@Param('id') id: string, @Body('monto') monto: number) {
    return this.trabajoService.entregarTrabajo(+id, monto);
  }

  @Put(':id/pagar')
  pagarTrabajo(@Param('id') id: string) {
    return this.trabajoService.pagarTrabajo(+id);
  }

  @Get('/empleado/:id')
  getTrabajosPorEmpleado(@Param('id') id: string) {
    return this.trabajoService.getTrabajosPorEmpleado(+id);
  }
}
