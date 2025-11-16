import SistemaEmpresa from "./sistemaEmpresa";
import Vehiculo from "../src/vehiculos/vehiculo";

/**
* Representa un cliente del sistema.
* Contiene información personal y permite solicitar reservas de vehículos.
*/
export default class Cliente {

    private nombreCompleto: string;
    private id: number;

    /**
    * Crea un nuevo cliente con nombre completo e ID.
    * @param {string} nombreCompleto Nombre completo del cliente.
    * @param {number} id Identificador único del cliente.
    */
    constructor(nombreCompleto: string, id: number) {
        this.nombreCompleto = nombreCompleto;
        this.id = id;
    }

    /**
    * Obtiene el nombre completo del cliente.
    * @returns {string} Nombre completo del cliente.
    */
    public getNombreCompleto(): string {
        return this.nombreCompleto;
    }

    /**
    * Modifica el nombre completo del cliente.
    * @param {string} nombreCompleto Nuevo nombre completo del cliente.
    */
    public setNombreCompleto(nombreCompleto: string): void {
        this.nombreCompleto = nombreCompleto;
    }

    /**
    * Obtiene el ID del cliente.
    * @returns {number} Identificador único del cliente.
    */
    public getId(): number {
        return this.id;
    }

    /**
    * Modifica el ID del cliente.
    * @param {number} id Nuevo identificador único del cliente.
    */
    public setId(id: number): void {
        this.id = id;
    }

    /**
    * Solicita una reserva de un vehículo en el sistema.
    * @param {Date} fechaInicio Fecha de inicio de la reserva.
    * @param {Date} fechaFin Fecha de fin de la reserva.
    * @param {Vehiculo} vehiculo Vehículo a reservar.
    * @param {SistemaEmpresa} sistema Sistema donde se realizará la reserva.
    */
    public solicitarReserva(fechaInicio: Date, fechaFin: Date, vehiculo: Vehiculo, sistema: SistemaEmpresa) {
        sistema.realizarReserva(vehiculo, this, fechaInicio, fechaFin);
    } 

}