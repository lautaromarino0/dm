import TareaForm from "../components/tareas/TareaForm"
import TareaList from "../components/tareas/TareaList"

function TareasPage() {
  return (
    <div className="bg-zinc-900 min-h-screen text-white flex items-center justify-center">
        <div className="bg-gray-950 p-4 w-2/5 rounded-md">
        <TareaForm />
        <TareaList />
        </div>
    </div>
  )
}

export default TareasPage