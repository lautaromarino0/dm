
import {  TrabajoCrear } from "../interfaces/trabajo.interface";     

const API = 'http://localhost:3000/api/trabajo';

export const getTrabajos = () => fetch(API)

export const getTrabajo = (id: number) => fetch(`${API}/${id}`)

export const createTrabajo = async (trabajo: TrabajoCrear) => {
    const response = await fetch(API, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(trabajo),
    });
    return await response.json();
    }

export const updateTrabajo = async (id: number, trabajo: TrabajoCrear) => {
    const response = await fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(trabajo),
    });
    return await response.json();
    }

export const deleteTrabajo = async (id: number) => {
    const response = await fetch(`${API}/${id}`, {
        method: 'DELETE',
    });
    return response;
    }

export const getTrabajosPorEstado = (estado: string) => fetch(`${API}/estado/${estado}`)
export const getTrabajosPorEmpleado = (id: number) => fetch(`${API}/empleado/${id}`)
export const getTrabajosPorVehiculo = (id: number) => fetch(`${API}/vehiculo/${id}`)

export const completarTrabajo = async (id: number) => {
    const response = await fetch(`${API}/${id}/completar`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    return await response.json();
    }

export const cobrarTrabajo = async (id: number) => {
    const response = await fetch(`${API}/${id}/cobrar`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    return await response.json();
    }

export const entregarTrabajo = async (id: number,monto:number) => {
    const response = await fetch(`${API}/${id}/entregar`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({monto:monto}),
    });
    return await response.json();
    }

export const pagarTrabajo = async (id: number) => {
    const response = await fetch(`${API}/${id}/pagar`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    return await response.json();
    }