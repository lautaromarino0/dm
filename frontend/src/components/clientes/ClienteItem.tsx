import { Cliente } from "../../interfaces/cliente.interface"
import {eliminarCliente} from '../../api/clienteService'

interface Props {
    cliente : Cliente
}

function ClienteItem({ cliente } : Props) {

    const el = () => {
        if(!window.confirm('¿Estás seguro de eliminar el cliente?')) return
        eliminarCliente(cliente.id_cliente)
        .then(() => {
            alert('Cliente eliminado')
            window.location.reload()
        })
        .catch(err => console.error(err))
    }

    const actualizar = () => {
        window.location.href = `/clientes/${cliente.id_cliente}`
    }

  return (
    <div key={cliente.id_cliente} className="bg-gray-900 p-4 my-2 flex justify-between items-center hover:bg-gray-800 hover:cursor-pointer rounded-md">
      <div>
        <h2 className="text-lg font-bold">{cliente.nombre} {cliente.apellido}</h2>
      </div>
      <div className="flex gap-x-2">
        <button
          onClick={() => actualizar()}
          className=" bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-blue-800"
        >
          Actualizar
        </button>
        <button
          onClick={() => el()}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ClienteItem