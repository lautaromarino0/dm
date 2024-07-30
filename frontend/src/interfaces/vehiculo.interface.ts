export interface Vehiculo {
    id_vehiculo :number;
    año : number;
    patente : string
    fechaIngreso : Date;
    id_modelo : number;
    id_cliente : number;
}
export interface VehiculoMostrar {
    id_vehiculo :number;
    año : number;
    patente : string
    fechaIngreso : Date;
    id_modelo : {id_modelo : number, nombre: string};
    id_cliente : {id_cliente : number, nombre: string, apellido: string};
}
export type VehiculoDto = Omit<Vehiculo, 'id_vehiculo'| 'fechaIngreso' | 'id_cliente' | 'id_modelo'>;
export type ClienteDTOEdit = Partial<VehiculoDto>