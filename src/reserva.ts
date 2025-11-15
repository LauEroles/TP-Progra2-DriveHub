import Vehiculo from "./vehiculo";
import Cliente from "./cliente";
import Temporada from "./temporada";
import TempAlta from "./tempAlta";
import TempBaja from "./tempBaja";
import TempMedia from "./tempMedia";

export default class Reserva {
    public vehiculo: Vehiculo;
    public cliente: Cliente;
    public fechaInicio: Date;
    public fechaFin: Date;
    public kmsRecorridos: number;
    public temporada: Temporada;

    constructor(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date) {
        this.vehiculo = vehiculo;
        this.cliente = cliente;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.kmsRecorridos = 0;
        this.temporada = undefined as unknown as Temporada;
    }

    public getTemporada(): Temporada {
        return this.temporada;
    }

    public setTemporada(): void {
        let mes: number = this.fechaInicio.getMonth() + 1;
        if (mes in  [12, 1, 2, 7]) {
            this.temporada = new TempAlta();
        } else if (mes in [3, 4, 11]) {
            this.temporada = new TempMedia();
        } else {
            this.temporada = new TempBaja();
        }
    }

    public calcularTotal(): number {
        let total: number = this.temporada.calcTarifaBase(this.vehiculo.getTarifaBase());
        total = total * this.getDias() + this.vehiculo.getCargoFijo() * this.getDias() + this.vehiculo.calcCargoVariable(this.getKmsRecorridos());
        return total;
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

    public setVehiculo(vehiculo: Vehiculo): void {
        this.vehiculo = vehiculo;
    }

    public setCliente(cliente: Cliente): void {
        this.cliente = cliente;
    }

    public setFechaInicio(fechaInicio: Date): void {
        this.fechaInicio = fechaInicio;
    }

    public setFechaFin(fechaFin: Date): void {
        this.fechaFin = fechaFin;
    }

    public getDias(): number {
        const unDiaMs = 1000 * 60 * 60 * 24; 
        const diferenciaMs = this.fechaFin.getTime() - this.fechaInicio.getTime();
        const dias = Math.floor(diferenciaMs / unDiaMs);
        return dias + 1; 
    }
    
}
