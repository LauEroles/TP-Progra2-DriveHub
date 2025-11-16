import Temporada from "../../src/temporadas/temporada";

/**
 * Clase que representa la temporada alta de alquiler.
 * Aplica un incremento del 20% sobre la tarifa base.
 */
export default class TempAlta implements Temporada {
    
    /**
     * Calcula la tarifa base incrementada en un 20% para temporada alta.
     * @param {number} base - La tarifa base sin ajuste
     * @returns {number} La tarifa con incremento del 20%
     */
    calcTarifaBase(base: number): number {
        let tarifa: number = base + 20/100 * base;
        return tarifa;
    }
    
}