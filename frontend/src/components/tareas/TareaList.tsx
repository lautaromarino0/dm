import  { useEffect, useState } from 'react'
import { listarTareas } from '../../api/tareaService'
import TareaItem from './TareaItem'

function TareaList() {

    const [tareas, setTareas] = useState([{
        id_tarea: 0,
        nombre: '',
        descripcion: ''
    }])
    const [busqueda, setBusqueda] = useState('')

    useEffect(() => {
        listarTareas().then(res => res.json()).then(data => setTareas(data))
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusqueda(e.target.value)
        filtrar(e.target.value)
    }
    const filtrar = (terminoBusqueda:string) => {
        if (terminoBusqueda === '') {
            listarTareas().then(res => res.json()).then(data => setTareas(data))
        } else {
            const palabrasBusqueda = terminoBusqueda.toLowerCase().split(' ').filter(palabra => palabra !== '')
            const resultadoBusqueda = tareas.filter((elemento) => {
                const nombreCompleto = (elemento.nombre).toLowerCase()
                return palabrasBusqueda.every(palabra => nombreCompleto.includes(palabra))
            })
            setTareas(resultadoBusqueda)
        }
    }

  return (
    <div className="space-y-2">

        <input type="text" className='bg-gray-900 p-4 my-2 text-white py-3' value={busqueda} placeholder='Filtrar por Nombre' onChange={handleChange}/>
        <div className="h-96 overflow-y-auto">
        {tareas.map(tarea => (
            <TareaItem key={tarea.id_tarea} tarea={tarea} />
        ))}
        </div>
    </div>
  )
}

export default TareaList