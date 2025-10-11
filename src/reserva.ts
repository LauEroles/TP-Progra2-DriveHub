import Vehiculo from "./vehiculo";
import Cliente from "./cliente";

export default class Reserva {

    public vehiculo: Vehiculo;
    public cliente: Cliente;
    public fechaInicio: Date;
    public fechaFin: Date;
    public kmFinal: number;

    constructor(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date) {

        if (fechaFin < fechaInicio) {
            throw new Error(`La fecha final no puede ser menor que la fecha inicial`);
        }

        this.vehiculo = vehiculo;
        this.cliente = cliente;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.kmFinal = 0;
    }


    public getVehiculo() {
        return this.vehiculo;
    }

    public getCliente() {
        return this.cliente;
    }
    
    public getFechaInicio() {
        return this.fechaInicio;
    }

    public getFechaFin() {
        return this.fechaFin;
    }

    public getKmFinal() {
        return this.kmFinal;
    }

    public setKmFinal(kmFinal: number) {
        if (kmFinal < this.vehiculo.getKm()) {
            throw new Error(`El kilometraje final no puede ser menor que el inicial`);
        }
        this.kmFinal = kmFinal;
    }
}