

interface Props {
    trabajo : {"kilometraje": number, "detalles":[{"id_tarea":{"nombre":string}}],"id_estado":{"nombre":string},"fechaIngreso":Date,"id_trabajo":number}
}

function VehiculoHistorialItem({trabajo} : Props) {

    const navegar = () => {
        window.location.href = `/trabajos/${trabajo.id_trabajo}`
    }

  return (
    <div key={trabajo.kilometraje} className="bg-gray-900 p-4 my-2  justify-between items-center hover:bg-gray-800 hover:cursor-pointer rounded-md" onClick={() => navegar()}>
        <h2>Fecha: {trabajo.fechaIngreso.toString().substring(0,10)}</h2>
        <h2>Kilometraje: {trabajo.kilometraje}</h2>
        <h2>Estado: {trabajo.id_estado.nombre}</h2>
        <h2>Tareas: </h2>
        {trabajo.detalles.map(detalle => (
            <h2 key={detalle.id_tarea.nombre}>- {detalle.id_tarea.nombre}</h2>
        ))}
    </div>
  )
}

export default VehiculoHistorialItem