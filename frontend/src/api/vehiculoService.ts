import {  VehiculoDto } from "../interfaces/vehiculo.interface";

const API = 'http://localhost:3000/api/vehiculo';

export const createVehiculo = async (vehiculo: VehiculoDto) => {
    return await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehiculo)
    })
}

export const listarVehiculos = () => fetch(API)

export const obtenerVehiculo = (id: number) => fetch(`${API}/${id}`)

export const elimnarVehiculo = (id: number) =>
    fetch(`${API}/${id}`, {
        method: 'DELETE'
    })

export const actualizarVehiculo = (id: number, vehiculo: VehiculoDto) =>
    fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehiculo)
    })

export const obtenerHistorialTrabajos = (id: number) => fetch(`${API}/${id}/historial`)