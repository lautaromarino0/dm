export interface Empleado {
    id_empleado: number
    nombre: string
    apellido: string
    email: string
    telefono: string
}

export type EmpleadoCrear = Omit<Empleado, 'id_empleado'>;