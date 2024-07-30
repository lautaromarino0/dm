import { cobroDto } from "../interfaces/cobro.interface";

const API = 'http://localhost:3000/api/cobro';

export const getCobros = async () => {
    return await fetch(API);
}
export const getCobro = async (id: number) => {
    return await fetch(`${API}/${id}`);
}
export const crearCobro = async (cobro: cobroDto) => {
    return await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cobro)
    });
}