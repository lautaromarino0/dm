import { useEffect, useState } from "react";
import { listarVehiculos } from "../../api/vehiculoService";
import { listarTareas } from "../../api/tareaService";
import { getEmpleados } from "../../api/empleadoService";
import { createTrabajo } from "../../api/trabajoService";
import toast, { Toaster } from 'react-hot-toast';


function TrabajoForm() {

    const [trabajo, setTrabajo] = useState({
        kilometraje: '',
        id_empleado: 0,
        id_vehiculo: 0,
        detalles: [{ id_tarea: 0, precioManoObra: 0, precioRepuestos: 0}]
    });
    const [empleados, setEmpleados] = useState([
        { id_empleado: 0, nombre: '' }  
    ]);
    const [vehiculos, setVehiculos] = useState([{
        id_vehiculo: 0,
        id_modelo: { nombre: '' },
        id_cliente: { nombre: '', apellido: '' }
    }]);
    const [tareas, setTareas] = useState([
        { id_tarea: 0, nombre: '' }
    ]);
    const [detalles, setDetalles] = useState([
        { id_tarea: 0, precioManoObra: 0, precioRepuestos: 0 }
    ]);
        
    useEffect(() => {
        getEmpleados().then(res => res.json()).then(data => setEmpleados(data));
        listarVehiculos().then(res => res.json()).then(data => setVehiculos(data));
        listarTareas().then(res => res.json()).then(data => setTareas(data));
        }, []
    )
    const agregarDetalle = () => {
        setDetalles([...detalles, { id_tarea: 0, precioManoObra: 0, precioRepuestos: 0 }]);
    };
    const enviarFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aquí puedes procesar los datos como prefieras, por ejemplo enviarlos a un servidor.W
        const trabajoPreparado = {
            ...trabajo,
            id_empleado: Number(trabajo.id_empleado),
            id_vehiculo: Number(trabajo.id_vehiculo),
            detalles: detalles
        };
        console.log(trabajoPreparado);
        const res = await createTrabajo(trabajoPreparado);
        console.log(res);
        toast.success('Orden de Trabajo Creada');
        setTimeout(() => {
            window.location.reload();
          }, 2000);
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;
        const isEmpleado = name === 'id_empleado';
        const isVehiculo = name === 'id_vehiculo';
        setTrabajo({ ...trabajo, [name]: isEmpleado || isVehiculo? Number(value) : value });
    }

    const manejarCambio = (index:number, e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;
        const nuevosDetalles = [...detalles];
        if(name === 'id_tarea'){
            nuevosDetalles[index].id_tarea = Number(value);
        } else if(name === 'precioManoObra'){   
            nuevosDetalles[index].precioManoObra = Number(value);
        } else if(name === 'precioRepuestos'){
            nuevosDetalles[index].precioRepuestos = Number(value);
        }
        setDetalles(nuevosDetalles);
    };

    const elimnarDetalle = () => {
        const nuevosDetalles = [...detalles];
        if(nuevosDetalles.length === 1){
            return;
        }
        nuevosDetalles.pop();
        setDetalles(nuevosDetalles);
    }


  return (
    <div>
        <Toaster />
        <h2 className="text-center text-white text-2xl font-bold mb-4 ">Registrar Orden de Trabajo</h2>
        <form onSubmit={enviarFormulario}>
            <input type="text" name="kilometraje" className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" placeholder="Kilometros" onChange={handleChange} />
            <select name="id_empleado" onChange={handleChange} className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2">
                <option value="">Seleccione un Empleado</option>
                {empleados.map((empleado) => (
                    <option key={empleado.id_empleado} value={empleado.id_empleado}>
                        {empleado.nombre}
                    </option>
                ))}
            </select>
            <select name="id_vehiculo" onChange={handleChange} className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2">
                <option value="">Seleccione un Vehiculo</option>
                {vehiculos.map((vehiculo) => (
                    <option key={vehiculo.id_vehiculo} value={vehiculo.id_vehiculo}>
                        {vehiculo.id_modelo.nombre} - {vehiculo.id_cliente.nombre} {vehiculo.id_cliente.apellido}
                    </option>
                ))}
            </select>
            <div className="flex">
                <div className="w-1/3">
                    <label className="block text-white">Tareas:</label>
                </div>
                <div className="w-1/3">
                    <label className="block text-white">Precio de Mano de Obra:</label>
                </div>
                <div className="w-1/3">
                    <label className="block text-white">Precio de Repuestos:</label>
                </div>
            </div>
            {detalles.map((detalle, index) => (
                    <div key={index}>
                    <select name="id_tarea" onChange={(e) => manejarCambio(index, e)} id="id_tarea" className="border-2 border-gray-700 p-2 rounded-lg bg-gray-800 my-2 w-1/3">
                        <option value="">Seleccione una Tarea</option>
                        {tareas.map((tarea) => (
                            <option key={tarea.id_tarea} value={tarea.id_tarea}>
                                {tarea.nombre}
                            </option>
                        ))}
                    </select>
                    
                    <input
                        type="number"
                        name="precioManoObra"
                        value={detalle.precioManoObra}
                        onChange={(e) => manejarCambio(index, e)}
                        className="bg-gray-800 p-2 rounded-lg w-1/3"
                    />
                    
                    <input
                        type="number"
                        name="precioRepuestos"
                        value={detalle.precioRepuestos}
                        onChange={(e) => manejarCambio(index, e)}
                        className="bg-gray-800 p-2 rounded-lg w-1/3"
                    />
                    </div>
                ))}
                <div>
                <button type="button" onClick={agregarDetalle} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-4">
                    Agregar Tarea
                </button>
                {detalles.length > 1 && (
                    <button type="button" onClick={elimnarDetalle} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mb-4">
                        Eliminar Tarea
                    </button>
                )}
                </div>
                
            <button type="submit" className="bg-indigo-500 px-3 w-full block py-2 rounded-lg hover:bg-blue-800">Guardar</button>
        </form>
    </div>
);
}

export default TrabajoForm