import { Rol } from "src/rol/entities/rol.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    email: string;
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
    @ManyToOne(() => Rol, rol => rol.users)
    rol : Rol
}
