import React from 'react';

interface EstadisticaCardProps {
  nombre: string;
  valor: number;
  nombre2?: string;
  valor2?: number;
}

const EstadisticaCard: React.FC<EstadisticaCardProps> = ({ nombre, valor, nombre2,valor2 }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-bold">{nombre}</h3>
      <p className="text-xl mt-2">$ {valor}</p>
      <h3 className="text-lg font-bold mt-4">{nombre2}</h3>
      <p className="text-xl mt-2">{valor2}</p>
    </div>
  );
};

export default EstadisticaCard;