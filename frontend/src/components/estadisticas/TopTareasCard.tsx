import React from 'react';

interface Tarea {
  nombre: string;
  cantidad: number;
}

interface TopTareasCardProps {
  topTareas: Tarea[];
}

const TopTareasCard: React.FC<TopTareasCardProps> = ({ topTareas }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2 mb-4">
      <h3 className="text-lg font-bold mb-4">Top Tareas Realizadas</h3>
      <ul className="space-y-2">
        {topTareas.map((tarea, index) => (
          <li key={index} className="flex justify-between">
            <span>{tarea.nombre}</span>
            <span>{tarea.cantidad}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopTareasCard;