export interface Modelo {
    id_modelo:number
    nombre:string
    marca:number
}

export type CreateModeloDTO = Omit<Modelo, 'id_modelo'>;