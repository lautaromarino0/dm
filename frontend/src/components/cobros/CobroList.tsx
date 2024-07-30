import { useEffect, useState } from "react"
import CobroItem from "./CobroItem"
import { getCobros } from "../../api/cobroService"


function CobroList() {

    const [cobros, setCobros] = useState([
        {
            id_cobro: 0,
            monto: 0,
            fechaCobro: new Date(),
            id_trabajo: 0
        }
    ])
    useEffect(() => {
        getCobros().then(res => res.json()).then(data => setCobros(data)), []
        }
    )

  return (
    <div className="space-y-2">
        <div className="h-96 overflow-y-auto">
        {cobros.map(cobro => (
            <CobroItem key={cobro.id_cobro} cobro={cobro} />
        ))}
        </div>
    </div>
  )
}

export default CobroList