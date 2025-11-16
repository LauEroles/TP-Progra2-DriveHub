import Vehiculo from "../src/vehiculos/vehiculo";
import Cliente from "./cliente";
import Temporada from "../src/temporadas/temporada";
import TempAlta from "../src/temporadas/tempAlta";
import TempBaja from "../src/temporadas/tempBaja";
import TempMedia from "../src/temporadas/tempMedia";


/**
 * Representa una reserva realizada por un cliente para un vehículo,
 * incluyendo información de fechas, temporada, kilómetros recorridos
 * y temporada.
 */

export default class Reserva {
    public vehiculo: Vehiculo;
    public cliente: Cliente;
    public fechaInicio: Date;
    public fechaFin: Date;
    public kmsRecorridos: number;
    public temporada: Temporada;


   /**
     * Crea una nueva reserva asociando un vehículo y un cliente.
     * La temporada se determina posteriormente.      
     * @param {Vehiculo} vehiculo Vehículo reservado.
     * @param {Cliente} cliente Cliente que realiza la reserva.
     * @param {Date} fechaInicio Fecha de inicio de la reserva.
     * @param {Date} fechaFin Fecha de fin de la reserva.
     */

    constructor(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date) {
        this.vehiculo = vehiculo;
        this.cliente = cliente;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.kmsRecorridos = 0;
        this.temporada = undefined as unknown as Temporada;
    }


 /**
     * Obtiene la temporada asignada a la reserva.
     * @returns {Temporada} Temporada correspondiente a la fecha de la reserva.
     */
    public getTemporada(): Temporada {
        return this.temporada;
    }


   /**
     * Determina la temporada (alta, media o baja) según el mes de la fecha de inicio.
     * @returns {void}
     */    


    public setTemporada(): void {
        let mes: number = this.fechaInicio.getMonth() + 1;
        if ([12, 1, 2, 7].includes(mes)) {
            this.temporada = new TempAlta();
        } else if ([3, 4, 11].includes(mes)) {
            this.temporada = new TempMedia();
        } else {
            this.temporada = new TempBaja();
        }
    }


    /**
     * Calcula el costo total de la reserva sumando:
     * - Tarifa base según temporada
     * - Cargo fijo por día
     * - Cargo variable por kilómetros recorridos
     * 
     * @returns {number} Costo total de la reserva.
     */   


    public calcularTotal(): number {
        let total: number = this.temporada.calcTarifaBase(this.vehiculo.getTarifaBase());
        total = total * this.getDias() + this.vehiculo.getCargoFijo() * this.getDias() + this.vehiculo.calcCargoVariable(this.getKmsRecorridos());
        return total;
    }

   /**
     * Verifica que la fecha fin sea posterior o igual a la fecha inicio.
     * @returns {boolean} `true` si la fecha es válida, `false` si es inválida.
     */

    public validarFecha(): boolean {
        let fechaValida: boolean = true;
        if (this.getFechaFin() < this.getFechaInicio()) {
            fechaValida = false;
        }
        return fechaValida;
    }


  /** 
   * Obtiene el vehículo reservado.
   * @returns {Vehiculo} Vehículo reservado. */   
    public getVehiculo() {
        return this.vehiculo;
    }



  /** 
   * Obtiene el cliente de la reserva.
   * @returns {Cliente} Cliente que realizó la reserva. */   
    public getCliente() {
        return this.cliente;
    }
    

 /** 
  * Obtiene la fecha inicial de la reserva.
  * @returns {Date} Fecha de inicio de la reserva. */

    public getFechaInicio() {
        return this.fechaInicio;
    }


/** 
 * Obtiene la fecha final de la reserva.
 * @returns {Date} Fecha de fin de la reserva. */   

    public getFechaFin() {
        return this.fechaFin;
    }

/** 
 * Obtiene los kilómetros Recorridos durante la reserva
 * @returns {number} Kilómetros recorridos durante la reserva. */   

    public getKmsRecorridos() {
        return this.kmsRecorridos;
    }


  /**
     * Establece los kilómetros recorridos durante la reserva.
     * 
     * @param {number} kmRecorrido Cantidad de kilómetros recorridos.
     * @throws {Error} Si el valor es menor o igual a cero.
     */

    public setKmsRecorridos(kmRecorrido: number) {
        if (kmRecorrido <= 0) {
            throw new Error(`El kilometro recorrido no puede ser menor a cero`);
        }
        this.kmsRecorridos = kmRecorrido;
    }


    /** 
     * Establece un vehículo asociado a la reserva.
     * @param {Vehiculo} vehiculo Nuevo vehículo asociado a la reserva. */    
    public setVehiculo(vehiculo: Vehiculo): void {
        this.vehiculo = vehiculo;
    }

    /** 
     * Establece al cliente asociado a la reserva.
     * @param {Cliente} cliente Nuevo cliente asociado a la reserva. */  
     
    public setCliente(cliente: Cliente): void {
        this.cliente = cliente;
    }


    /** 
     * Establece la fecha inicio de la Reserva.
    @param {Date} fechaInicio Nueva fecha de inicio. */

    public setFechaInicio(fechaInicio: Date): void {
        this.fechaInicio = fechaInicio;
    }


  /** 
   * Establece la fecha fin de la reserva.
   * @param {Date} fechaFin Nueva fecha de fin. */  
    public setFechaFin(fechaFin: Date): void {
        this.fechaFin = fechaFin;
    }

    /**
     * Calcula la cantidad de días de la reserva (se incluye inicio y fin).
     * @returns {number} Días totales de la reserva.
     */

    public getDias(): number {
        const unDiaMs = 1000 * 60 * 60 * 24; 
        const diferenciaMs = this.fechaFin.getTime() - this.fechaInicio.getTime();
        const dias = Math.floor(diferenciaMs / unDiaMs);
        return dias + 1; 
    }
    
}
