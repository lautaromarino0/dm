import { PagoDTO } from "../interfaces/pago.interface";

const API = 'http://localhost:3000/api/pago';

export const getPagos = async () => {
    return await fetch(API);
}

export const getPago = async (id: number) => {
    return await fetch(`${API}/${id}`);
}

export const createPago = async (pago: PagoDTO) => {
    return await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pago)
    });
}
