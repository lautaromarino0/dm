import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-zinc-900 min-h-screen text-white flex flex-col items-center justify-start pt-10">
        <div className="bg-gray-950 p-8 w-4/5 rounded-md shadow-lg flex flex-col items-center">
          <h1 className="text-4xl font-bold">Bienvenido al Sistema de Gestión de Talleres</h1>
          <p className="text-xl mt-2">Este sistema te ayudará a gestionar todos los aspectos de tu taller, desde el seguimiento de trabajos hasta la administración de clientes y recursos.</p>
          <Link to="/trabajos" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Ver Trabajos
          </Link>
        </div>
    </div>
  );
}
export default HomePage