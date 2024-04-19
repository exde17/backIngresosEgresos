import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('entradas')
export class Entrada {

@PrimaryGeneratedColumn('uuid')
id: string;

@Column('text',{
    nullable: false,
})
nombre: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    // name: 'fecha_creacion',
  })
  fecha: Date

@Column('numeric',{
    nullable: false,
})
valor: number;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updateAt: Date

  @ManyToOne(() => User, user => user.entradas)
  userid: User;
}
