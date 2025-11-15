import Vehiculo from "../vehiculo";
import { Estado } from "./estado";
import {Disponible} from "./disponible";
import { EnAlquiler } from "./enAlquiler";
import { EnMantenimiento } from "./enMantenimiento";

/**
 * Clase que representa el estado NecesitaLimpieza de un vehículo.
 * En este estado el vehículo debe ser limpiado antes de poder ser alquilado nuevamente.
 */
export class NecesitaLimpieza implements Estado {

     /**
     * Intenta alquilar el vehículo.
     * @param {Vehiculo} vehiculo - El vehículo a alquilar
     * @returns {void}
     * @throws {Error} No se puede alquilar: el vehículo necesita limpieza
     */
    public alquilar(vehiculo:Vehiculo): void {
        throw new Error("No se puede alquilar: el vehículo necesita limpieza");
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
     * Intenta enviar el vehículo a mantenimiento.
     * @param {Vehiculo} vehiculo - El vehículo a enviar a mantenimiento
     * @returns {void}
     * @throws {Error} El vehiculo necesita limpieza
     */
    public enviarMantenimiento(vehiculo:Vehiculo): void {
        throw new Error("El vehiculo necesita limpieza");
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
     * Limpia el vehículo cambiando su estado a Disponible.
     * @param {Vehiculo} vehiculo - El vehículo a limpiar
     * @returns {void}
     */
    public limpiar(vehiculo:Vehiculo): void {
        vehiculo.setEstado(new Disponible());
    }

     /**
     * Verifica si el vehículo está en estado de alquiler.
     * @returns {boolean} false, ya que el vehículo necesita limpieza
     */
    public estaEnAlquiler(): boolean {
        return false;
    }

}