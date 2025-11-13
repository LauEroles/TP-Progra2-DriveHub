/*
Sedán: Tarifa base de $50 por día. Aplica un cargo de $0.20 por cada kilómetro
recorrido, sin límite diario.
*/

import Vehiculo from "./vehiculo"
import Estado from "./estado";
import { TARIFA_BASE_SEDAN, CARGO_VARIABLE_SEDAN } from "./constantes";

export default class Sedan extends Vehiculo{

    constructor(km: number, matricula: string,estado:Estado) {
        super(km, matricula);
        this.tarifaBase = TARIFA_BASE_SEDAN;
        this.cargoVariable = CARGO_VARIABLE_SEDAN;
        this.estado = estado;
    }

    calcCargoVariable(kmsRecorridos: number): number {
        let cargo: number = kmsRecorridos * this.getCargoVariable();
        return cargo;
    }
}