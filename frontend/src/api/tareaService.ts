import { TareaCrearDTO } from "../interfaces/tarea.interface"

const API = 'http://localhost:3000/api/tarea'

export const createTarea = (tarea: TareaCrearDTO) => 
    fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarea)
    })

export const listarTareas = () => fetch(API)

export const listarTarea = (id: number) => fetch(`${API}/${id}`)

export const eliminarTarea = (id: number) => 
    fetch(`${API}/${id}`, {
        method: 'DELETE'
    })

export const actualizarTarea = (id: number,tarea: TareaCrearDTO) =>
    fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarea)
})