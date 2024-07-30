import { FormEvent, useState } from "react";
import { createEmpleado } from "../../api/empleadoService";


function EmpleadoForm() {

    const [empleado, setEmpleado] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: ''
    });

    const handleChange =  (e: FormEvent<HTMLInputElement>) => {
        setEmpleado({...empleado, [e.currentTarget.name]: e.currentTarget.value})
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await createEmpleado(empleado)
        const data = await res.json()
        console.log(data)
        alert('Empleado Registrado')
        window.location.reload()
    }

  return (
    <div>
        <h2 className="text-center text-white text-2xl font-bold mb-4 ">Registrar Empleado</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" placeholder="Nombre" onChange={handleChange}/>
            <input type="text" name="apellido" className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" placeholder="Apellido" onChange={handleChange}/>
            <input type="text" name="telefono" className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" placeholder="Telefono" onChange={handleChange}/>
            <input type="text" name="email" className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" placeholder="Email" onChange={handleChange}/>
            <button type="submit" className="bg-indigo-500 px-3 w-full block py-2 rounded-lg hover:bg-blue-800">Guardar</button>
        </form>
    </div>
  )
}

export default EmpleadoForm