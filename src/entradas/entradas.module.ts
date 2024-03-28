import { Module } from '@nestjs/common';
import { EntradasService } from './entradas.service';
import { EntradasController } from './entradas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Entrada } from './entities/entrada.entity';

@Module({
  controllers: [EntradasController],
  providers: [EntradasService],
  imports: [TypeOrmModule.forFeature([Entrada]),
  PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class EntradasModule {}
