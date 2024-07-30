import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPago } from "../../api/pagoService"


function PagoDetalle() {
    const { id } = useParams()

    const [pago, setPago] = useState({
        id_pago: 0,
        fechaPago: new Date(),
        monto: 0,
        id_empleado: {nombre: '', apellido: ''},
        trabajos: [{id_trabajo: 0, id_vehiculo: {id_modelo: {nombre: ''}, id_cliente: {nombre: '', apellido: ''}}, total: 0}]
    })
    useEffect(() => {
        getPago(Number(id)).then(res => res.json()).then(data => setPago(data))
    }
    , [id])

    const detalles = (id:number) => {
        window.location.href = `/trabajos/${id}`
    }
  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-start pt-10">
      <div className="w-3/4 md:w-1/2 lg:w-1/3 bg-gray-950 shadow-md rounded-md p-6 text-white mt-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Informacion del Pago</h2>
        <div className="mb-4">
            <h3 className="text-white block">Fecha: {pago.fechaPago.toString().substring(0,10)}</h3>
            <h3 className="text-white block">Empleado: {pago.id_empleado.nombre + ' ' + pago.id_empleado.apellido}</h3>
            <h3 className="text-white block">Monto: ${pago.monto}</h3>
            <h3 className="text-white block">Trabajos Pagados: </h3>
            
                {pago.trabajos.map(trabajo => (
                    <div key={trabajo.id_trabajo} className="bg-gray-900 p-4 my-2 flex justify-between items-center hover:bg-gray-800 hover:cursor-pointer rounded-md" onClick={() => detalles(trabajo.id_trabajo)}>
                        <div>
                            <h2 className="text-lg font-bold">{trabajo.id_vehiculo.id_cliente.nombre + ' ' + trabajo.id_vehiculo.id_cliente.apellido + ' - ' + trabajo.id_vehiculo.id_modelo.nombre + ' - $' + trabajo.total}</h2>
                        </div>
                    </div>
                ))}
            
        </div>
      </div>
    </div>
  )
}

export default PagoDetalle