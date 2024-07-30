import { Cheque } from "../../interfaces/cheque.interface"

interface Props {
    cheque : Cheque
}

function ChequeItem({cheque}:Props) {

    const detalles = () => {
        window.location.href = `/cheques/${cheque.id_cheque}`
      }

  return (
    <div key={cheque.id_cheque} className="bg-gray-900 p-4 my-2 flex justify-between items-center hover:bg-gray-800 hover:cursor-pointer rounded-md">
  <div>
    <h2 className="text-lg font-bold">{'$'+cheque.monto + ' vence el ' + cheque.fechaRetiro.toString().substring(0,10)}</h2>
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

export default ChequeItem