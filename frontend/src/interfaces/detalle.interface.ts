export interface Detalle {
    id_detalle: number;
    id_tarea: number;
    precioManoObra?: number;
    precioRepuestos?: number;
}

export type DetalleCrear = Omit<Detalle, 'id_detalle'>;