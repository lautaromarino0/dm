export interface Trabajo {
    id_trabajo: number;
    kilometraje: string;
    id_empleado: number;
    id_vehiculo: number;
    detalles: {id_detalle:number,id_tarea: number, precioManoObra: number, precioRepuestos: number}[];
}

export interface TrabajoMostrar{
    id_trabajo: number;
    kilometraje: string;
    id_empleado: {nombre :string}
    id_vehiculo: {id_modelo: {nombre: string}, id_cliente: {nombre: string, apellido: string},}
    detalles: {id_detalle:number,id_tarea: {nombre: string}, precioManoObra: number, precioRepuestos: number}[];
    id_estado: {nombre: string,id_estado: number};
}

export interface TrabajoCrear {
    kilometraje: string;
    id_empleado: number;
    id_vehiculo: number;
    detalles: {id_tarea: number, precioManoObra: number, precioRepuestos: number}[];
}
