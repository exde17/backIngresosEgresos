import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

@ManyToOne(() => User, user => user.gastosFijos)
@JoinColumn({name: 'user_id'})
usuario: User;
}
