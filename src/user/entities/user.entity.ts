import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Entrada } from 'src/entradas/entities/entrada.entity';
import { Salida } from 'src/salidas/entities/salida.entity';
import { GastosFijo } from 'src/gastos-fijos/entities/gastos-fijo.entity';

@Entity({
  name: 'users',
  schema: 'security',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
    name: 'first_name',
  })
  firstName: string;

  @Column('text', {
    nullable: false,
    name: 'last_name',
  })
  lastName: string;

  @Column('text', {
    nullable: false,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column('text', {
    nullable: false,
    select: false,
  })
  @MinLength(8)
  password: string;

  @Column('bool', {
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  role: string[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  emailToLowerCaseOnUpdate() {
    this.emailToLowerCase();
  }

  @OneToMany(() => Entrada, (entrada) => entrada.userid)
  entradas: Entrada[];

  @OneToMany(() => Salida, (salida) => salida.userid)
  salidas: Salida[];

  @OneToMany(() => Entrada, (entrada) => entrada.userid)
  gastosFijos: GastosFijo;
}
