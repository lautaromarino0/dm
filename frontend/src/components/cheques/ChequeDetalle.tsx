import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCheque } from "../../api/chequeService";


function ChequeDetalle() {

    const { id } = useParams();

    const [cheque, setCheques] = useState({
        id_cheque: 0,
        fechaRetiro: new Date(),
        monto: 0,
        id_cobro: 0,
        paguese_a: '',
        banco : '',
        numero : ''
    })

    useEffect(() => {
        getCheque(Number(id)).then(res => res.json()).then(data => setCheques(data))
    }
    , [id])

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-start pt-10">
      <div className="w-3/4 md:w-1/2 lg:w-1/3 bg-gray-950 shadow-md rounded-md p-6 text-white mt-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Informacion del Cheque</h2>
        <div className="mb-4">
            <h3 className="text-white block">Fecha: {cheque.fechaRetiro.toString().substring(0,10)}</h3>
            <h3 className="text-white block">Monto: ${cheque.monto}</h3>
            <h3 className="text-white block">Banco: {cheque.banco}</h3>
            <h3 className="text-white block">Numero Cheque: {cheque.numero}</h3>
            <h3 className="text-white block">Paguese a: {cheque.paguese_a}</h3>
        </div>
      </div>
    </div>
  )
}

export default ChequeDetalle