import Vehiculo from "../vehiculo";
import { Estado } from "./estado";
import { EnAlquiler } from "./enAlquiler";
import { EnMantenimiento } from "./enMantenimiento";
import { NecesitaLimpieza } from "./necesitaLimpieza";

/**
 * Clase que representa el estado Disponible de un vehículo.
 * En este estado el vehículo puede ser alquilado o enviado a mantenimiento.
 */
export class Disponible implements Estado {

    /**
     * Alquila el vehículo cambiando su estado a EnAlquiler.
     * @param {Vehiculo} vehiculo - El vehículo a alquilar
     * @returns {void}
     */
    public alquilar(vehiculo:Vehiculo): void {
        vehiculo.setEstado(new EnAlquiler());
    
    }

     /**
     * Intenta devolver el vehículo.
     * @param {Vehiculo} vehiculo - El vehículo a devolver
     * @returns {void}
     * @throws {Error} El vehiculo ya se encuentra disponible
     */
    public devolver(vehiculo:Vehiculo): void {
        throw new Error("El vehiculo ya se encuentra disponible");
    }

     /**
     * Envía el vehículo a mantenimiento cambiando su estado a EnMantenimiento.
     * @param {Vehiculo} vehiculo - El vehículo a enviar a mantenimiento
     * @returns {void}
     */
    public enviarMantenimiento(vehiculo:Vehiculo): void {
        vehiculo.setEstado(new EnMantenimiento());
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
     * Cambia el estado del vehículo a NecesitaLimpieza.
     * @param {Vehiculo} vehiculo - El vehículo a limpiar
     * @returns {void}
     */
    public limpiar(vehiculo:Vehiculo): void {
        vehiculo.setEstado(new NecesitaLimpieza());
    }

     /**
     * Verifica si el vehículo está en estado de alquiler.
     * @returns {boolean} false, ya que el vehículo está disponible
     */
    public estaEnAlquiler(): boolean {
        return false;
    }

}