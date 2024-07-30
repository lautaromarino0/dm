import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { completarTrabajo, getTrabajo, updateTrabajo } from "../../api/trabajoService";
import { listarTareas } from "../../api/tareaService";
import { getEmpleados } from "../../api/empleadoService";


function TrabajoUpdate() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [trabajoMostrar, setTrabajoMostrar] = useState({
        id_trabajo: 0,
        kilometraje: '',
        id_empleado: {nombre :'', id_empleado:0},
        id_vehiculo: {id_modelo: {nombre: ''}, id_cliente: {nombre: '', apellido: ''}, id_vehiculo: 0},
        detalles: [{id_detalle:0,id_tarea: {nombre: ''}, precioManoObra: 0, precioRepuestos: 0}],
        id_estado: {nombre: '',id_estado: 0} ,
        fechaIngreso: new Date(),   
    })

    const [detalles, setDetalles] = useState([
        { id_tarea: 0, precioManoObra: 0, precioRepuestos: 0 }
    ]);
    const [detallesMostrar, setDetallesMostrar] = useState([
        {id_tarea: {id_tarea: 0, nombre :''}, precioManoObra: 0, precioRepuestos: 0, id_detalle:0}
    ])
    const [tareas, setTareas] = useState([
        { id_tarea: 0, nombre: '' }
    ]);
    const [empleados, setEmpleados] = useState([
        { id_empleado: 0, nombre: '' }  
    ]);

    useEffect(() => {
        getTrabajo(Number(id)).then(res => res.json()).then(data => {
            setTrabajoMostrar(data)
            setDetalles(data.detalles)
            setDetallesMostrar(data.detalles)
        })
        listarTareas().then(res => res.json()).then(data => setTareas(data))
        getEmpleados().then(res => res.json()).then(data => setEmpleados(data));
    }, [id, trabajoMostrar.id_estado.nombre])
    const handleChange = (e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;
        const isEmpleado = name === 'id_empleado';
        setTrabajoMostrar({ ...trabajoMostrar, [name]: isEmpleado ? {nombre: value, id_empleado: Number(value)} : value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nuevosDetalles = detallesMostrar.map((detalle) => {
            return {
                ...detalle,
                id_tarea: detalle.id_tarea.id_tarea,
            };
        });
        const trabajoPreparado = {
            detalles: nuevosDetalles,
            id_empleado: Number(trabajoMostrar.id_empleado.id_empleado),
            id_vehiculo: Number(trabajoMostrar.id_vehiculo.id_vehiculo),
            kilometraje: trabajoMostrar.kilometraje,
        };
        console.log(trabajoPreparado);
        updateTrabajo(Number(id), trabajoPreparado)
        .then(() => {
            alert('Trabajo actualizado');
            navigate('/trabajos');
        })
        .catch((err) => console.error(err));
    }
    const manejarCambio = (index:number, e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;
        const nuevosDetalles = [...detallesMostrar];
        if(name === 'id_tarea'){
            nuevosDetalles[index].id_tarea.id_tarea = Number(value);
        } else if(name === 'precioManoObra'){   
            nuevosDetalles[index].precioManoObra = Number(value);
        } else if(name === 'precioRepuestos'){
            nuevosDetalles[index].precioRepuestos = Number(value);
        }
        const detallesPreparados = nuevosDetalles.map((detalle) => ({
            id_detalle: detalle.id_detalle,
            id_tarea: detalle.id_tarea,
            precioManoObra: detalle.precioManoObra,
            precioRepuestos: detalle.precioRepuestos
        }));
        setDetallesMostrar(detallesPreparados);
    };
    const elimnarDetalle = () => {
        if(trabajoMostrar.id_estado.nombre === 'Pendiente'){
        const nuevosDetalles = [...detallesMostrar];
        if(nuevosDetalles.length === 1){
            return;
        }
        nuevosDetalles.pop();
        setDetallesMostrar(nuevosDetalles);
        } else {
        alert('No puedes eliminar tareas de un trabajo completado')
        }
    }
    const agregarDetalle = () => {
        if(trabajoMostrar.id_estado.nombre === 'Pendiente'){
        setDetallesMostrar([...detallesMostrar, { id_tarea: {id_tarea:0,nombre:''}, precioManoObra: 0, precioRepuestos: 0,id_detalle:0 }]);
        } else {
        alert('No puedes agregar tareas a un trabajo completado')
        }
    };

    const completar = () => {
        if(!window.confirm('¿Estás seguro de completar el trabajo?')) return
        completarTrabajo(Number(id))
        .then(() => {
            alert('Trabajo completado')
            window.location.reload()
        })
        .catch(err => console.error(err))
    }

    const cobrar = () => {
        if(!window.confirm('¿Estás seguro de cobrar el trabajo?')) return
        window.location.href = `/trabajos/${id}/cobrar`;
    }

    const pagar = () => {
        if(!window.confirm('¿Estás seguro de pagar el trabajo?')) return;
        const id_empleado = trabajoMostrar.id_empleado.id_empleado;
        window.location.href = `/empleados/${id_empleado}/pagar`;
    }
    

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-start pt-10">
    <div className="w-3/4 md:w-1/2 lg:w-3/4 bg-gray-950 shadow-md rounded-md p-6 text-white mt-4">
    <form onSubmit={handleSubmit}>
        <div className="">
        <h2 className="text-center text-white text-2xl font-bold mb-4 ">Información del Trabajo</h2>
        
        {/* Mostrar información del vehículo que no se puede editar */}
        <div>
            <p className="text-white text-xl">Vehículo: {trabajoMostrar.id_vehiculo.id_modelo.nombre}</p>
            <p className="text-white text-xl">Fecha de Ingreso: {trabajoMostrar.fechaIngreso.toString().substring(0,10)}</p>
            <p className="text-white text-xl">Cliente: {trabajoMostrar.id_vehiculo.id_cliente.nombre + ' ' + trabajoMostrar.id_vehiculo.id_cliente.apellido}</p>
        </div>
        </div>
        
        {/* Campos editables para detalles y kilometraje */}
        <label className="text-white text-xl" htmlFor="">Empleado:</label>
        <select name="id_empleado" onChange={handleChange} className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" value={trabajoMostrar.id_empleado.id_empleado}
        disabled={trabajoMostrar.id_estado.nombre !== 'Pendiente'}
        >
                {empleados.map((empleado) => (
                    <option key={empleado.id_empleado} value={empleado.id_empleado}>
                        {empleado.nombre}
                    </option>
                ))}
            </select>
        <label className="text-white text-xl" htmlFor="">Kilometraje:</label>
        <input type="text" name="kilometraje" className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" placeholder="Kilometros" value={trabajoMostrar.kilometraje} onChange={handleChange} disabled={trabajoMostrar.id_estado.nombre !== 'Pendiente'} />

        <div>
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
        {detallesMostrar.map((detalle, index) => (
                    <div key={index}>
                    <select name="id_tarea"
                    onChange={(e) => manejarCambio(index, e)}
                    id="id_tarea"
                    value={detalle.id_tarea.id_tarea}
                    className="border-2 border-gray-700 p-2 rounded-lg bg-gray-800 my-2 w-1/3"
                    disabled={trabajoMostrar.id_estado.nombre !== 'Pendiente'}>
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
                        disabled={trabajoMostrar.id_estado.nombre !== 'Pendiente' && trabajoMostrar.id_estado.nombre !== 'Completado'}
                    />
                    
                    <input
                        type="number"
                        name="precioRepuestos"
                        value={detalle.precioRepuestos}
                        onChange={(e) => manejarCambio(index, e)}
                        className="bg-gray-800 p-2 rounded-lg w-1/3"
                        disabled={trabajoMostrar.id_estado.nombre !== 'Pendiente' && trabajoMostrar.id_estado.nombre !== 'Completado'}
                    />
                    </div>
                ))}
        </div>
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
        <div>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-5" type="submit">Actualizar Trabajo</button>
            {trabajoMostrar.id_estado.nombre === 'Pendiente' && (
                <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600" type="button"
                onClick={() => completar()}
                >
                Completar
                </button>
            )}
            {trabajoMostrar.id_estado.nombre === 'Completado' && (
                <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600" type="button"
                onClick={() => cobrar()}
                >
                Cobrar
                </button>
            )}
            {trabajoMostrar.id_estado.nombre === 'Cobrado' && (
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" type="button"
                onClick={() => pagar()}
                >
                Pagar
                </button>
            )}
        </div>
        
    </form>
    </div>
    </div>
);
}

export default TrabajoUpdate