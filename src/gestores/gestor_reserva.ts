import ABM from "../abm";
import Reserva from "../reserva";
import Vehiculo from "../../src/vehiculos/vehiculo";

/**
* Gestor de reservas que implementa operaciones de ABM.
* Permite agregar, eliminar reservas y verificar disponibilidad de vehículos.
*/
export default class GestorReserva implements ABM {

    /**
    * Agrega una reserva a la lista de reservas.
    * @template Reserva Tipo de la reserva.
    * @param {Reserva} reserva Reserva a agregar.
    * @param {Array<Reserva>} reservas Lista de reservas donde se agregará.
    */
    public agregar<Reserva>(reserva: Reserva, reservas: Array<Reserva>): void {
        reservas.push(reserva);
    }

    /**
    * Elimina una reserva de la lista de reservas.
    * @template Reserva Tipo de la reserva.
    * @param {Reserva} reserva Reserva a eliminar.
    * @param {Array<Reserva>} reservas Lista de reservas de donde se eliminará.
    */
    public eliminar<Reserva>(reserva: Reserva, reservas: Array<Reserva>): void {
        let index: number = reservas.indexOf(reserva);
        reservas.splice(index, 1);
    }
    
    /**
    * Verifica si un vehículo está disponible entre dos fechas dadas.
    * @param {Date} fechaInicio Fecha de inicio del periodo de reserva.
    * @param {Date} fechaFin Fecha de fin del periodo de reserva.
    * @param {Vehiculo} vehiculo Vehículo a verificar.
    * @param {Array<Reserva>} reservas Lista de reservas existentes.
    * @returns {boolean} True si el vehículo está disponible, false si hay solapamiento.
    */
    public hayDisponibilidad(fechaInicio: Date, fechaFin: Date, vehiculo: Vehiculo, reservas: Array<Reserva>): boolean {        
        return !reservas.some(reserva => {
            let mismoVehiculo: boolean = reserva.getVehiculo().getMatricula() === vehiculo.getMatricula();
            let fechasSolapadas: boolean = fechaInicio <= reserva.getFechaFin() && fechaFin >= reserva.getFechaInicio();
            return mismoVehiculo && fechasSolapadas;
        })
    }
    
}
