import { Injectable } from '@nestjs/common';
import { CreateGastosFijoDto } from './dto/create-gastos-fijo.dto';
import { UpdateGastosFijoDto } from './dto/update-gastos-fijo.dto';

@Injectable()
export class GastosFijosService {
  create(createGastosFijoDto: CreateGastosFijoDto) {
    return 'This action adds a new gastosFijo';
  }

  findAll() {
    return `This action returns all gastosFijos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gastosFijo`;
  }

  update(id: number, updateGastosFijoDto: UpdateGastosFijoDto) {
    return `This action updates a #${id} gastosFijo`;
  }

  remove(id: number) {
    return `This action removes a #${id} gastosFijo`;
  }
}
