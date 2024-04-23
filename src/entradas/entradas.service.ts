import { Injectable } from '@nestjs/common';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entrada } from './entities/entrada.entity';
import { Between, Equal, Repository } from 'typeorm';
import { Salida } from 'src/salidas/entities/salida.entity';
import { HistorialDto } from './dto/historial.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EntradasService {
  constructor(
    @InjectRepository(Entrada)
    private readonly entradaRepository: Repository<Entrada>,
    @InjectRepository(Salida)
    private readonly salidaRepository: Repository<Salida>,
  ) {}
  async create(createEntradaDto: CreateEntradaDto, user: User) {
    // console.log(user.id)
    try {
      const entrada = this.entradaRepository.create({
        userid: user.id,
        ...createEntradaDto
      });
      await this.entradaRepository.save(entrada);

      return {
        message: 'Entrada creada con éxito',
        data: entrada,
      }
    } catch (error) {
      return {
        message: 'Error al crear la entrada',
        error: error.message,
      }
      
    }
  }

    //traer todas las entradas del mes actual
    async findAllMesActual(user: User) {
      try {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
    
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
    
        const entradas = await this.entradaRepository.createQueryBuilder('entrada')
          // .select('SUM(entrada.valor)', 'total')
          .where('entrada.fecha BETWEEN :start AND :end', { start: startDate, end: endDate })
          .andWhere('entrada.userid = :userid', { userid: user.id })
          .getRawMany();
  
        return {
          message: "Consulta exitosa",
          data: entradas,
        };
  
      } catch (error) {
        return {
          message: 'Error al obtener las entradas',
          error: error.message,
        }
        
      }
    }

  async findAll() {
    try {
      return await this.entradaRepository.find();
    } catch (error) {
      return {
        message: 'Error al obtener las entradas',
        error: error.message,
      }
      
    }
  }

  async findOne(id: string) {
    try {
      return await this.entradaRepository.findOne({
        where: {
          id
        }
      
      });
    } catch (error) {
      return {
        message: 'Error al obtener la entrada',
        error: error.message,
      }
      
    }
  }

  async update(id: string, updateEntradaDto: UpdateEntradaDto) {
    try {
      const entrada = await this.entradaRepository.findOne({
        where: {
          id
        }
      
      });
      this.entradaRepository.merge(entrada, updateEntradaDto);
      await this.entradaRepository.save(entrada);
      return {
        message: 'Entrada actualizada con éxito',
        data: entrada,
      
      }
    } catch (error) {
      return {
        message: 'Error al actualizar la entrada',
        error: error.message,
      
    }
  }}

  async remove(id: string) {
    try {
      const entrada = await this.entradaRepository.findOne({
        where: {
          id
        }
      
      });
      await this.entradaRepository.remove(entrada);
      return {
        message: 'Entrada eliminada con éxito',
        data: entrada,
      
      }
    } catch (error) {
      return {
        message: 'Error al eliminar la entrada',
        error: error.message,
      
    }
  }
  }

  async total(user: User) {
    try {
      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();
  
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
  
      const entradas = await this.entradaRepository.createQueryBuilder('entrada')
        .select('SUM(entrada.valor)', 'total')
        .where('entrada.fecha BETWEEN :start AND :end', { start: startDate, end: endDate })
        .andWhere('entrada.userid = :userid', { userid: user.id })
        .getRawOne();

        console.log('entradas: ',entradas)
  
      const salidas = await this.salidaRepository.createQueryBuilder('salida')
        .select('SUM(salida.valor)', 'total')
        .where('salida.fecha BETWEEN :start AND :end', { start: startDate, end: endDate })
        .andWhere('salida.userid = :userid', { userid: user.id })
        .getRawOne();

        console.log('salidas: ',salidas)
        
      const total = entradas.total - salidas.total;

      console.log('total', total)
  
      return {
        message: 'balance obtenido con éxito',
        data: total,
      }
    }
    catch (error) {
      return {
        message: 'Error al obtener el total de entradas',
        error: error.message,
      }
    }
  }

  async historial(historialDto: HistorialDto, user: User){
    try {
      const { mes, año } = historialDto;
      const startDate = new Date(año, mes - 1, 1);
      const endDate = new Date(año, mes , 0);

      const entradas = await this.entradaRepository.createQueryBuilder('entrada')
        .select('SUM(entrada.valor)', 'total')
        .where('entrada.fecha BETWEEN :start AND :end', { start: startDate, end: endDate })
        .andWhere('entrada.userid = :userid', { userid: user.id })
        .getRawOne();

      const salidas = await this.salidaRepository.createQueryBuilder('salida')
        .select('SUM(salida.valor)', 'total')
        .where('salida.fecha BETWEEN :start AND :end', { start: startDate, end: endDate })
        .andWhere('salida.userid = :userid', { userid: user.id })
        .getRawOne();

      const total = entradas.total - salidas.total;

      return {
        message: 'Historial obtenido con éxito',
        data: {
          entradas: entradas.total,
          salidas: salidas.total,
          total,
        },
      }
    } catch (error) {
      return {
        message: 'Error al obtener el historial',
        error: error.message,
      }
      
    }
  }
  
  //sumas entradas del mes actual
  async totalEntradasMesActual(user: User) {
    try {
      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();
  
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
  
      const entradas = await this.entradaRepository.createQueryBuilder('entrada')
        .select('SUM(entrada.valor)', 'total')
        .where('entrada.fecha BETWEEN :start AND :end', { start: startDate, end: endDate })
        .andWhere('entrada.userid = :userid', { userid: user.id })
        .getRawOne();
  
      return {
        message: 'Total de entradas obtenido con éxito',
        data: entradas.total,
      }
    } catch (error) {
      return {
        message: 'Error al obtener el total de entradas',
        error: error.message,
      }
      
    }
  }

  //sumas salidas del mes actual
  async totalSalidasMesActual(user: User) {
    try {
      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();
  
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
  
      const salidas = await this.salidaRepository.createQueryBuilder('salida')
        .select('SUM(salida.valor)', 'total')
        .where('salida.fecha BETWEEN :start AND :end', { start: startDate, end: endDate })
        .andWhere('salida.userid = :userid', { userid: user.id })
        .getRawOne();
  
      return {
        message: 'Total de salidas obtenido con éxito',
        data: salidas.total,
      }
    } catch (error) {
      return {
        message: 'Error al obtener el total de salidas',
        error: error.message,
      }
      
    }
  }

  //sumas entradas del mes y año que se elija
  async totalEntradasHistorial(historialDto: HistorialDto, user: User) {
    try {
      const { mes, año } = historialDto;
      const startDate = new Date(año, mes - 1, 1);
      const endDate = new Date(año, mes , 0);

      const entradas = await this.entradaRepository.createQueryBuilder('entrada')
        .select('SUM(entrada.valor)', 'total')
        .where('entrada.fecha BETWEEN :start AND :end', { start: startDate, end: endDate })
        .andWhere('entrada.userid = :userid', { userid: user.id })
        .getRawOne();

      return {
        message: 'Total de entradas obtenido con éxito',
        data: entradas.total,
      }
    } catch (error) {
      return {
        message: 'Error al obtener el total de entradas',
        error: error.message,
      }
      
    }
  }

  //sumas salidas del mes y año que se elija
  async totalSalidasHistorial(historialDto: HistorialDto, user: User) {
    try {
      const { mes, año } = historialDto;
      const startDate = new Date(año, mes - 1, 1);
      const endDate = new Date(año, mes , 0);

      const salidas = await this.salidaRepository.createQueryBuilder('salida')
        .select('SUM(salida.valor)', 'total')
        .where('salida.fecha BETWEEN :start AND :end', { start: startDate, end: endDate })
        .andWhere('salida.userid = :userid', { userid: user.id })
        .getRawOne();

      return {
        message: 'Total de salidas obtenido con éxito',
        data: salidas.total,
      }
    } catch (error) {
      return {
        message: 'Error al obtener el total de salidas',
        error: error.message,
      }
      
    }
  }

  //trae todas las entradas y salidas del mes y año que se escoja
  async findAllEntradasHistorial(historialDto: HistorialDto, user: User) {
    try {
      const { mes, año } = historialDto;
      const startDate = new Date(año, mes - 1, 1);
      const endDate = new Date(año, mes , 0);

      const entradas = await this.entradaRepository.find({
        where: {
          fecha: Between(startDate, endDate),
          userid: Equal(user.id),
        }
      });

      const salidas = await this.salidaRepository.find({
        where: {
          fecha: Between(startDate, endDate),
          userid: Equal(user.id),
        },
      });

      return {
        message: 'Entradas obtenidas con éxito',
        entradas: entradas,
        salidas: salidas,
      }
    } catch (error) {
      return {
        message: 'Error al obtener las entradas',
        error: error.message,
      }
      
    }
  }

  //trae todos los registros que se elijan segun el año
  async findAllHistorialAnio(historialDto: HistorialDto, user: User) {
    try {
      const { año } = historialDto;
      const startDate = new Date(año, 0, 1);
      const endDate = new Date(año, 12, 0);

      const entradas = await this.entradaRepository.find({
        where: {
          fecha: Between(startDate, endDate),
          userid: Equal(user.id),
        }
      });

      const salidas = await this.salidaRepository.find({
        where: {
          fecha: Between(startDate, endDate),
          userid: Equal(user.id),
        },
      });

      return {
        message: 'Entradas obtenidas con éxito',
        entradas: entradas,
        salidas: salidas,
      }
    } catch (error) {
      return {
        message: 'Error al obtener las entradas',
        error: error.message,
      }
      
    }
  }

  //balance del año que se elija
  async sumhistorialAnio(historialDto: HistorialDto, user: User) {
    try {
      const { año } = historialDto;
      const startDate = new Date(año, 0, 1);
      const endDate = new Date(año, 12, 0);

      const entradas = await this.entradaRepository.createQueryBuilder('entrada')
        .select('SUM(entrada.valor)', 'total')
        .where('entrada.fecha BETWEEN :start AND :end', { start: startDate, end: endDate })
        .andWhere('entrada.userid = :userid', { userid: user.id })
        .getRawOne();

      const salidas = await this.salidaRepository.createQueryBuilder('salida')
        .select('SUM(salida.valor)', 'total')
        .where('salida.fecha BETWEEN :start AND :end', { start: startDate, end: endDate })
        .andWhere('salida.userid = :userid', { userid: user.id })
        .getRawOne();

      const total = entradas.total - salidas.total;

      return {
        message: 'Historial obtenido con éxito',
        data: {
          entradas: entradas.total,
          salidas: salidas.total,
          total,
        },
      }
    } catch (error) {
      return {
        message: 'Error al obtener el historial',
        error: error.message,
      }
      
    }
  }
}
