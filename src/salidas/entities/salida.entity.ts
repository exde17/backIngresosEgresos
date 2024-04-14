import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('salidas')
export class Salida {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        nullable: false,
    })
    nombre: string;

    // @Column('timestamp', {
    //     nullable: false,
    //   })
    //   fecha: Date
    @CreateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
      // name: 'fecha_creacion',
    })
    fecha: Date
    
    // @Column('text',{
    //     nullable: true
    // })
    // mes: string;
    
    // @Column('text',{
    //     nullable: true
    // })
    // año: string;
    
    @Column('numeric',{
        nullable: false,
    })
    valor: number;

    // @CreateDateColumn({
    //     type: 'timestamptz',
    //     default: () => 'CURRENT_TIMESTAMP',
    //     name: 'created_at',
    //   })
    //   createAt: Date
    
      @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
      })
      updateAt: Date
    
      @ManyToOne(() => User, user => user.salidas)
        userid: User;

}
