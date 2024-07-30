import { useEffect, useState } from 'react'
import { getEmpleados } from '../../api/empleadoService'
import { Empleado } from '../../interfaces/empleado.interface'
import EmpleadoItem from './EmpleadoItem'

function EmpleadoList() {

    const [empleados, setEmpleado] = useState<Empleado[]>([])
    const [busqueda, setBusqueda] = useState('')

    useEffect(() => {
        getEmpleados().then(res => res.json()).then(data => setEmpleado(data))}, [])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusqueda(e.target.value);
    }

  return (
    <div className="space-y-2">

        <input type="text" className='bg-gray-900 p-4 my-2 text-white py-3' value={busqueda} placeholder='Filtrar por Nombre' onChange={handleChange}/>
        <div className="h-96 overflow-y-auto">
        {empleados.map(empleado => (
            <EmpleadoItem key={empleado.id_empleado} empleado={empleado} />
        ))}
        </div>
    </div>
  )
}

export default EmpleadoList