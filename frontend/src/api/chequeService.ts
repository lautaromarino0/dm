const API = 'http://localhost:3000/api/cheque';

export const getCheques = async () => {
    return await fetch(API);
}

export const getCheque = async (id: number) => {
    return await fetch(`${API}/${id}`);
}