
import Reserva from "./reserva"
import MantenimientoVehiculo from "./mantenimientoVehiculo";
import { Estado } from "./estados/estado";
import { Disponible } from "./estados/disponible";
import {EnAlquiler} from "./estados/enAlquiler";
import { EnMantenimiento} from "./estados/enMantenimiento";
import {NecesitaLimpieza} from "./estados/necesitaLimpieza";    


export default abstract class Vehiculo {
    protected tarifaBase: number;
    protected cargoVariable: number;
    protected cargoFijo: number;
    protected kilometraje: number;
    protected matricula: string;
    protected estado: Estado;
    protected mantenimientos: MantenimientoVehiculo[];
    protected cantidadAlquileresDesdeMantenimiento: number;



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

    public getTarifaBase(): number {
        return this.tarifaBase;
    }

    public setTarifaBase(tarifaBase: number): void {
        this.tarifaBase = tarifaBase;
    }

    public getCargoVariable(): number {
        return this.cargoVariable;
    }

    public setCargoVariable(cargoVariable: number): void {
        this.cargoVariable = cargoVariable;
    }

    public getCargoFijo(): number {
        return this.cargoFijo;
    }

    public setCargoFijo(cargoFijo: number): void {
        this.cargoFijo = cargoFijo;
    }

    public getKm(): number {
        return this.kilometraje;
    }

    public setKm(km: number): void {
        this.kilometraje = km;
    }

    public getMatricula(): string {
        return this.matricula;
    }

    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }

    public setEstado(estado: Estado):void{
        this.estado = estado;
    }

    public getEstado():Estado{
        return this.estado;
    }

    public agregarMantenimientoVehiculo(mantenimiento: MantenimientoVehiculo): void {
        this.mantenimientos.push(mantenimiento);
        this.cantidadAlquileresDesdeMantenimiento = 0;

    }

    abstract calcCargoVariable(kmsRecorridos: number): number;

    public alquilar():void{
        this.estado.alquilar(this);
    }
    
    public devolver():void{
        this.estado.devolver(this);
         this.cantidadAlquileresDesdeMantenimiento++;

    } 

    public enviarMantenimiento():void{
        this.estado.enviarMantenimiento(this);
    }
    
    public finalizarMantenimiento():void{    
        this.estado.finalizarMantenimiento(this);   
    }

    public limpiar():void{
        this.estado.limpiar(this);
    }

    public requiereMantenimiento(): boolean {
    const LIMITE_KM = 10000;
    const LIMITE_DIAS = 180;
    const LIMITE_ALQUILERES = 5;

    // 🚗 Si nunca tuvo mantenimiento, solo se evalúan los límites de km y alquileres
    if (!this.mantenimientos.length) {
        const superaLimitesIniciales =
            this.kilometraje >= LIMITE_KM ||
            this.cantidadAlquileresDesdeMantenimiento >= LIMITE_ALQUILERES;
        return superaLimitesIniciales;
    }

    // 🧰 Si ya tuvo mantenimientos, se considera también el tiempo desde el último
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

public resetearKm(): void {
    this.kilometraje = 0;
}

}