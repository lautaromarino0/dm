import { EmpleadoCrear } from "../interfaces/empleado.interface";

const API = 'http://localhost:3000/api/empleado';



export const getEmpleados = () => fetch(API)

export const getEmpleado = (id: number) => fetch(`${API}/${id}`)

export const createEmpleado = async (empleado: EmpleadoCrear) => {
  const response = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(empleado),
  });
  return await response.json();
};

export const deleteEmpleado = async (id: number) => {
  const response = await fetch(`${API}/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
}

export const actualizarEmpleado = async (id: number, empleado: EmpleadoCrear) => {
  const response = await fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(empleado),
  });
  return await response.json();
}