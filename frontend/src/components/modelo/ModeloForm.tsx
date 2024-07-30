import React, { useState, useEffect } from 'react';
import { createModelo } from '../../api/modeloService';
import { listarMarcas } from '../../api/marcaService';
import { Marca } from '../../interfaces/marca.interface';

const ModeloForm = () => {
    const [modelo, setModelo] = useState({ nombre: '',marca: 0 });
    const [marcas, setMarcas] = useState<Marca[]>([]);

    useEffect(() => {
        listarMarcas().then(res => res.json()).then(data => setMarcas(data))}, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const modeloPreparado = {
            ...modelo,
            marca: Number(modelo.marca)
        };
        const res = await createModelo(modeloPreparado);
        const data = await res.json();
        console.log(data);
        alert('Modelo Registrado')
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;
        const isMarca = name === 'marca';
        setModelo({ ...modelo, [name]: isMarca ? Number(value) : value });
    };

    return (
        <div className="bg-zinc-900 h-screen text-white flex items-center justify-center">
            <div className="bg-gray-950 p-4 w-2/5 rounded-md">
                <h2 className="text-center text-white text-2xl font-bold mb-4 ">Registrar Modelo</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="nombre" className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" placeholder="Nombre" onChange={handleChange} />
                    <select name="marca" onChange={handleChange} className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2">
                        <option value="">Seleccione una marca</option>
                        {marcas.map((marca) => (
                            <option key={marca.id_marca} value={marca.id_marca}>
                                {marca.nombre}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="bg-indigo-500 px-3 w-full block py-2 rounded-lg hover:bg-blue-800">Guardar</button>
                </form>
            </div>
        </div>
    );
};

export default ModeloForm;