import { Injectable } from '@nestjs/common';
import { CreateGastosFijoDto } from './dto/create-gastos-fijo.dto';
import { UpdateGastosFijoDto } from './dto/update-gastos-fijo.dto';
import { Repository } from 'typeorm';
import { GastosFijo } from './entities/gastos-fijo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class GastosFijosService {
  constructor(
    @InjectRepository(GastosFijo)
    private gastosFijosRepository: Repository<GastosFijo>,
  ) {}
  
  async create(createGastosFijoDto: CreateGastosFijoDto, user: User) {
    try {
      const gastoFijo = this.gastosFijosRepository.create({
        ...createGastosFijoDto,
        usuario: user,
        });

      await this.gastosFijosRepository.save(gastoFijo);

      return {
        message: 'Gasto fijo creado con éxito',
        gastoFijo,
      }
    } catch (error) {
      return {
        message: 'Error al crear el gasto fijo',
        error,
      }
      
    }
  }

  async findAll() {
    try {
      return await this.gastosFijosRepository.find();
    } catch (error) {
      return {
        message: 'Error al obtener los gastos fijos',
        error,
      }
      
    }
  }

  async findOne(id: string) {
    try {
      return await this.gastosFijosRepository.findOne({
        where: {
          id,
        },
      
      });
    } catch (error) {
      return {
        message: 'Error al obtener el gasto fijo',
        error,
      }
      
    }
  }

  async update(id: string, updateGastosFijoDto: UpdateGastosFijoDto) {
    try {
      const gastoFijo = await this.gastosFijosRepository.findOne({
        where: {
          id,
        },
      });
      if(gastoFijo){
        this.gastosFijosRepository.merge(gastoFijo, updateGastosFijoDto);
        return await this.gastosFijosRepository.save(gastoFijo);
      
      }
      else{
        return {
          message: 'Gasto fijo no encontrado',
        }
      }
    } catch (error) {
      return {
        message: 'Error al actualizar el gasto fijo',
        error,
      }
      
    }
  }

  async remove(id: string) {
    try {
      return await this.gastosFijosRepository.delete({
        id,
      });
    } catch (error) {
      return {
        message: 'Error al eliminar el gasto fijo',
        error,
      }
      
    }
  }
}
