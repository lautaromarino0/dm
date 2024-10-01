const API = 'http://localhost:3000/api/estadisticas/ultimo-mes';


export const getEstadisticasUltimoMes = async () => {
    return await fetch(API);
}

