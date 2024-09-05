import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { MarcaModule } from './marca/marca.module';
import { ModeloModule } from './modelo/modelo.module';
import { EstadoModule } from './estado/estado.module';
import { TrabajoModule } from './trabajo/trabajo.module';
import { PagoModule } from './pago/pago.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { TareaModule } from './tarea/tarea.module';
import { CobroModule } from './cobro/cobro.module';
import { ChequeModule } from './cheque/cheque.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleTrabajoModule } from './detalle-trabajo/detalle-trabajo.module';
import { AuthModule } from './auth/auth.module';
import { RolModule } from './rol/rol.module';
import { UserModule } from './user/user.module';
import { EstadisticasModule } from './estadisticas/estadisticas.module';

@Module({
  imports: [ClienteModule, VehiculoModule, MarcaModule, ModeloModule, EstadoModule, TrabajoModule, PagoModule, EmpleadoModule, TareaModule, CobroModule, ChequeModule,UserModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'ingeNiero123',
      database: 'taller',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }
  ), DetalleTrabajoModule, AuthModule, RolModule, EstadisticasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
