export interface Pago{
    id_pago: number;
    fechaPago: Date;
    monto: number;
    id_empleado: number;
    trabajos: number[];    
}

export type PagoDTO = Omit<Pago, 'id_pago'| 'fechaPago'>;

export interface PagoDetail {
    id_pago: number;
    fechaPago: Date;
    monto: number;
    id_empleado: {nombre: string, apellido: string};
    trabajos: number[];    
}