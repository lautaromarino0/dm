import { useEffect, useState } from "react"
import { Cheque } from "../../interfaces/cheque.interface"
import { getCheques } from "../../api/chequeService"
import ChequeItem from "./ChequeItem"


function ChequeList() {

    const [cheques, setCheques] = useState<Cheque[]>([])

    useEffect(() => {
        getCheques().then(res => res.json()).then(data => setCheques(data)), []
        }
    )
  return (
    <div className="space-y-2">
        {cheques.map(cheque => (
            <ChequeItem key={cheque.id_cheque} cheque={cheque} />
        ))}
    </div>
  )
}

export default ChequeList