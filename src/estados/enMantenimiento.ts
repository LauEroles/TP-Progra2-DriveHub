import Vehiculo from "../vehiculos/vehiculo";
import { Estado } from "./estado";
import { Disponible } from "./disponible";

/**
 * Clase que representa el estado EnMantenimiento de un vehículo.
 * En este estado el vehículo solo puede finalizar su mantenimiento para volver a estar disponible.
 */
export class EnMantenimiento implements Estado {

    /**
     * Intenta alquilar el vehículo.
     * @param {Vehiculo} vehiculo - El vehículo a alquilar
     * @returns {void}
     * @throws {Error} No se puede alquilar: el vehículo está en mantenimiento
     */
    public alquilar(vehiculo: Vehiculo): void {
        throw new Error("No se puede alquilar: el vehículo está en mantenimiento");
    }

       /**
     * Intenta devolver el vehículo.
     * @param {Vehiculo} vehiculo - El vehículo a devolver
     * @returns {void}
     * @throws {Error} No se puede devolver: el vehículo no está alquilado
     */
    public devolver(vehiculo: Vehiculo): void {
        throw new Error("No se puede devolver: el vehículo no está alquilado");
    }

     /**
     * Intenta enviar el vehículo a mantenimiento.
     * @param {Vehiculo} vehiculo - El vehículo a enviar a mantenimiento
     * @returns {void}
     * @throws {Error} El vehículo ya está en mantenimiento
     */
    public enviarMantenimiento(vehiculo: Vehiculo): void {
        throw new Error("El vehículo ya está en mantenimiento");
    }

    /**
     * Finaliza el mantenimiento del vehículo cambiando su estado a Disponible.
     * @param {Vehiculo} vehiculo - El vehículo que finaliza mantenimiento
     * @returns {void}
     */
    public finalizarMantenimiento(vehiculo: Vehiculo): void {
        vehiculo.setEstado(new Disponible());
    }

    /**
     * Intenta limpiar el vehículo.
     * @param {Vehiculo} vehiculo - El vehículo a limpiar
     * @returns {void}
     * @throws {Error} No se puede limpiar: el vehículo está en mantenimiento
     */
    public limpiar(vehiculo: Vehiculo): void {
        throw new Error("No se puede limpiar: el vehículo está en mantenimiento");
    }

    /**
     * Verifica si el vehículo está en estado de alquiler.
     * @returns {boolean} false, ya que el vehículo está en mantenimiento
     */
    public estaEnAlquiler(): boolean {
        return false;
    }

}