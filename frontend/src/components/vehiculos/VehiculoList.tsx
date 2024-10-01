import { useEffect, useState } from "react"
import { VehiculoMostrar } from "../../interfaces/vehiculo.interface"
import { listarVehiculos } from "../../api/vehiculoService"
import VehiculoItem from "./VehiculoItem"


function VehiculoList() {
    const [vehiculos, setVehiculos] = useState<VehiculoMostrar[]>([])
    const [busqueda, setBusqueda] = useState('')
    
    useEffect(() => {
        listarVehiculos ().then(res => res.json()).then(data => setVehiculos(data))}, [])

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
          setBusqueda(e.target.value);
          filtrar(e.target.value);
        }

        const filtrar = (terminoBusqueda: string) => {
            if (terminoBusqueda === '') {
              listarVehiculos().then(res => res.json()).then(data => setVehiculos(data));
            } else {
              const palabrasBusqueda = terminoBusqueda.toLowerCase().split(' ').filter(palabra => palabra !== '');
              const resultadoBusqueda = vehiculos.filter((elemento) => {
                const nombreCompletoCliente = (elemento.id_cliente.nombre + ' ' + elemento.id_cliente.apellido).toLowerCase();
                const nombreModeloVehiculo = elemento.id_modelo.nombre.toLowerCase();
                return palabrasBusqueda.every(palabra => 
                  nombreCompletoCliente.includes(palabra) || nombreModeloVehiculo.includes(palabra)
                );
              });
              setVehiculos(resultadoBusqueda);
            }
          }
  return (
    <div className="space-y-2">

        <input type="text" className='bg-gray-900 p-4 my-2 text-white py-3' value={busqueda} placeholder='Filtrar' onChange={handleChange}/>
        <div className="h-96 overflow-y-auto">
        {vehiculos.map(vehiculo => (
            <VehiculoItem key={vehiculo.id_vehiculo} vehiculo={vehiculo} />
        ))}
        </div>
    </div>
  )
}

export default VehiculoList