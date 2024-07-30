import { useState } from "react";
import { createMarca } from "../../api/marcaService";

function MarcaForm() {

    const [marca, setMarca] = useState({
        nombre: ''
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await createMarca(marca)
        const data = await res.json()
        console.log(data)
        alert('Marca Registrada')
    }
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setMarca({...marca, [e.currentTarget.name]: e.currentTarget.value})
    }

  return (
    <div className="bg-zinc-900 h-screen text-white flex items-center justify-center">
        <div className="bg-gray-950 p-4 w-2/5 rounded-md">
            <h2 className="text-center text-white text-2xl font-bold mb-4 ">Registrar Marca</h2>
            <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" placeholder="Nombre" onChange={handleChange}/>
            <button type="submit" className="bg-indigo-500 px-3 w-full block py-2 rounded-lg hover:bg-blue-800">Guardar</button>
            </form>
        </div>
    </div>
  )
}

export default MarcaForm