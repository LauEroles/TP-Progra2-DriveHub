import Vehiculo from "./vehiculo";
import Cliente from "./cliente";

export default class Reserva {
    // tal vez sea mejor depender de tipos nativos que de clases concretas
    public matriculaVehiculo: string;
    public idCliente: number;
    public fechaInicio: Date;
    public fechaFin: Date;
    public kmRecorridos: number;

    constructor(fechaInicio: Date, fechaFin: Date, matricula: string, cliente: number) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.matriculaVehiculo = matricula;
        this.idCliente = cliente;
        this.kmRecorridos = 0;
    }

    // public validarFecha(): boolean {
    //     let fechaValida: boolean = true;
    //     if (this.getFechaFin() < this.getFechaInicio()) {
    //         fechaValida = false;
    //     }
    //     return fechaValida;
    // }

    public getMatriculaVehiculo() {
        return this.matriculaVehiculo;
    }

    public getIdCliente() {
        return this.idCliente;
    }
    
    public getFechaInicio() {
        return this.fechaInicio;
    }

    public getFechaFin() {
        return this.fechaFin;
    }

    public getKmRecorridos() {
        return this.kmRecorridos;
    }

    public setKmRecorridos(km: number) {
       this.kmRecorridos = km;
    }
}