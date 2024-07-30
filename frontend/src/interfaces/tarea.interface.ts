export interface Tarea {
    id_tarea:number
    nombre:string
    descripcion?:string
}

export type TareaCrearDTO = Omit<Tarea, 'id_tarea'>;
