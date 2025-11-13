/*SUV: Tarifa base de $80 por día. Aplica un cargo fijo adicional de $15 por día por
concepto de seguro y un cargo de $0.25 por cada kilómetro recorrido si se superan
los 500km en total durante el período de alquiler. */
import Vehiculo from "./vehiculo"
import Estado from "./estado";
import { TARIFA_BASE_SUV, CARGO_FIJO_SUV, CARGO_VARIABLE_SUV, KM_MAX_SUV } from "./constantes";

export default class Suv extends Vehiculo {

    constructor(km: number, matricula: string, estado:Estado) {
        super(km, matricula,estado);
        this.tarifaBase = TARIFA_BASE_SUV;
        this.cargoFijo = CARGO_FIJO_SUV;
        this.cargoVariable = CARGO_VARIABLE_SUV;
    }

    calcCargoVariable(kmsRecorridos: number): number {
        let cargo: number = 0;
        if (kmsRecorridos > KM_MAX_SUV) {
            let excedente: number = kmsRecorridos - KM_MAX_SUV;
            cargo += excedente * this.getCargoVariable();
        }
        return cargo;
    }
}

