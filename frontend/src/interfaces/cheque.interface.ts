export interface Cheque {
    id_cheque: number;

    numero: string;

    banco: string;

    id_cobro: number;

    fechaRetiro: Date

    paguese_a: string

    monto: number
}

export type ChequeDto = Omit<Cheque, 'id_cheque' | 'id_cobro'>;