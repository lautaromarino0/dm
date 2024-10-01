import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { actualizarVehiculo, obtenerVehiculo } from "../../api/vehiculoService";
import VehiculoHistorial from "./VehiculoHistorial";

function VehiculosUpdate() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [vehiculo, setVehiculo] = useState({
        año: 0,
        patente: '',
        fechaIngreso: ''
      });

      useEffect(() => {
        obtenerVehiculo(Number(id)).then(res => res.json()).then(data => {
            const { año, patente, fechaIngreso } = data; // Desestructuración para obtener solo año y patente
            setVehiculo({ año, patente, fechaIngreso }); // Setear solo año y patente
        })
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehiculo({
          ...vehiculo!,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(vehiculo)
        actualizarVehiculo(Number(id), vehiculo)
        .then(() => {
        alert("Vehiculo actualizado");
        navigate("/vehiculos");
        })
        .catch((err) => console.error(err));
      };


  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-start pt-10">
      <div className="w-3/4 md:w-1/2 lg:w-1/3 bg-gray-950 shadow-md rounded-md p-6 text-white mt-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Actualizar Vehiculo</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-white">Fecha Ingreso: {vehiculo.fechaIngreso.toString().substring(0,10)}</label>
          </div>
          <div className="mb-4">
            <label className="block text-white">Año:</label>
            <input
              type="number"
              name="año"
              value={vehiculo?.año}
              onChange={handleChange}
              className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Patente:</label>
            <input
              type="text"
              name="patente"
              value={vehiculo?.patente}
              onChange={handleChange}
              className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Actualizar
          </button>
        </form>
        <VehiculoHistorial />
      </div>
    </div>
  );
}

export default VehiculosUpdate