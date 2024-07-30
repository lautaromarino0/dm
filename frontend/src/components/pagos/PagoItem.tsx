import {PagoDetail } from "../../interfaces/pago.interface"

interface Props {
    pago : PagoDetail
}

function PagoItem({pago}:Props) {

    const detalles = () => {
        window.location.href = `/pagos/${pago.id_pago}`
    }

  return (
    <div key={pago.id_pago} className="bg-gray-900 p-4 my-2 flex justify-between items-center hover:bg-gray-800 hover:cursor-pointer rounded-md">
      <div>
        <h2 className="text-lg font-bold">{'$'+pago.monto + ' Entregado a ' + pago.id_empleado.nombre}</h2>
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

export default PagoItem