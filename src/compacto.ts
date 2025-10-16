import Reserva from "./reserva";
import Vehiculo from "./vehiculo";
import { KM_MAX_COMPACTO, TARIFA_BASE_COMPACTO, CARGO_VARIABLE_COMPACTO } from "./constantes";


export default class Compacto extends Vehiculo {

    constructor(km: number, matricula: string) {
        super(km, matricula);
        this.tarifaBase = TARIFA_BASE_COMPACTO;
        this.cargoVariable = CARGO_VARIABLE_COMPACTO;
    }

    // tal vez es mejor que reciba ya los kms asi no depende de reserva
    public calcularTarifa(kmsRecorridos: number): number {
        let total: number = this.tarifaBase;
        if (kmsRecorridos > KM_MAX_COMPACTO) {
            let excedente: number = kmsRecorridos - KM_MAX_COMPACTO;
            total += excedente * this.cargoVariable;
        } 
        return total;
    }
}