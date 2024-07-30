import PagoList from "../components/pagos/PagoList"


function PagosPage() {
  return (
    <div className="bg-zinc-900 h-screen text-white flex items-center justify-center">
        <div className="bg-gray-950 p-4 w-2/5 rounded-md">
        <h2 className="text-center text-white text-2xl font-bold mb-4 ">Pagos a Empleados:</h2>
        <PagoList />
        </div>
    </div>
  )
}

export default PagosPage