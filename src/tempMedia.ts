import Temporada from "./temporada";

/**
 * Clase que representa la temporada media de alquiler.
 * No aplica ningún ajuste a la tarifa base.
 */
export default class TempMedia implements Temporada {
    
      /**
     * Calcula la tarifa base sin aplicar ajustes para temporada media.
     * @param {number} base - La tarifa base
     * @returns {number} La misma tarifa base sin modificaciones
     */
    calcTarifaBase(base: number): number {
        return base;
    }
    
}