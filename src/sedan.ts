/*
Sedán: Tarifa base de $50 por día. Aplica un cargo de $0.20 por cada kilómetro
recorrido, sin límite diario.
*/

import Vehiculo from "./vehiculo";
import {Estado} from "./estados/estado";
import { TARIFA_BASE_SEDAN, CARGO_VARIABLE_SEDAN } from "./constantes";

/**
 * Vehículo de tipo Sedán.
 * Sedán:
 * - Tarifa base: $50 por día.
 * - Cargo variable: $0.20 por kilómetro recorrido.
 * - No posee límite diario de kilómetros.
 */


export default class Sedan extends Vehiculo{


    /**
     * Crea un vehículo Sedan con km, matrícula y estado.
     * @param {number} km Kilometraje inicial del vehículo.
     * @param {string} matricula Matrícula del vehículo.
     * @param {Estado} estado Estado actual del vehículo.
     */

    constructor(km: number, matricula: string,estado:Estado) {
        super(km, matricula, estado);
        this.tarifaBase = TARIFA_BASE_SEDAN;
        this.cargoVariable = CARGO_VARIABLE_SEDAN;
    }


  /**
     * Calcula el cargo variable según los kilómetros recorridos.
     * Para el tipo Sedán se cobra un valor fijo por km sin límites diarios.
     * @param {number} kmsRecorridos Cantidad total de kilómetros recorridos durante la reserva.
     * @returns {number} Monto total del cargo variable.
     */

    calcCargoVariable(kmsRecorridos: number): number {
        let cargo: number = kmsRecorridos * this.getCargoVariable();
        return cargo;
    }
}