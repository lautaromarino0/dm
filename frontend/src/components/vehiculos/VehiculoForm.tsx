import { FormEvent, useEffect, useState } from "react";
import { createVehiculo } from "../../api/vehiculoService";
import { listarClientes } from "../../api/clienteService";
import { getModelos } from "../../api/modeloService";
import { Cliente } from "../../interfaces/cliente.interface";
import { Modelo } from "../../interfaces/modelo.interface";


function VehiculoForm() {

    const [vehiculo, setVehiculo] = useState({
        año: 0,
        patente: '',
        id_modelo: 0,
        id_cliente:0
    });

    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        listarClientes().then(res => res.json()).then(data => setClientes(data));
    }, []);

    useEffect(() => {
        getModelos().then(res => res.json()).then(data => setModelos(data));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setVehiculo({ ...vehiculo,[name]: ['id_cliente', 'id_modelo','año'].includes(name) ? Number(value) : value});
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(vehiculo);
        const res = await createVehiculo(vehiculo);
        const data = await res.json();
        console.log(data);
        alert('Vehiculo Registrado');
        window.location.reload();
    };  

  return (
    <div>
        <h2 className="text-center text-white text-2xl font-bold mb-4 ">Registrar Vehiculo</h2>
        <form onSubmit={handleSubmit}>
                <select name="id_modelo" onChange={handleChange} className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2">
                    <option value="">Seleccione una Modelo</option>
                    {modelos.map((modelo) => (
                        <option key={modelo.id_modelo} value={modelo.id_modelo}>
                            {modelo.nombre}
                        </option>
                    ))}
                </select>
                <select name="id_cliente" onChange={handleChange} className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2">
                    <option value="">Seleccione un Cliente</option>
                    {clientes.map((cliente) => (
                        <option key={cliente.id_cliente} value={cliente.id_cliente}>
                            {cliente.nombre}
                        </option>
                    ))}
                </select>
            <input type="text" name="año" className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" placeholder="Año" onChange={handleChange}/>
            <input type="text" name="patente" className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" placeholder="Patente" onChange={handleChange}/>
            <button type="submit" className="bg-indigo-500 px-3 w-full block py-2 rounded-lg hover:bg-blue-800">Guardar</button>
        </form>
    </div>
  )
}

export default VehiculoForm