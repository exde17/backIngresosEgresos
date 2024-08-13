import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { EntradasService } from './entradas.service';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
import { ValidRoles } from 'src/user/interfaces';
import { Auth, GetUser } from 'src/user/decorator';
import { HistorialDto } from './dto/historial.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('entradas')
export class EntradasController {
  constructor(private readonly entradasService: EntradasService) {}

  //el balance del mes actual
  @Get('total')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async total(
    @GetUser() user: User
  ) {
    return this.entradasService.total(user);
  }

  //sumas salidas del mes y año que se elija--------------------------------------------------
  @Post('totalSalidasHistorial')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async totalSalidasHistorial(
    @Body() historialDto: HistorialDto,
    @GetUser() user: User
  ) {
    return this.entradasService.totalSalidasHistorial(historialDto,user);
  }
  //-------------------------------------------------------------------------------------------


  //sumas salidas del mes actual
  @Get('totalSalidasMesActual')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async totalSalidas(
    @GetUser() user: User
  ) {
    return this.entradasService.totalSalidasMesActual(user);
  }

  //sumas entradas del mes y año que se elija/////////////////////////------------------------------------------
  @Post('totalEntradasHistorial')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async totalEntradasHistorial(
    @Body() historialDto: HistorialDto,
    @GetUser() user: User
  ) {
    return this.entradasService.totalEntradasHistorial(historialDto,user);
  }

  //------------------------------------------------------------------------------------------------------

  //el balance del mes y año que se elija
  @Post('historial')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async historial(
    @Body() historialDto: HistorialDto,
    @GetUser() user: User
    ){
    return this.entradasService.historial(historialDto,user);
  }

  //el balance del año que se elija
  @Post('sumhistorialAnio')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async sumhistorialAnio(
    @Body() historialDto: HistorialDto,
    @GetUser() user: User
    ){
    return this.entradasService.sumhistorialAnio(historialDto,user);
  }

  //sumas entradas del mes actual
  @Get('totalEntradasMesActual')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async totalEntradas(
    @GetUser() user: User
  ) {
    return this.entradasService.totalEntradasMesActual(user);
  }

  //trae todas las entradas del mes actual
  @Get('findAllMesActual')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async findAllMesActual(
    @GetUser() user: User
  ) {
    return this.entradasService.findAllMesActual(user);
  }

  //trae todas los registros que se elijan segun el año y el mes
  @Post('findAllEntrasHistorial')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async findAllEntradasHistorial(
    @Body() historialDto: HistorialDto,
    @GetUser() user: User
  ){
    return this.entradasService.findAllEntradasHistorial(historialDto,user);
  }

  //trae todos los registros que se elijan segun el año
  @Post('findAllHistorialAnio')
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async findAllEntradasHistorialAnio(
    @Body() historialDto: HistorialDto,
    @GetUser() user: User
  ){
    return this.entradasService.findAllHistorialAnio(historialDto,user);
  }


  
  @Post()
  @Auth(ValidRoles.admin, ValidRoles.user, ValidRoles.superUser)
  async create(
    @Body() createEntradaDto: CreateEntradaDto,
    @GetUser() user: User
    ) {
      // console.log(user.id)
    return this.entradasService.create(createEntradaDto,user);
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
