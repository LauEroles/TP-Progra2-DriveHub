
import Reserva from "./reserva";
import Vehiculo from "./vehiculo";
import { KM_MAX_COMPACTO } from "./constantes";


export default class Compacto extends Vehiculo {
    

    constructor(km: number, matricula: string) {
        super(km, matricula);
        this.tarifaBase = 30;
        this.cargoVariable = 0.15;

    }

    calcularTarifa(reserva: Reserva): number {
        //ajustar segun arreglos kilometraje?
        let total: number = this.tarifaBase;
        let kmsRecorridos: number = this.kmFinal - this.kmInicial;
        if (kmsRecorridos > KM_MAX_COMPACTO) {
            let excedente: number = kmsRecorridos - this.kmMax;
            total += excedente * this.cargoVariable;
        } 
        return total;
    }
}