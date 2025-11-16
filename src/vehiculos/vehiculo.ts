
import Reserva from "../reserva"
import MantenimientoVehiculo from "../mantenimientoVehiculo";
import { Estado } from "../estados/estado";
import { Disponible } from "../estados/disponible";
import {EnAlquiler} from "../estados/enAlquiler";
import { EnMantenimiento} from "../estados/enMantenimiento";
import {NecesitaLimpieza} from "../estados/necesitaLimpieza";    


/**
 * Clase abstracta que representa un vehículo dentro del sistema.
 * Contiene información de tarifas, estado, mantenimiento y kilometraje.
 * Las clases concretas deben implementar el cálculo del cargo variable.
 */


export default abstract class Vehiculo {
    protected tarifaBase: number;
    protected cargoVariable: number;
    protected cargoFijo: number;
    protected kilometraje: number;
    protected matricula: string;
    protected estado: Estado;
    protected mantenimientos: MantenimientoVehiculo[];
    protected cantidadAlquileresDesdeMantenimiento: number;


    /**
     * Crea un nuevo vehículo.
     * @param km Kilometraje inicial del vehículo.
     * @param matricula Identificador único del vehículo.
     * @param estadoInicial Estado inicial del vehículo (Disponible, EnAlquiler, etc.).
     */

    constructor(km:number, matricula:string,estadoInicial:Estado) {
        this.tarifaBase=0;
        this.cargoVariable=0;
        this.cargoFijo=0;
        this.kilometraje=km;
        this.matricula=matricula;
        this.estado=estadoInicial;
        this.mantenimientos = [];
        this.cantidadAlquileresDesdeMantenimiento = 0;

    }

    /** @returns Tarifa base del vehículo. */

    public getTarifaBase(): number {
        return this.tarifaBase;
    }

    /** @param tarifaBase Nueva tarifa base. */

    public setTarifaBase(tarifaBase: number): void {
        this.tarifaBase = tarifaBase;
    }

    /** @returns Cargo variable por kilómetro. */
    public getCargoVariable(): number {
        return this.cargoVariable;
    }

    /** @param cargoVariable Nuevo cargo variable. */

    public setCargoVariable(cargoVariable: number): void {
        this.cargoVariable = cargoVariable;
    }

    /** @returns Cargo fijo del vehículo. */

    public getCargoFijo(): number {
        return this.cargoFijo;
    }

    /** @param cargoFijo Nuevo cargo fijo. */

    public setCargoFijo(cargoFijo: number): void {
        this.cargoFijo = cargoFijo;
    }

    /** @returns Kilometraje actual del vehículo. */
    public getKm(): number {
        return this.kilometraje;
    }

     /** @param km Nuevo kilometraje. */
    public setKm(km: number): void {
        this.kilometraje = km;
    }

     /** @returns Matrícula del vehículo. */

    public getMatricula(): string {
        return this.matricula;
    }

    /** @param matricula Nueva matrícula. */

    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }

    /** @param estado Nuevo estado del vehículo. */

    public setEstado(estado: Estado):void{
        this.estado = estado;
    }

     /** @returns Estado actual del vehículo. */
    public getEstado():Estado{
        return this.estado;
    }

     /**
     * Registra un mantenimiento realizado al vehículo.
     * Reinicia el contador de alquileres desde el último mantenimiento.
     * @param mantenimiento Información del mantenimiento realizado.
     */

    public agregarMantenimientoVehiculo(mantenimiento: MantenimientoVehiculo): void {
        this.mantenimientos.push(mantenimiento);
        this.cantidadAlquileresDesdeMantenimiento = 0;

    }

     /**
     * Método abstracto a implementar por cada tipo de vehículo.
     * Calcula el cargo variable según los kilómetros recorridos.
     * @param kmsRecorridos Kilómetros realizados en el alquiler.
     */

    abstract calcCargoVariable(kmsRecorridos: number): number;

    /** Intenta alquilar el vehículo según su estado actual. */

    public alquilar():void{
        this.estado.alquilar(this);
    }
    
     /** Devuelve el vehículo y aumenta el contador de alquileres. */
    public devolver():void{
        this.estado.devolver(this);
         this.cantidadAlquileresDesdeMantenimiento++;

    } 
    /** Envía el vehículo a mantenimiento según su estado actual. */

    public enviarMantenimiento():void{
        this.estado.enviarMantenimiento(this);
    }
    
    /** Finaliza el mantenimiento del vehículo. */
    public finalizarMantenimiento():void{    
        this.estado.finalizarMantenimiento(this);   
    }

    /** Limpia el vehículo según su estado actual. */
    public limpiar():void{
        this.estado.limpiar(this);
    }

    /**
     * Determina si el vehículo requiere mantenimiento.
     * Evalúa: límite de km, cantidad de alquileres y tiempo desde el último mantenimiento.
     * @returns True si requiere mantenimiento, false en caso contrario.
     */

    public requiereMantenimiento(): boolean {
        const LIMITE_KM = 10000;
        const LIMITE_DIAS = 180;
        const LIMITE_ALQUILERES = 5;

        //  Si nunca tuvo mantenimiento, solo se evalúan los límites de km y alquileres
        if (!this.mantenimientos.length) {
            const superaLimitesIniciales =
                this.kilometraje >= LIMITE_KM ||
                this.cantidadAlquileresDesdeMantenimiento >= LIMITE_ALQUILERES;
            return superaLimitesIniciales;
        }

        //  Si ya tuvo mantenimientos, se considera también el tiempo desde el último
        const ultimo = this.mantenimientos[this.mantenimientos.length - 1];
        const fechaUltimo = ultimo.getFecha();
        const hoy = new Date();

        const diferenciaDias =
            (hoy.getTime() - fechaUltimo.getTime()) / (1000 * 60 * 60 * 24);

        const superaKm = this.kilometraje >= LIMITE_KM;
        const superaTiempo = diferenciaDias >= LIMITE_DIAS;
        const superaAlquileres =
            this.cantidadAlquileresDesdeMantenimiento >= LIMITE_ALQUILERES;

        //  Si se supera cualquiera de los límites, el vehículo requiere mantenimiento
        const requiere = superaKm || superaTiempo || superaAlquileres;
        return requiere;
    }

    /** Reinicia el kilometraje del vehículo. */

    public resetearKm(): void {
        this.kilometraje = 0;
    }


    /**
     * Calcula el costo total acumulado en mantenimientos.
     * @returns Suma de todos los costos de mantenimiento realizados.
     */
    
    public getCostoTotalMantenimiento(): number {
        if (!this.mantenimientos || this.mantenimientos.length === 0) {
            return 0;
        }
        return this.mantenimientos.reduce((sum, m) => sum + m.getCostoMantenimiento(), 0);
    }

}
