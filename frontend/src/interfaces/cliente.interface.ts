export interface Cliente{
    id_cliente: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    fechaIngreso: Date;
}

export type ClienteDTO = Omit<Cliente, 'id_cliente'| 'fechaIngreso'>;
export type ClienteDTOEdit = Partial<ClienteDTO>