import { Injectable, Logger } from '@nestjs/common';
import { CreateSalidaDto } from './dto/create-salida.dto';
import { UpdateSalidaDto } from './dto/update-salida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Salida } from './entities/salida.entity';
import { Equal, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { GastosFijo } from 'src/gastos-fijos/entities/gastos-fijo.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SalidasService {
  constructor(
    @InjectRepository(Salida)
    private readonly salidaRepository: Repository<Salida>,
    @InjectRepository(GastosFijo)
    private readonly gastosFijosRepository: Repository<GastosFijo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  private readonly logger = new Logger(SalidasService.name);
  async create(createSalidaDto: CreateSalidaDto, user: User) {
    try {
      const salida = this.salidaRepository.create({
        userid: user.id,
        ...createSalidaDto,
      });
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
  }

  //traer todas las salidas de un usuario y un mes en especifico
  async findAllSalidaMesActual(user: User) {
    try {
      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();
  
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
  
      const salidas = await this.salidaRepository.createQueryBuilder('salida')
        // .select('SUM(salida.valor)', 'total')
        .where('salida.fecha BETWEEN :start AND :end', { start: startDate, end: endDate })
        .andWhere('salida.userid = :userid', { userid: user.id })
        .getRawMany();

      return {
        message: "Consulta exitosa",
        data: salidas,
      };

    } catch (error) {
      return {
        message: 'Error al obtener las salidas',
        error: error.message,
      }
      
    }
  }

  //funcion que verifica al iniciar un nuevo mes para crear los gastos fijos en salida
  // @Cron('*/2 * * * *') // cada 2 minutos
  @Cron('0 0 1 * *')
  async createSalidaMesActual() {
    try {
      // Obtener todos los usuarios
      const users = await this.userRepository.find();
      console.log(users);

      for (const user of users) {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
    
        const startDate = new Date(year, month, 1);
    
        // Obtener todos los gastos fijos del usuario
        const gastosFijos = await this.gastosFijosRepository.find({ where: { usuario: Equal(user.id) } });
    
        // Para cada gasto fijo, crear una nueva salida
        for (const gastoFijo of gastosFijos) {
          const nuevaSalida = new Salida();
          // nuevaSalida.fecha = startDate;
          nuevaSalida.nombre = gastoFijo.nombre;
          nuevaSalida.valor = gastoFijo.valor;
          nuevaSalida.userid = user;
          await this.salidaRepository.save(nuevaSalida);
        }
      }

      this.logger.debug('Salidas creadas para este mes');

    } catch (error) {
      this.logger.error('Error al crear las salidas', error.stack);
    }
  }
}
