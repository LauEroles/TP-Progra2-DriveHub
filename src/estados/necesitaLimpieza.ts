import Vehiculo from "../vehiculo";
import { Estado } from "./estado";
import {Disponible} from "./disponible";
import { EnAlquiler } from "./enAlquiler";
import { EnMantenimiento } from "./enMantenimiento";

export class NecesitaLimpieza implements Estado {

    public alquilar(vehiculo:Vehiculo): void {
        throw new Error("No se puede alquilar: el vehículo necesita limpieza");
    }

    public devolver(vehiculo:Vehiculo): void {
        throw new Error("El vehiculo ya se encuentra disponible");
    }

    public enviarMantenimiento(vehiculo:Vehiculo): void {
        throw new Error("El vehiculo necesirta limpieza");
    }

    public finalizarMantenimiento(vehiculo:Vehiculo): void {
        throw new Error("El vehiculo no se encuentra en mantenimiento");
    }

    public limpiar(vehiculo:Vehiculo): void {
        vehiculo.setEstado(new Disponible());
    }
}