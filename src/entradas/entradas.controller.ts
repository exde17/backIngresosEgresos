import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { EntradasService } from './entradas.service';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
import { ValidRoles } from 'src/user/interfaces';
import { Auth } from 'src/user/decorator';

@Controller('entradas')
export class EntradasController {
  constructor(private readonly entradasService: EntradasService) {}

  @Get('total')
  async total() {
    return this.entradasService.total();
  }

  @Post()
  // @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async create(@Body() createEntradaDto: CreateEntradaDto) {
    return this.entradasService.create(createEntradaDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async findAll() {
    return this.entradasService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.entradasService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEntradaDto: UpdateEntradaDto) {
    return this.entradasService.update(id, updateEntradaDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.entradasService.remove(id);
  }

  
}
