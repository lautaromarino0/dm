import  { useEffect, useState } from 'react'
import {  PagoDetail } from '../../interfaces/pago.interface'
import PagoItem from './PagoItem'
import { getPagos } from '../../api/pagoService'

function PagoList() {

    const [pagos, setPagos] = useState<PagoDetail[]>([])
    
    useEffect(() => {
        getPagos().then(res => res.json()).then(data => setPagos(data))}, [])

  return (
    <div className="space-y-2">
      <div className="h-96 overflow-y-auto">
        {pagos.map(pago => (
            <PagoItem   key={pago.id_pago} pago={pago} />
        ))}
      </div>
    </div>
  )
}

export default PagoList