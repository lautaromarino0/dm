import VehiculoForm from "../components/vehiculos/VehiculoForm"
import VehiculoList from "../components/vehiculos/VehiculoList"

function VehiculosPage() {
  return (
    <div className="bg-zinc-900 min-h-screen text-white flex items-center justify-center">
        <div className="bg-gray-950 p-4 w-2/5 rounded-md">
        <VehiculoForm />
        <VehiculoList />
        </div>
    </div>
  )
}

export default VehiculosPage