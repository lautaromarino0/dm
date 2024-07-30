import { deleteTrabajo } from "../../api/trabajoService"
import { TrabajoMostrar } from "../../interfaces/trabajo.interface"


interface Props {
    trabajo: TrabajoMostrar
}

function TrabajoItem({trabajo}: Props) {
    const actualizar = () => {
        window.location.href = `/trabajos/${trabajo.id_trabajo}`
    }

    const el = () => {
        if(!window.confirm('¿Estás seguro de eliminar el trabajo?')) return
        deleteTrabajo(trabajo.id_trabajo)
        .then(() => {
            alert('Trabajo eliminado')
            window.location.reload()
        })
        .catch(err => console.error(err))
    }

  return (
    <div key={trabajo.id_trabajo} className="bg-gray-900 p-4 my-2 flex justify-between items-center hover:bg-gray-800 hover:cursor-pointer rounded-md">
      <div>
        <h2 className="text-lg font-bold">{trabajo.id_vehiculo.id_modelo.nombre + ' de ' + trabajo.id_vehiculo.id_cliente.nombre}</h2>
        <p className={`${trabajo.id_estado.nombre === 'Pendiente' ? 'text-red-600' : 'text-green-600'}`}>Estado: {trabajo.id_estado.nombre}</p>
      </div>
      <div className="flex gap-x-2">
        <button
          onClick={() => actualizar()}
          className=" bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-blue-800"
        >
          Detalles
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

export default TrabajoItem