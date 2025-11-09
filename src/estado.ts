import  Vehiculo  from "./vehiculo.js";

export interface Estado {

    alquilar(vehiculo: Vehiculo): void;
    devolver(vehiculo: Vehiculo): void;
    enviarMantenimiento(vehiculo: Vehiculo): void;
    finalizarMantenimiento(vehiculo: Vehiculo): void;
    limpiar(vehiculo: Vehiculo): void;
    
}