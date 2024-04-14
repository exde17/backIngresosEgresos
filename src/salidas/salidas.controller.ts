import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { SalidasService } from './salidas.service';
import { CreateSalidaDto } from './dto/create-salida.dto';
import { UpdateSalidaDto } from './dto/update-salida.dto';
import { Auth, GetUser } from 'src/user/decorator';
import { ValidRoles } from 'src/user/interfaces';
import { User } from 'src/user/entities/user.entity';

@Controller('salidas')
export class SalidasController {
  constructor(private readonly salidasService: SalidasService) {} 

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async create(
    @Body() createSalidaDto: CreateSalidaDto,
    @GetUser() user: User
    ) {
    return this.salidasService.create(createSalidaDto,user);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async findAll() {
    return this.salidasService.findAll();
  }

  //traer todas las salidas de un usuario y un mes en especifico
  @Get('findAllMesActual')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async totalEntradas(
    @GetUser() user: User
  ) {
    return this.salidasService.findAllSalidaMesActual(user);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.salidasService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSalidaDto: UpdateSalidaDto) {
    return this.salidasService.update(id, updateSalidaDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.salidasService.remove(id);
  }
}
