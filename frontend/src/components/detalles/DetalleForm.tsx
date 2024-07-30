import { useEffect, useState } from "react"
import { listarTareas } from "../../api/tareaService";
import { DetalleCrear } from "../../interfaces/detalle.interface";

interface DetalleFormProps {
    index: number;
    detalle: DetalleCrear;
    onDetalleChange: (index: number, nuevoDetalle: DetalleCrear) => void;
  }
  

function DetalleForm({ index, detalle, onDetalleChange }: DetalleFormProps) {

    const [detalle, setDetalle] = useState({
        id_tarea: 0,
        precioManoObra: 0,
        precioRepuestos: 0
    });

    const [tareas, setTareas] = useState([
        { id_tarea: 0, nombre: '' }
    ]);

    useEffect(() => {
        listarTareas().then(res => res.json()).then(data => setTareas(data));
    }, []);

    const handleChange = (e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;
        setDetalle({ ...detalle, [name]: value });
    }

  return (
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label htmlFor="tarea" className="block text-white">Tarea:</label>
              <select name="id_tarea" onChange={handleChange} className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2">
            <option value="">Seleccione una Tarea</option>
            {tareas.map((tarea) => (
                <option key={tarea.id_tarea} value={tarea.id_tarea}>
                    {tarea.nombre}
                </option>
            ))}
        </select>
            </div>
            <div className="flex-1">
              <label htmlFor="precioManoObra" className="block text-white">Precio Mano de Obra:</label>
              <input
                type="number"
                name="precioManoObra"
                value={detalle.precioManoObra}
                onChange={handleChange}
                className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2 text-white"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="precioRepuestos" className="block text-white">Precio de Repuestos:</label>
              <input
                type="number"
                name="precioRepuestos"
                value={detalle.precioRepuestos}
                onChange={handleChange}
                className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2 text-white"
                required
              />
            </div>
          </div>
      );
}

export default DetalleForm