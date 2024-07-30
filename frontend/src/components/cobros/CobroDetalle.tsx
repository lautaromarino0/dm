import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCobro } from "../../api/cobroService"


function CobroDetalle() {

    const { id } = useParams()

    const [cobro, setCobro] = useState({monto:0, fechaCobro: new Date(),cheques:[{monto:0,fechaRetiro: new Date(),id_cheque:0}], id_trabajo: {id_trabajo:0,id_vehiculo: {id_modelo: {nombre: ''}, id_cliente: {nombre: ''}}, detalles: [{id_tarea: {nombre: ''},id_detalle: 0}]}})

    useEffect(() => {
        getCobro(Number(id)).then(res => res.json()).then(data => setCobro(data))
    }
    , [id])

    const aCheque = (id:number) => {
        window.location.href = `/cheques/${id}`
    }

    const aTrabajo = (id:number) => {
        window.location.href = `/trabajos/${id}`
    }

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-start pt-10">
        <div className="w-3/4 md:w-1/2 lg:w-1/3 bg-gray-950 shadow-md rounded-md p-6 text-white mt-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Informacion del Cobro</h2>
            <div className="mb-4">
                <h3 className="text-white block">Fecha: {cobro.fechaCobro.toString().substring(0,10)}</h3>
                <h3 className="text-white block">Monto: ${cobro.monto}</h3>
                <h3 className="text-white block">Trabajo Cobrado: </h3>
                <div className="bg-gray-900 p-4 my-2 flex justify-between items-center hover:bg-gray-800 hover:cursor-pointer rounded-md">
                    <div onClick={()=> aTrabajo(cobro.id_trabajo.id_trabajo)}>
                        <h2 className="text-lg font-bold">{cobro.id_trabajo.id_vehiculo.id_cliente.nombre + ' - ' + cobro.id_trabajo.id_vehiculo.id_modelo.nombre}</h2>
                        {cobro.id_trabajo.detalles.map(detalle => (
                            <h3  key={detalle.id_detalle} className="text-white block">- {detalle.id_tarea.nombre}</h3>
                        ))}
                    </div>
                </div>
                <h3 className="text-white block">Cheques Recibidos: </h3>
                <div className="bg-gray-900 p-4 my-2 flex justify-between items-center hover:bg-gray-800 hover:cursor-pointer rounded-md">
                    <div>
                        {cobro.cheques.map(cheque => (
                            cheque.monto > 0 &&
                            <h3 onClick={() => aCheque(cheque.id_cheque)} key={cheque.id_cheque} className="text-white block"> ${cheque.monto} vence el {cheque.fechaRetiro.toString().substring(0,10)}</h3>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CobroDetalle