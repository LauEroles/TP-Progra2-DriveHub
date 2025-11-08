import Vehiculo from "./vehiculo";
import Cliente from "./cliente";

export default class Reserva {

    public vehiculo: Vehiculo;
    public cliente: Cliente;
    public fechaInicio: Date;
    public fechaFin: Date;
    public kmsRecorridos: number;

    constructor(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date) {
        this.vehiculo = vehiculo;
        this.cliente = cliente;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.kmsRecorridos = 0;
    }

    public validarFecha(): boolean {
        let fechaValida: boolean = true;
        if (this.getFechaFin() < this.getFechaInicio()) {
            fechaValida = false;
        }
        return fechaValida;
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

    public getKmsRecorridos() {
        return this.kmsRecorridos;
    }

    public setKmsRecorridos(kmRecorrido: number) {
        if (kmRecorrido <= 0) {
            throw new Error(`El kilometro recorrido no puede ser menor a cero`);
        }
        this.kmsRecorridos = kmRecorrido;
    }
        public getDias(): number {
        const unDiaMs = 1000 * 60 * 60 * 24; // milisegundos en un día
        const diferenciaMs = this.fechaFin.getTime() - this.fechaInicio.getTime();
        const dias = Math.floor(diferenciaMs / unDiaMs);
        return dias + 1; // incluye el día inicial
    }
}
