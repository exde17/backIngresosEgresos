import { Module } from '@nestjs/common';
import { SalidasService } from './salidas.service';
import { SalidasController } from './salidas.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Salida } from './entities/salida.entity';
import { User } from 'src/user/entities/user.entity';
import { GastosFijo } from 'src/gastos-fijos/entities/gastos-fijo.entity';

@Module({
  controllers: [SalidasController],
  providers: [SalidasService],
  imports: [
    TypeOrmModule.forFeature([Salida, User, GastosFijo]),
    ScheduleModule.forRoot(),
  PassportModule.register({ defaultStrategy: 'jwt' })
],
})
export class SalidasModule {}
