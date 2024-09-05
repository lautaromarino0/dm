import { FormEvent, useEffect, useState } from "react"
import { getTrabajosPorEmpleado } from "../../api/trabajoService";
import { useParams } from "react-router-dom";
import { createPago } from "../../api/pagoService";


function PagoForm() {
  const {id} = useParams<{id: string}>();
  const [monto, setMonto] = useState(0);
  const [trabajos, setTrabajos] = useState([{id_trabajo: 0, id_vehiculo: {id_modelo: {nombre: ''}}, id_estado: {nombre: ''},total:0, detalles:[{id_detalle:0,precioManoObra:0,precioRepuestos:0}]}]);
  const [trabajosSeleccionados, setTrabajosSeleccionados] = useState<number[]>([]);
  useEffect(() => {
    if (id === undefined) {
      // Manejar el caso en que id es undefined
      console.error("ID no proporcionado");
      return;
    }
    getTrabajosPorEmpleado(+id).then(res => res.json()).then(data => setTrabajos(data));
  }, [id]);

  useEffect(() => {
    const montoTotal = trabajosSeleccionados.reduce((total: number, id) => {
      const trabajo = trabajos.find(trabajo => trabajo.id_trabajo === id);
      if (trabajo) { // Verifica si trabajo no es undefined
        console.log(trabajo);
        let total = 0;
        trabajo.detalles.forEach(detalle => {
          total += detalle.precioManoObra * 0.3;
        });
        return total;
      } else {
        return total;
      }
    }, 0);
    setMonto(montoTotal);
  }
  , [trabajosSeleccionados, trabajos]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, trabajoId:number) => {
    setTrabajosSeleccionados(prevState => {
      if (e.target.checked) {
        return [...prevState, trabajoId];
      } else {
        return prevState.filter(id => id !== trabajoId);
      }
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (trabajosSeleccionados.length === 0) {
      alert('Seleccione al menos un trabajo');
      return;
    }
    if (id === undefined) {
      console.error("ID no proporcionado");
      return;
    }
    console.log(monto, id, trabajosSeleccionados);
    const res = createPago({monto: monto, id_empleado: Number(id), trabajos: trabajosSeleccionados});
    const data = await res;
    console.log(data);
    alert('Pago Registrado');
    window.location.reload();
  }
  const noHayTrabajosAPagar = !trabajos || trabajos.every(trabajo => trabajo.id_estado.nombre !== 'Cobrado');

  return (
    <div className="bg-zinc-900 h-screen text-white flex items-center justify-center">
        <div className="bg-gray-950 p-4 w-2/5 rounded-md">
        <h2 className="text-center text-white text-2xl font-bold mb-4 ">Registrar Pago</h2>
        {noHayTrabajosAPagar ? (
          <p className="text-white text-center">No hay trabajos a pagar</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {trabajos.map((trabajo) => (
              trabajo.id_estado.nombre === 'Cobrado' &&
              <div key={trabajo.id_trabajo} className="flex items-center">
                <input type="checkbox" name="trabajos" value={trabajo.id_trabajo} onChange={(e) => handleCheckboxChange(e, trabajo.id_trabajo)} className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"/>
                <label className="ml-2 text-white">{trabajo.id_vehiculo.id_modelo.nombre}</label>
              </div>
            ))}
            <p className="text-white font-semibold">Monto Total: ${monto}</p>
            <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50">
              Registrar Pago
            </button>
          </form>
        )}
        </div>
    </div>
  )
}

export default PagoForm