import { Cobro } from "../../interfaces/cobro.interface"

interface Props {
    cobro: Cobro
}   

function CobroItem( {cobro}:Props) {

  const detalles = () => {
    window.location.href = `/cobros/${cobro.id_cobro}`
  }

  return (
  <div key={cobro.id_cobro} className="bg-gray-900 p-4 my-2 flex justify-between items-center hover:bg-gray-800 hover:cursor-pointer rounded-md">
  <div>
    <h2 className="text-lg font-bold">{'$'+cobro.monto + ' Cobrado el ' + cobro.fechaCobro.toString().substring(0,10)}</h2>
  </div>
  <div className="flex gap-x-2">
    <button
      onClick={() => detalles()}
      className=" bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-blue-800"
    >
      Detalles
    </button>
  </div>
</div>
)
}

export default CobroItem