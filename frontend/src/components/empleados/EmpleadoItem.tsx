import { deleteEmpleado } from "../../api/empleadoService"
import { Empleado } from "../../interfaces/empleado.interface"

interface Props {
    empleado: Empleado
}

function EmpleadoItem({ empleado }: Props) {

    const el = () => {
        if (!window.confirm('¿Estás seguro de eliminar el empleado?')) return
        deleteEmpleado(empleado.id_empleado)
            .then(() => {
                alert('Empleado eliminado')
                window.location.reload()
            })
            .catch(err => console.error(err))
    }
    const actualizar = () => {
        window.location.href = `/empleados/${empleado.id_empleado}`
    }
    const pagar = () => {
        window.location.href = `/empleados/${empleado.id_empleado}/pagar`
    }

  return (
    <div key={empleado.id_empleado} className="bg-gray-900 p-4 my-2 flex justify-between items-center hover:bg-gray-800 hover:cursor-pointer rounded-md">
      <div>
        <h2 className="text-lg font-bold">{empleado.nombre} {empleado.apellido}</h2>
      </div>
      <div className="flex gap-x-2">
      <button
          onClick={() => pagar()}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800"
        >
          Pagar
        </button>
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

export default EmpleadoItem