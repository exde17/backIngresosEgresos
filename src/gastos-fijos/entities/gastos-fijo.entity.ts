import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('gastos-fijos')
export class GastosFijo {
    @PrimaryGeneratedColumn('uuid')
id: string;

@Column('text',{
    nullable: false,
})
nombre: string;

@Column('numeric',{
    nullable: false,
})
valor: number;
}
