import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { entregarTrabajo, getTrabajo } from "../../api/trabajoService";
import { crearCobro } from "../../api/cobroService";


function CobroForm() {
  const [cheques, setCheques] = useState([{
    numero: '',
    banco: '',
    fechaRetiro: new Date(),
    paguese_a: '',
    monto: 0
  }])
  const [mostrarCheques, setMostrarCheques] = useState(false)
  const [cobro, setCobro] = useState({
    monto: 0,
    id_trabajo: 0
  })
  const {id} = useParams<{id: string}>();
  const [trabajo, setTrabajo] = useState({id_trabajo: 0, id_vehiculo: {id_modelo: {nombre: ''}}, id_estado: {nombre: ''},total:0, totalEntregado: 0});
  useEffect(() => {
    if (id === undefined) {
      console.error("ID no proporcionado");
      return;
    }
    getTrabajo(+id).then(res => res.json()).then(data => setTrabajo(data))
  }, [id])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setCobro({ ...cobro, [name]: Number(value) })
  }

  function convertirFecha(fecha:Date) {
    const año = fecha.getFullYear();
    // Ajustamos el mes sumando 1 y aseguramos que tenga dos dígitos
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    // Aseguramos que el día tenga dos dígitos
    const dia = ('0' + fecha.getDate()).slice(-2);
  
    return `${año}-${mes}-${dia}`;
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const cobroPreparado = {
      ...cobro,
      id_trabajo: Number(trabajo.id_trabajo),
      cheques: cheques
    }
    console.log(cobroPreparado)
    if (cobroPreparado.monto <= 0) {
      alert('El monto no puede ser 0')
      return
    }
    crearCobro(cobroPreparado)
    .then(() => {
      alert('Cobro registrado')
      // Ahora entregarTrabajo se llama aquí, asegurando que se ejecute después de crearCobro
      return entregarTrabajo(Number(trabajo.id_trabajo), cobroPreparado.monto)
    })
    .then(() => {
      alert('Entrega del Trabajo Registrada')
      // Verificar si el trabajo ha sido completamente cobrado
      if (cobroPreparado.monto + trabajo.totalEntregado > trabajo.total) {
        alert('Trabajo Completamente Cobrado')
        window.location.href = `/trabajos/${trabajo.id_trabajo}`
      } else {
        // Si no se ha cobrado completamente, simplemente recargar la página
        window.location.reload()
      }
    })
    .catch(() => alert('Error al registrar cobro o al entregar trabajo'))
  console.log('Formulario enviado')
  }
  const agregarCheque = () => {
    if (!mostrarCheques) {
      setMostrarCheques(true)
    } else {
      setCheques([...cheques, {numero: '', banco: '', fechaRetiro: new Date(), paguese_a: '', monto: 0}])
    }
  }
  const manejarCambio = (index:number, e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const nuevosCheques = [...cheques];
    if(name === 'banco'){
        nuevosCheques[index].banco = value;
    } else if(name === 'numero'){   
        nuevosCheques[index].numero = value;
    } else if(name === 'fechaRetiro'){
        nuevosCheques[index].fechaRetiro = new Date(value);
    } else if(name === 'paguese_a'){
        nuevosCheques[index].paguese_a = value;
    } else if(name === 'monto'){
        nuevosCheques[index].monto = Number(value);
    }
    console.log(nuevosCheques)
    setCheques(nuevosCheques);
};
  if (trabajo.id_estado.nombre !== 'Completado') {
    return (
      <div className="bg-zinc-900 h-screen text-white flex items-center justify-center">
        <h2 className="text-center text-white text-2xl font-bold">No se puede cobrar un Trabajo en estado {trabajo.id_estado.nombre}</h2>
      </div>
    )
  }
  return (
    <div className="bg-zinc-900 h-screen text-white flex items-center justify-center">
        <div className="bg-gray-950 p-4 w-2/5 rounded-md">
            <h2 className="text-center text-white text-2xl font-bold mb-4 ">Registrar Cobro</h2>
            <p className="text-white text-xl text-center">Total Trabajo: {trabajo.total}</p>
            <p className="text-white text-xl text-center">Total Entregado: {trabajo.totalEntregado}</p>
            <p className="text-white text-xl text-center">Saldo Restante: {trabajo.total - trabajo.totalEntregado}</p>
            <form onSubmit={handleSubmit}>
            <input type="number" name="monto" className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2" placeholder="Monto" onChange={handleChange}/>
            <div>
            <p className="text-white text-xl text-center">Cheques</p>
            {mostrarCheques && cheques.map((cheque, index) => (
                    <div key={index} className=" space-x-4 mb-4">
                    <input
                        type="text"
                        name="numero"
                        placeholder="Numero de Cheque"
                        value={cheque.numero}
                        onChange={(e) => manejarCambio(index, e)}
                        className="bg-gray-800 p-2 rounded-lg flex-1 mb-2"
                    />
                    <input
                        type="text"
                        name="banco"
                        placeholder="Banco"
                        value={cheque.banco}
                        onChange={(e) => manejarCambio(index, e)}
                        className="bg-gray-800 p-2 rounded-lg flex-1 mb-2"
                    />
                    <input
                        type="number"
                        name="monto"
                        placeholder="Monto"
                        value={cheque.monto}
                        onChange={(e) => manejarCambio(index, e)}
                        className="bg-gray-800 p-2 rounded-lg flex-1 mb-2"
                    />
                    <input
                        type="date"
                        name="fechaRetiro"
                        value={convertirFecha(cheque.fechaRetiro)}
                        onChange={(e) => manejarCambio(index, e)}
                        className="bg-gray-800 p-2 rounded-lg flex-1 mb-2"
                    />
                    <input
                        type="text"
                        name="paguese_a"
                        placeholder="Paguese a"
                        value={cheque.paguese_a}
                        onChange={(e) => manejarCambio(index, e)}
                        className="bg-gray-800 p-2 rounded-lg flex-1 mb-2"
                    />
                    </div>
                ))}
            </div>
            <button type="button" onClick={agregarCheque} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-4">
                    Agregar Cheque
                </button>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">
              Registrar Cobro
            </button>
            </form>
        </div>
    </div>
  )
}

export default CobroForm