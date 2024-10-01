import { useEffect, useState } from "react"
import { getEstadisticasUltimoMes } from "../api/estadisticaService"
import { EstadisticasDTO } from "../interfaces/estadistica.interface";
import EstadisticaCard from "../components/estadisticas/EstadisticaCard";
import TopTareasCard from "../components/estadisticas/TopTareasCard";


function EstadisticasPage() {

  const [estadisticas, setEstadisticas] = useState<EstadisticasDTO>();

  useEffect(() => {
    getEstadisticasUltimoMes().then(res => res.json()).then(data => setEstadisticas(data))
  }, [])

  return (
    <div className="bg-zinc-900 h-screen text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div className="bg-gray-950 p-6  rounded-md">
          <h2 className="text-center text-white text-2xl font-bold mb-4 ">Trabajos Ultimo Mes</h2>
          {estadisticas && (
            <><EstadisticaCard nombre='Trabajos Totales' valor={estadisticas.totalTrabajos} /><EstadisticaCard nombre='Trabajos Pendientes' valor={estadisticas.totalPendientes} /><EstadisticaCard nombre='Trabajos Completados' valor={estadisticas.totalCompletados} /><EstadisticaCard nombre='Trabajos Cobrados' valor={estadisticas.totalCobrados} /><EstadisticaCard nombre='Trabajos Pagados' valor={estadisticas.totalPagados} /></>
          )}  
        </div>
        <div className="bg-gray-950 p-6  rounded-md">
          <h2 className="text-center text-white text-2xl font-bold mb-4 ">Ingresos Ultimo Mes</h2>
          {estadisticas && (
            <><EstadisticaCard nombre='Ingresos Brutos Totales' valor={estadisticas.totalIngreso} /><EstadisticaCard nombre='Total a Cobrar' valor={+estadisticas.totalACobrar.totalACobrar} /><EstadisticaCard nombre='Total de Repuestos' valor={estadisticas.totalRepuestos} /><EstadisticaCard nombre='Total de Mano de Obra' valor={estadisticas.totalManoObra} /><EstadisticaCard nombre='Total Sueldos' valor={estadisticas.totalSueldos} /><EstadisticaCard nombre='Ingresos Netos (arreglar)' valor={estadisticas.gananciaNeta} /></>
          )}  
        </div>
        <div className="bg-gray-950 p-6  rounded-md">
          <h2 className="text-center text-white text-2xl font-bold mb-4 ">Rendimiento Empleados Ultimo Mes</h2>
          {estadisticas && (
            <>
            {estadisticas.trabajosPorEmpleado.map((empleado, index)=>(
              <EstadisticaCard key={index} nombre={empleado.nombre} valor={empleado.ingreso} nombre2="Cantidad de Trabajos" valor2={empleado.cantidad} />
            ))}
            <TopTareasCard topTareas={estadisticas.topTareas}/>
            </>
            
          )}
        </div>
        
      </div>
    </div>
  )
}

export default EstadisticasPage