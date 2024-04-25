import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { GastosFijosService } from './gastos-fijos.service';
import { CreateGastosFijoDto } from './dto/create-gastos-fijo.dto';
import { UpdateGastosFijoDto } from './dto/update-gastos-fijo.dto';
import { Auth } from 'src/user/decorator';
import { ValidRoles } from 'src/user/interfaces';
import { GetUser } from '../user/decorator/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('gastos-fijos')
export class GastosFijosController {
  constructor(private readonly gastosFijosService: GastosFijosService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async create(
    @GetUser() user: User,
    @Body() createGastosFijoDto: CreateGastosFijoDto
  ) {
    return this.gastosFijosService.create(createGastosFijoDto, user);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async findAll() {
    return this.gastosFijosService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.gastosFijosService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateGastosFijoDto: UpdateGastosFijoDto) {
    return this.gastosFijosService.update(id, updateGastosFijoDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.gastosFijosService.remove(id);
  }
}
