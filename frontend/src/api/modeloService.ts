import { CreateModeloDTO } from "../interfaces/modelo.interface";

const API = 'http://localhost:3000/api/modelo';

export const createModelo = async (modelo: CreateModeloDTO) => {
    return await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(modelo)
    })
}

export const getModelos = async () => {
    return await fetch(API)
}

export const getModelo = async (id: number) => {
    return await fetch(`${API}/${id}`)
}

export const deleteModelo = async (id: number) => {
    return await fetch(`${API}/${id}`, {
        method: 'DELETE'
    })
}