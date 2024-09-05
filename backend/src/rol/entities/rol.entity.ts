import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string
    @OneToMany(() => User, user => user.rol)
    users: User[];
}
