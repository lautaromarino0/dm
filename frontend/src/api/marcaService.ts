import { Marca } from "../interfaces/marca.interface"

const API = 'http://localhost:3000/api/marca'

export const createMarca = (marca: Marca) => 
    fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(marca)
    })

export const listarMarcas = () => fetch(API)

export const elimnarMarca = (id: number) =>
    fetch(`${API}/${id}`, {
        method: 'DELETE'
    })
