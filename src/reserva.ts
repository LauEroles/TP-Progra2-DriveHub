// Agregar KMFinal

import Vehiculo from "./vehiculo";
import Cliente from "./cliente";

export default class Reserva{


    public vehiculo: Vehiculo;
    public cliente: Cliente;
    public fechaInicio: number;
    public fechaFin: number;
    public kmFinal: number;

    constructor(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: number, fechaFin: number){

        if (fechaFin < fechaInicio){
            throw new Error(`La fecha final no puede ser menor que la fecha inicial`);
        }

        this.vehiculo = vehiculo;
        this.cliente = cliente;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.kmFinal = 0;
    }


    public getVehiculo(){

        return this.vehiculo;

    }

    public getCliente(){
        return this.cliente;
    }
    
    public getFechaInicio(){
        return this.fechaInicio;
    }

    public getFechaFin(){
        return this.fechaFin;
    }

}