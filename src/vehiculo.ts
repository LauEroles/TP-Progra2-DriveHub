
import Reserva from "./reserva"
import MantenimientoVehiculo from "./mantenimientoVehiculo";
import { CARGO_FIJO_ADICIONAL_SUV, TARIFA_BASE_SUV} from "./constantes";
import { Estado } from "./estados/estado";
import { Disponible } from "./estados/disponible";
import {EnAlquiler} from "./estados/enAlquiler";
import {EnMantenimiento} from "./estados/enMantenimiento";
import {NecesitaLimpieza} from "./estados/necesitaLimpieza";    



export default abstract class Vehiculo{

    protected tarifaBase: number;
    protected cargoVariable: number;
    protected cargoFijo: number;
    protected kilometraje: number;
    protected matricula: string;
    protected estado: Estado;
    protected mantenimientos: MantenimientoVehiculo[];


    constructor(km:number, matricula:string,estadoInicial:Estado) {
        this.tarifaBase=0;
        this.cargoVariable=0;
        this.cargoFijo=0;
        this.kilometraje=km;
        this.matricula=matricula;
        this.estado=estadoInicial;
        this.mantenimientos = [];

    }


    public getTarifaBase(): number {
        return this.tarifaBase;
    }

    public setTarifaBase(TARIFA_BASE_SUV : number): void {
        this.tarifaBase = TARIFA_BASE_SUV;
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

    public setCargoFijo(CARGO_FIJO_ADICIONAL_SUV: number): void {
        this.cargoFijo = CARGO_FIJO_ADICIONAL_SUV;
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

    public setEstado(estado:Estado):void{
        this.estado=estado;
    }

    public getEstado():Estado{
        return this.estado;
    }


    public agregarManteniminentoVehiculo(mantenimiento: MantenimientoVehiculo): void {
        if (!this.mantenimientos) {
            this.mantenimientos = [];
        }
        this.mantenimientos.push(mantenimiento);
    }

    abstract calcularTarifa(reserva:Reserva):number;

    

    public alquilar():void{
        this.estado.alquilar(this);
    }
    
    public devolver():void{
        this.estado.devolver(this);
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

 
}