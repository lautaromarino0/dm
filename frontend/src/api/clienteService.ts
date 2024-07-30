import { ClienteDTO } from "../interfaces/cliente.interface"

const API = 'http://localhost:3000/api/cliente'

export const createCliente = (cliente: ClienteDTO) => 
    fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })

export const listarClientes = () => fetch(API)

export const eliminarCliente = (id: number) => 
    fetch(`${API}/${id}`, {
        method: 'DELETE'
    })

export const actualizarCliente = (id: number,cliente: ClienteDTO) =>
    fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })

export const getCliente = (id: number) => fetch(`${API}/${id}`)