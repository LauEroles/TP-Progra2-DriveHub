import Vehiculo from "../vehiculo";
import { Estado } from "./estado";
import { EnAlquiler } from "./enAlquiler";
import { EnMantenimiento } from "./enMantenimiento";
import { NecesitaLimpieza } from "./necesitaLimpieza";


export class Disponible implements Estado {
    
    public alquilar(vehiculo:Vehiculo): void {
        vehiculo.setEstado(new EnAlquiler());
    }

    public devolver(vehiculo:Vehiculo): void {
        throw new Error("El vehiculo ya se encuentra disponible");
    }

    public enviarMantenimiento(vehiculo:Vehiculo): void {
        vehiculo.setEstado(new EnMantenimiento());
    }

    public finalizarMantenimiento(vehiculo:Vehiculo): void {
        throw new Error("El vehiculo no se encuentra en mantenimiento");
    }

    public limpiar(vehiculo:Vehiculo): void {
        vehiculo.setEstado(new NecesitaLimpieza());
    }

}