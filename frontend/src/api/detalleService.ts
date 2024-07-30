import { DetalleCrear } from "../interfaces/detalle.interface";

const API = 'http://localhost:3000/api/detalle-trabajo';

export const listarDetalles = async () => {
    return await fetch(API);
}

export const crearDetalle = async (detalle: DetalleCrear) => {
    return await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(detalle)
    });
}

export const eliminarDetalle = async (id: number) => {
    return await fetch(`${API}/${id}`, {
        method: 'DELETE'
    });
}

export const listarDetalle = async (id: number) => {
    return await fetch(`${API}/${id}`);
}

export const actualizarDetalle = async (detalle: DetalleCrear, id: number) => {
    return await fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(detalle)
    });
}