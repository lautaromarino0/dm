import TrabajoForm from "../components/trabajos/TrabajoForm"
import TrabajoList from "../components/trabajos/TrabajoList"


function TrabajosPage() {
  return (
    <div className="bg-zinc-900 min-h-screen text-white flex items-center justify-center">
        <div className="bg-gray-950 p-4 w-3/5 rounded-md">
        <TrabajoForm />
        <TrabajoList />
        </div>
    </div>
  )
}

export default TrabajosPage