import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { actualizarEmpleado, getEmpleado } from '../../api/empleadoService';

function EmpleadoUpdate() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [empleado, setEmpleado] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: ''
    });

    useEffect(() => {
         getEmpleado(Number(id)).then(res => res.json()).then(data => setEmpleado(data))
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmpleado({
            ...empleado,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        actualizarEmpleado(Number(id), empleado)
        .then(() => {
            alert('Empleado actualizado');
            navigate('/empleados');
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
              value={empleado.nombre}
              onChange={handleChange}
              className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Apellido:</label>
            <input
              type="text"
              name="apellido"
              value={empleado.apellido}
              onChange={handleChange}
              className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Email:</label>
            <input 
              type="email"
              name="email"
              value={empleado.email}
              onChange={handleChange}
              className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Teléfono:</label>
            <input
              type="tel"
              name="telefono"
              value={empleado.telefono}
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

export default EmpleadoUpdate