import Vehiculo from "../vehiculos/vehiculo";
import { Estado } from "./estado";
//import { EnMantenimiento } from "./enMantenimiento";
import { NecesitaLimpieza } from "./necesitaLimpieza";

/**
 * Clase que representa el estado EnAlquiler de un vehículo.
 * En este estado el vehículo solo puede ser devuelto, no puede ser alquilado nuevamente ni enviado a mantenimiento.
 */
export class EnAlquiler implements Estado {

    /**
     * Intenta alquilar el vehículo.
     * @param {Vehiculo} vehiculo - El vehículo a alquilar
     * @returns {void}
     * @throws {Error} El vehiculo ya se encuentra en alquiler
     */
     public alquilar(vehiculo:Vehiculo): void {
        throw new Error("El vehiculo ya se encuentra en alquiler");
    }

    /**
     * Devuelve el vehículo cambiando su estado a NecesitaLimpieza.
     * @param {Vehiculo} vehiculo - El vehículo a devolver
     * @returns {void}
    */
    public devolver(vehiculo:Vehiculo): void {
       vehiculo.setEstado(new NecesitaLimpieza());
    }

    /**
     * Intenta enviar el vehículo a mantenimiento.
     * @param {Vehiculo} vehiculo - El vehículo a enviar a mantenimiento
     * @returns {void}
     * @throws {Error} No se puede enviar a mantenimiento: el vehículo está en uso
     */
    public enviarMantenimiento(vehiculo:Vehiculo): void {
        throw new Error("No se puede enviar a mantenimiento: el vehículo está en uso");
    } 

    /**
     * Intenta finalizar el mantenimiento del vehículo.
     * @param {Vehiculo} vehiculo - El vehículo que finaliza mantenimiento
     * @returns {void}
     * @throws {Error} El vehiculo no se encuentra en mantenimiento
     */
    public finalizarMantenimiento(vehiculo:Vehiculo): void {
        throw new Error("El vehiculo no se encuentra en mantenimiento");
    }

     /**
     * Intenta limpiar el vehículo.
     * @param {Vehiculo} vehiculo - El vehículo a limpiar
     * @returns {void}
     * @throws {Error} No se puede limpiar: el vehículo está en uso
     */
    public limpiar(vehiculo:Vehiculo): void {
        throw new Error("No se puede limpiar: el vehículo está en uso");
    }

    /**
     * Verifica si el vehículo está en estado de alquiler.
     * @returns {boolean} true, ya que el vehículo está alquilado
     */
    public estaEnAlquiler(): boolean {
        return true;
    }

}