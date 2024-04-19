import { PartialType } from '@nestjs/mapped-types';
import { CreateGastosFijoDto } from './create-gastos-fijo.dto';

export class UpdateGastosFijoDto extends PartialType(CreateGastosFijoDto) {}
