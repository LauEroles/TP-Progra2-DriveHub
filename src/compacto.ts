/*Tarifa base de $30 por día. Aplica un cargo de $0.15 por cada kilómetro
recorrido si se superan los 100 km por día de alquiler.*/
import Vehiculo from "./vehiculo";
import { KM_MAX_COMPACTO, TARIFA_BASE_COMPACTO, CARGO_VARIABLE_COMPACTO } from "./constantes";
import { Estado } from "./estados/estado";

export default class Compacto extends Vehiculo {
    
    constructor(km: number, matricula: string, estadoInicial: Estado) {
        super(km, matricula,estadoInicial);
        this.tarifaBase = TARIFA_BASE_COMPACTO;
        this.cargoVariable = CARGO_VARIABLE_COMPACTO;
    }

    calcCargoVariable(kmsRecorridos: number): number {
        let cargo: number = 0;
        if (kmsRecorridos > KM_MAX_COMPACTO) {
            let excedente: number = kmsRecorridos - KM_MAX_COMPACTO;
            cargo += excedente * this.getCargoVariable();
        }
        return cargo;
    }
}