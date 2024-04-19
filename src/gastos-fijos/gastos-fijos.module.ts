import { Module } from '@nestjs/common';
import { GastosFijosService } from './gastos-fijos.service';
import { GastosFijosController } from './gastos-fijos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrada } from 'src/entradas/entities/entrada.entity';
import { Salida } from 'src/salidas/entities/salida.entity';
import { PassportModule } from '@nestjs/passport';
import { GastosFijo } from './entities/gastos-fijo.entity';

@Module({
  controllers: [GastosFijosController],
  providers: [GastosFijosService],
  imports: [TypeOrmModule.forFeature([Entrada, Salida, GastosFijo]),
  PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class GastosFijosModule {}
