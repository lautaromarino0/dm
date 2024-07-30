import ClienteForm from "../components/clientes/ClienteForm"
import ClienteList from "../components/clientes/ClienteList"

function ClientesPage() {
  return (
    <div className="bg-zinc-900 h-screen text-white flex items-center justify-center">
      <div className="bg-gray-950 p-4 w-2/5 rounded-md">
      <ClienteForm />
      <ClienteList />
      </div>
    </div>
  )
}

export default ClientesPage