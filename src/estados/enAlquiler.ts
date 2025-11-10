import Vehiculo from "../vehiculo";
import { Estado } from "./estado";
//import { EnMantenimiento } from "./enMantenimiento";
import { NecesitaLimpieza } from "./necesitaLimpieza";


export class EnAlquiler implements Estado {

     public alquilar(vehiculo:Vehiculo): void {
        throw new Error("El vehiculo ya se encuentra en alquiler");
    }

    public devolver(vehiculo:Vehiculo): void {
       vehiculo.setEstado(new NecesitaLimpieza());
    }

    public enviarMantenimiento(vehiculo:Vehiculo): void {
        throw new Error("No se puede enviar a mantenimiento: el vehículo está en uso");
    } 

    public finalizarMantenimiento(vehiculo:Vehiculo): void {
        throw new Error("El vehiculo no se encuentra en mantenimiento");
    }

    public limpiar(vehiculo:Vehiculo): void {
        throw new Error("No se puede limpiar: el vehículo está en uso");
    }
}