/*SUV: Tarifa base de $80 por día. Aplica un cargo fijo adicional de $15 por día por
concepto de seguro y un cargo de $0.25 por cada kilómetro recorrido si se superan
los 500km en total durante el período de alquiler. */
import Vehiculo from "./vehiculo";
import {Estado} from "../../src/estados/estado";

import { TARIFA_BASE_SUV, CARGO_FIJO_SUV, CARGO_VARIABLE_SUV, KM_MAX_SUV } from "../../src/constantes";

/**
 * Representa un vehículo de tipo SUV dentro del sistema.
 * Tiene una tarifa base diaria, un cargo fijo y un cargo variable.
 */


export default class Suv extends Vehiculo {

   /**
     * Crea un vehículo SUV.
     * @param km Kilometraje actual del vehículo.
     * @param matricula Matrícula del vehículo.
     * @param estado Estado actual del vehículo.
     */

    constructor(km: number, matricula: string, estado:Estado) {
        super(km, matricula,estado);
        this.tarifaBase = TARIFA_BASE_SUV;
        this.cargoFijo = CARGO_FIJO_SUV;
        this.cargoVariable = CARGO_VARIABLE_SUV;
    }

    /**
     * Calcula el cargo variable en función de los kilómetros recorridos.
     * Solo se aplica si se superan los kilómetros establecidos para SUV.
     *
     * @param kmsRecorridos Total de kilómetros recorridos durante el alquiler.
     * @returns Monto correspondiente al cargo variable.
     */

    
    calcCargoVariable(kmsRecorridos: number): number {
        let cargo: number = 0;
        if (kmsRecorridos > KM_MAX_SUV) {
            let excedente: number = kmsRecorridos - KM_MAX_SUV;
            cargo += excedente * this.getCargoVariable();
        }
        return cargo;
    }
}

