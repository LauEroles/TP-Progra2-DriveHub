
import Reserva from "./reserva";
import Vehiculo from "./vehiculo";
import { KM_MAX_COMPACTO, TARIFA_BASE_COMPACTO } from "./constantes";


export default class Compacto extends Vehiculo {
    

    constructor(km: number, matricula: string) {
        super(km, matricula);
        this.tarifaBase = TARIFA_BASE_COMPACTO;
        this.cargoVariable = 0.15;

    }

    calcularTarifa(reserva: Reserva): number {
        //ajustar segun arreglos kilometraje?
        let total: number = this.tarifaBase;
        let kmsRecorridos: number = reserva.getKmFinal() - this.km;
        if (kmsRecorridos > KM_MAX_COMPACTO) {
            let excedente: number = kmsRecorridos - KM_MAX_COMPACTO;
            total += excedente * this.cargoVariable;
        } 
        return total;
    }
}