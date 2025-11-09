import Vehiculo from "../vehiculo";
import { Estado } from "./estado";
import {Disponible} from "./disponible";
import { EnAlquiler } from "./enAlquiler";
import { EnMantenimiento } from "./enMantenimiento";


export class NecesitaLimpieza implements Estado {

    private vehiculo: Vehiculo;

    constructor(vehiculo: Vehiculo) {
        this.vehiculo = vehiculo;
    }

    public alquilar(vehiculo:Vehiculo): void {
        this.vehiculo.setEstado(new EnAlquiler(this.vehiculo));
    }

    public devolver(vehiculo:Vehiculo): void {
        throw new Error("El vehiculo ya se encuentra disponible");
    }

    public enviarMantenimiento(vehiculo:Vehiculo): void {
        this.vehiculo.setEstado(new EnMantenimiento(this.vehiculo));
    }

    public finalizarMantenimiento(vehiculo:Vehiculo): void {
        throw new Error("El vehiculo no se encuentra en mantenimiento");
    }

    public limpiar(vehiculo:Vehiculo): void {
        this.vehiculo.setEstado(new NecesitaLimpieza(this.vehiculo));
    }
}