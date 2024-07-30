import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { actualizarCliente, getCliente } from "../../api/clienteService";


function ClienteUpdate() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
      });

      useEffect(() => {
        getCliente(Number(id)).then(res => res.json()).then(data => setCliente(data))
      }, [id])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCliente({
          ...cliente,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        actualizarCliente(Number(id), cliente)
        .then(() => {
            alert("Cliente actualizado");
            navigate("/clientes");
        })
        .catch((err) => console.error(err));
      };


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
              value={cliente.nombre}
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
              value={cliente.apellido}
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
              value={cliente.email}
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
              value={cliente.telefono}
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

export default ClienteUpdate