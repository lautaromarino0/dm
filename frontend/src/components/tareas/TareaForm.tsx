import React from 'react'
import { createTarea } from '../../api/tareaService';

function TareaForm() {

    const [tarea, setTarea] = React.useState({
        nombre: '',
        descripcion: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTarea({...tarea, [e.currentTarget.name]: e.currentTarget.value})
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await createTarea(tarea)
        const data = await res.json()
        console.log(data)
        alert('Tarea Registrada')
        window.location.reload()
    }

  return (
    <div>
        <h2 className="text-center text-white text-2xl font-bold mb-4 ">Registrar Tarea</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" placeholder="Nombre" onChange={handleChange}/>
            <input type="descripcion" name="descripcion" className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" placeholder="Descripcion" onChange={handleChange}/>
            <button type="submit" className="bg-indigo-500 px-3 w-full block py-2 rounded-lg hover:bg-blue-800">Guardar</button>
        </form>
    </div>
  )
}

export default TareaForm