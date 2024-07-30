import { ChequeDto } from "./cheque.interface";


export interface Cobro {
    fechaCobro: Date;
    id_cobro: number;
    monto: number;
    id_trabajo: number;
    cheques?: ChequeDto[];
}
export type cobroDto = Omit<Cobro, 'id_cobro' | 'fechaCobro'>;