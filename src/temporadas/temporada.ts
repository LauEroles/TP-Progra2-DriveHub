/**
 * Interface que define el contrato para las diferentes temporadas de alquiler.
 * Permite calcular tarifas ajustadas según la temporada del año.
 */
export default interface Temporada {
     
    /**
     * Calcula la tarifa base ajustada según la temporada.
     * @param {number} tarifa - La tarifa base sin ajuste de temporada
     * @returns {number} La tarifa ajustada según la temporada
     */
    calcTarifaBase(tarifa: number): number;
}