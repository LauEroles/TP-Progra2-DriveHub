import Vehiculo from "../vehiculo";
import { Estado } from "./estado";
import { Disponible } from "./disponible";

export class EnMantenimiento implements Estado {

    public alquilar(vehiculo: Vehiculo): void {
        throw new Error("No se puede alquilar: el vehículo está en mantenimiento");
    }

    public devolver(vehiculo: Vehiculo): void {
        throw new Error("No se puede devolver: el vehículo no está alquilado");
    }

    public enviarMantenimiento(vehiculo: Vehiculo): void {
        throw new Error("El vehículo ya está en mantenimiento");
    }

    public finalizarMantenimiento(vehiculo: Vehiculo): void {
        vehiculo.setEstado(new Disponible());
    }

    public limpiar(vehiculo: Vehiculo): void {
        throw new Error("No se puede limpiar: el vehículo está en mantenimiento");
    }
}