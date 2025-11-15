import Temporada from "./temporada";

/**
 * Clase que representa la temporada baja de alquiler.
 * Aplica un descuento del 10% sobre la tarifa base.
 */
export default class TempBaja implements Temporada {
     
    /**
     * Calcula la tarifa base con un descuento del 10% para temporada baja.
     * @param {number} base - La tarifa base sin ajuste
     * @returns {number} La tarifa con descuento del 10%
     */
    calcTarifaBase(base: number): number {
        let tarifa: number = base - 10/100 * base;
        return tarifa;
    }
    
}