import { useEffect, useState } from "react"
import { Historial } from "../../interfaces/historial.interface"
import { obtenerHistorialTrabajos } from "../../api/vehiculoService"
import { useParams } from "react-router-dom";
import VehiculoHistorialItem from "./VehiculoHistorialItem";


function VehiculoHistorial() {

    const { id } = useParams<{ id: string }>();

    const [historial, setHistorial] = useState<Historial>()

    useEffect(() => {
        obtenerHistorialTrabajos(Number(id)).then(res => res.json()).then(data => setHistorial(data))   
    }, [id])

  return (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-center mt-4">Historial del Vehiculo</h2>
        {historial?.trabajos.map(trabajo => (
            <VehiculoHistorialItem key={trabajo.kilometraje} trabajo={trabajo}/>
        ))}
    </div>
)
}

export default VehiculoHistorial