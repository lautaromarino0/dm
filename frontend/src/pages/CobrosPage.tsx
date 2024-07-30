import CobroList from "../components/cobros/CobroList"


function CobrosPage() {
  return (
    <div className="bg-zinc-900 h-screen text-white flex items-center justify-center">
        <div className="bg-gray-950 p-4 w-2/5 rounded-md">
        <h2 className="text-center text-white text-2xl font-bold mb-4 ">Cobros A Clientes</h2>
        <CobroList />
        </div>
    </div>
  )
}

export default CobrosPage 