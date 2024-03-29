import { Injectable } from '@nestjs/common';
import { CreateSalidaDto } from './dto/create-salida.dto';
import { UpdateSalidaDto } from './dto/update-salida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Salida } from './entities/salida.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalidasService {
  constructor(
    @InjectRepository(Salida)
    private readonly salidaRepository: Repository<Salida>,
  ) {}
  async create(createSalidaDto: CreateSalidaDto) {
    try {
      const salida = this.salidaRepository.create(createSalidaDto);
      await this.salidaRepository.save(salida);

      return {
        message: 'Salida creada con éxito',
        data: salida,
      }
    } catch (error) {
      return {
        message: 'Error al crear la salida',
        error: error.message,
      }
      
    }
  }

  async findAll() {
    try {
      return await this.salidaRepository.find();
    } catch (error) {
      return {
        message: 'Error al obtener las salidas',
        error: error.message,
      }
      
    }
  }

  async findOne(id: string) {
    try {
      return await this.salidaRepository.findOne({
        where: {
          id
        }
      
      });
    } catch (error) {
      return {
        message: 'Error al obtener la salida',
        error: error.message,
      }
      
    }
  }

  async update(id: string, updateSalidaDto: UpdateSalidaDto) {
    try {
      const salida = await this.salidaRepository.findOne({
        where: {
          id
        }
      
      });
      this.salidaRepository.merge(salida, updateSalidaDto);
      await this.salidaRepository.save(salida);
      return {
        message: 'Salida actualizada con éxito',
        data: salida,
      }
    } catch (error) {
      return {
        message: 'Error al actualizar la salida',
        error: error.message,
      }
      
    }
  }

  async remove(id: string) {
    try {
      const salida = await this.salidaRepository.findOne({
        where: {
          id
        }
      
      });
      await this.salidaRepository.remove(salida);
      return {
        message: 'Salida eliminada con éxito',
      }
    } catch (error) {
      return {
        message: 'Error al eliminar la salida',
        error: error.message,
      
    }
  }
}}
