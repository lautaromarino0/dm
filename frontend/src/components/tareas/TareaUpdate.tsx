import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { actualizarTarea, listarTarea } from '../../api/tareaService';

function TareaUpdate() {

    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [tarea, setTarea] = useState({
        nombre: '',
        descripcion: ''
    });

    useEffect(() => {
        listarTarea(Number(id)).then(res => res.json()).then(data => setTarea(data))
    }   , [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        actualizarTarea(Number(id), tarea)
        .then(() => {
            alert('Tarea actualizada');
            navigate('/tareas');
        })
        .catch((err) => console.error(err));
    }

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-start pt-10">
      <div className="w-3/4 md:w-1/2 lg:w-1/3 bg-gray-950 shadow-md rounded-md p-6 text-white mt-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Actualizar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={tarea.nombre}
              onChange={handleChange}
              className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Descripcion:</label>
            <input
              type="text"
              name="descripcion"
              value={tarea.descripcion}
              onChange={handleChange}
              className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
}


export default TareaUpdate