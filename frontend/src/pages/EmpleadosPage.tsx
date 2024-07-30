import EmpleadoForm from "../components/empleados/EmpleadoForm"
import EmpleadoList from "../components/empleados/EmpleadoList"


function EmpleadosPage() {
  return (
    <div className="bg-zinc-900 h-screen text-white flex items-center justify-center">
        <div className="bg-gray-950 p-4 w-2/5 rounded-md">
        <EmpleadoForm />
        <EmpleadoList />
        </div>
    </div>
  )
}

export default EmpleadosPage