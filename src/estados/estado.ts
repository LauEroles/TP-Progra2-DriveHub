import  Vehiculo  from "../vehiculo.js";
/**
 * Interface que define el contrato para los diferentes estados de un vehículo.
 * Implementa el patrón State para gestionar las transiciones de estado de los vehículos.
 */
export interface Estado {
    
     /**
     * Alquila un vehículo cambiando su estado.
     * @param {Vehiculo} vehiculo - El vehículo a alquilar
     * @returns {void}
     * @throws {Error} Si el vehículo no puede ser alquilado en su estado actual
     */
    alquilar(vehiculo:Vehiculo): void;

     /**
     * Devuelve un vehículo cambiando su estado.
     * @param {Vehiculo} vehiculo - El vehículo a devolver
     * @returns {void}
     * @throws {Error} Si el vehículo no puede ser devuelto en su estado actual
     */
    devolver(vehiculo:Vehiculo): void;

    /**
     * Envía un vehículo a mantenimiento cambiando su estado.
     * @param {Vehiculo} vehiculo - El vehículo a enviar a mantenimiento
     * @returns {void}
     * @throws {Error} Si el vehículo no puede ser enviado a mantenimiento en su estado actual
     */
    enviarMantenimiento(vehiculo:Vehiculo): void;

    /**
     * Finaliza el mantenimiento de un vehículo cambiando su estado.
     * @param {Vehiculo} vehiculo - El vehículo que finaliza mantenimiento
     * @returns {void}
     * @throws {Error} Si el vehículo no está en mantenimiento
     */
    finalizarMantenimiento(vehiculo:Vehiculo): void;
    
    /**
     * Limpia un vehículo cambiando su estado.
     * @param {Vehiculo} vehiculo - El vehículo a limpiar
     * @returns {void}
     * @throws {Error} Si el vehículo no puede ser limpiado en su estado actual
     */
    limpiar(vehiculo:Vehiculo): void;
    
    /**
     * Verifica si el vehículo está en estado de alquiler.
     * Este método es utilizado por la clase GestorEstadisticas para generar reportes de ocupación de flota.
     * Nota: Se agregó este método de consulta intentando no romper el patrón State, 
     * permitiendo conocer el estado y realizar el conteo de los vehiculos en alquiler, sin exponer la implementación concreta del estado actual.
     * @returns {boolean} true si el vehículo está alquilado, false en caso contrario
     */    
    estaEnAlquiler(): boolean;

    
}