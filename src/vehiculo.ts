
import Reserva from "./reserva"
import { Estado } from "./estado";
import MantenimientoVehiculo from "./mantenimientoVehiculo";

export default  abstract class Vehiculo{

    protected tarifaBase: number;
    protected cargoVariable: number;
    protected cargoFijo: number;
    protected kilometraje: number;
    protected matricula: string;
    protected estado: Estado;

    constructor(km:number, matricula:string, protected mantenimientos : MantenimientoVehiculo[]=[]){
        this.tarifaBase=0;
        this.cargoVariable=0;
        this.cargoFijo=0;
        this.kilometraje=km;
        this.matricula=matricula;
        this.estado=Estado.DISPONIBLE;

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


    public agregarManteniminentoVehiculo(mantenimiento: MantenimientoVehiculo): void {
        if (!this.mantenimientos) {
            this.mantenimientos = [];
        }
        this.mantenimientos.push(mantenimiento);
    }

    abstract calcularTarifa(reserva:Reserva):number;
}