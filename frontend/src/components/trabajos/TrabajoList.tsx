import { useEffect, useState } from "react";
import { TrabajoMostrar } from "../../interfaces/trabajo.interface";
import { getTrabajos } from "../../api/trabajoService";
import TrabajoItem from "./TrabajoItem";
import { getEstados } from "../../api/estadosService";


function TrabajoList() {

    const [trabajos, setTrabajos] = useState<TrabajoMostrar[]>([]);
    const [busqueda, setBusqueda] = useState('');
    const [estados, setEstados] = useState([
        { id_estado: 0, nombre: '' }
    ]);

    useEffect(() => {
        getTrabajos().then(res => res.json()).then(data => setTrabajos(data))
        getEstados().then(res => res.json()).then(data => setEstados(data))}
        , [])
    
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setBusqueda(e.currentTarget.value);
        filtrar(e.currentTarget.value)
    }
    const manejarCambio = (e: React.FormEvent<HTMLSelectElement>) => {
        filtrarEstado(e.currentTarget.value)
    }
    const filtrarEstado = (estado:string) => {
        if (estado === 'todos') {
            getTrabajos().then(res => res.json()).then(data => setTrabajos(data))
        } else {
            const trabajosNuevos =trabajos.filter((elemento) => {
                return elemento.id_estado.nombre === estado})
            setTrabajos(trabajosNuevos)
        }
    }

    const filtrar = (terminoBusqueda:string) => {
        if (terminoBusqueda === '') {
            getTrabajos().then(res => res.json()).then(data => setTrabajos(data))
        } else {
            const palabrasBusqueda = terminoBusqueda.toLowerCase().split(' ').filter(palabra => palabra !== '')
            const resultadoBusqueda = trabajos.filter((elemento) => {
                const nombreCompleto = (elemento.id_vehiculo.id_cliente.nombre + elemento.id_vehiculo.id_cliente.apellido).toLowerCase()
                const modelo = (elemento.id_vehiculo.id_modelo.nombre).toLowerCase()
                return palabrasBusqueda.every(palabra => nombreCompleto.includes(palabra) || modelo.includes(palabra))
            })
            setTrabajos(resultadoBusqueda)
        }
    }
  return (
    <div className="space-y-2">

        <input type="text" className='bg-gray-900 p-4 my-2 text-white py-3' value={busqueda} placeholder='Filtrar por Nombre' onChange={handleChange}/>
        <select name="id_estado" id="id_estado" onChange={manejarCambio} className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2">
            <option value="todos">Todos los Estados</option>
            {estados.map(estado => (
                <option key={estado.nombre} value={estado.nombre}>
                    {estado.nombre}
                </option>
            ))}
        </select>
        <div className="h-96 overflow-y-auto">
        {trabajos.map(trabajo=> (
            <TrabajoItem key={trabajo.id_trabajo} trabajo={trabajo} />
        ))}
        </div>
    </div>
  )
}

export default TrabajoList