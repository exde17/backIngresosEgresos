import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('entradas')
export class Entrada {

@PrimaryGeneratedColumn('uuid')
id: string;

@Column('text',{
    nullable: false,
})
nombre: string;

  @Column('timestamp', {
    nullable: false,
  })
  fecha: Date

@Column()
mes: string;

@Column()
año: string;

@Column('numeric',{
    nullable: false,
})
valor: number;

@CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createAt: Date

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updateAt: Date
}
