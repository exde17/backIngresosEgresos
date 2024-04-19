import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GastosFijosService } from './gastos-fijos.service';
import { CreateGastosFijoDto } from './dto/create-gastos-fijo.dto';
import { UpdateGastosFijoDto } from './dto/update-gastos-fijo.dto';

@Controller('gastos-fijos')
export class GastosFijosController {
  constructor(private readonly gastosFijosService: GastosFijosService) {}

  @Post()
  create(@Body() createGastosFijoDto: CreateGastosFijoDto) {
    return this.gastosFijosService.create(createGastosFijoDto);
  }

  @Get()
  findAll() {
    return this.gastosFijosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gastosFijosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGastosFijoDto: UpdateGastosFijoDto) {
    return this.gastosFijosService.update(+id, updateGastosFijoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gastosFijosService.remove(+id);
  }
}
