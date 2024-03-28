import { Module } from '@nestjs/common';
import { SalidasService } from './salidas.service';
import { SalidasController } from './salidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Salida } from './entities/salida.entity';

@Module({
  controllers: [SalidasController],
  providers: [SalidasService],
  imports: [TypeOrmModule.forFeature([Salida]),
  PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class SalidasModule {}
