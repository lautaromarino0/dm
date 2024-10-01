
import Navbar from "./components/Navbar"
import { Routes, Route } from 'react-router-dom';
import ClientesPage from "./pages/ClientesPage";
import HomePage from "./pages/HomePage";
import TrabajosPage from "./pages/TrabajosPage";
import EmpleadosPage from "./pages/EmpleadosPage";
import PagosPage from "./pages/PagosPage";
import CobrosPage from "./pages/CobrosPage";
import ClienteUpdate from "./components/clientes/ClienteUpdate";
import ModeloForm from "./components/modelo/ModeloForm";
import VehiculosPage from "./pages/VehiculosPage";
import VehiculosUpdate from "./components/vehiculos/VehiculosUpdate";
import EmpleadoUpdate from "./components/empleados/EmpleadoUpdate";
import MarcaForm from "./components/marca/MarcaForm";
import TareasPage from "./pages/TareasPage";
import TareaUpdate from "./components/tareas/TareaUpdate";
import TrabajoUpdate from "./components/trabajos/TrabajoUpdate";
import ChequesPage from "./pages/ChequesPage";
import EstadisticasPage from "./pages/EstadisticasPage";
import PagoForm from "./components/pagos/PagoForm";
import PagoDetalle from "./components/pagos/PagoDetalle";
import CobroForm from "./components/cobros/CobroForm";
import CobroDetalle from "./components/cobros/CobroDetalle";
import ChequeDetalle from "./components/cheques/ChequeDetalle";
import LoginPage from "./pages/LoginPage";
import AuthGuard from "./components/AuthGuard";

function App() {
  const token = localStorage.getItem('token');
  return (
    <div className="h-screen  bg-zinc-900 text-white">
      <div>
        {token && <Navbar />}
      </div>
      <div className="h-full pt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clientes" element={<AuthGuard><ClientesPage /></AuthGuard>} />
          <Route path="/clientes/:id" element={<AuthGuard><ClienteUpdate /></AuthGuard>} />
          <Route path="/trabajos" element={<AuthGuard><TrabajosPage /></AuthGuard>} />
          <Route path="/trabajos/:id" element={<AuthGuard><TrabajoUpdate /></AuthGuard>} />
          <Route path="/trabajos/:id/cobrar" element={<AuthGuard><CobroForm /></AuthGuard>} />
          <Route path="/empleados" element={<AuthGuard><EmpleadosPage /></AuthGuard>} />
          <Route path="/empleados/:id" element={<AuthGuard><EmpleadoUpdate /></AuthGuard>} />
          <Route path="/empleados/:id/pagar" element={<AuthGuard><PagoForm /></AuthGuard>} />
          <Route path="/pagos" element={<AuthGuard><PagosPage /></AuthGuard>} />
          <Route path="/pagos/:id" element={<AuthGuard><PagoDetalle /></AuthGuard>} />
          <Route path="/cobros" element={<AuthGuard><CobrosPage /></AuthGuard>} />
          <Route path="/cobros/:id" element={<AuthGuard><CobroDetalle /></AuthGuard>} />
          <Route path="/modelos" element={<AuthGuard><ModeloForm /></AuthGuard>} />
          <Route path="/vehiculos" element={<AuthGuard><VehiculosPage /></AuthGuard>} />
          <Route path="/vehiculos/:id" element={<AuthGuard><VehiculosUpdate /></AuthGuard>} />
          <Route path="/marcas" element={<AuthGuard><MarcaForm /></AuthGuard>} />
          <Route path="/tareas" element={<AuthGuard><TareasPage /></AuthGuard>} />
          <Route path="/tareas/:id" element={<AuthGuard><TareaUpdate /></AuthGuard>} />
          <Route path="/cheques" element={<AuthGuard><ChequesPage /></AuthGuard>} />
          <Route path="/cheques/:id" element={<AuthGuard><ChequeDetalle /></AuthGuard>} />
          <Route path="/estadisticas" element={<AuthGuard><EstadisticasPage /></AuthGuard>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App