import { useEffect, useState } from 'react'
import {listarClientes} from '../../api/clienteService'
import {Cliente} from '../../interfaces/cliente.interface'
import ClienteItem from './ClienteItem'

function ClienteList() {

    const [clientes, setClientes] = useState<Cliente[]>([])
    const [busqueda, setBusqueda] = useState('')
    
    useEffect(() => {
        listarClientes().then(res => res.json()).then(data => setClientes(data))}, [])

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
          setBusqueda(e.target.value);
          filtrar(e.target.value);
        }

        const filtrar = (terminoBusqueda: string) => {
          if (terminoBusqueda === '') {
            listarClientes().then(res => res.json()).then(data => setClientes(data));
          } else {
            const palabrasBusqueda = terminoBusqueda.toLowerCase().split(' ').filter(palabra => palabra !== '');
            const resultadoBusqueda = clientes.filter((elemento) => {
              const nombreCompleto = (elemento.nombre + ' ' + elemento.apellido).toLowerCase();
              return palabrasBusqueda.every(palabra => nombreCompleto.includes(palabra));
            });
            setClientes(resultadoBusqueda);
          }
        }
  return (
    <div className="space-y-2">

        <input type="text" className='bg-gray-900 p-4 my-2 text-white py-3' value={busqueda} placeholder='Filtrar por Nombre' onChange={handleChange}/>
        {clientes.map(cliente => (
            <ClienteItem key={cliente.id_cliente} cliente={cliente} />
        ))}
    </div>
  )
}

export default ClienteList