
import Reserva from "./reserva"
import { Estado } from "./estado";
import MantenimientoVehiculo from "./mantenimientoVehiculo";

export default abstract class Vehiculo {
    protected tarifaBase: number;
    protected cargoVariable: number;
    protected cargoFijo: number;
    protected kilometraje: number;
    protected matricula: string;
    protected estado: Estado;
    protected mantenimientos: MantenimientoVehiculo[];

    constructor(km: number, matricula: string) {
        this.tarifaBase = 0;
        this.cargoVariable = 0;
        this.cargoFijo = 0;
        this.kilometraje = km;
        this.matricula = matricula;
        this.estado = Estado.DISPONIBLE;
        this.mantenimientos = [];
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
    }

    abstract calcCargoVariable(kmsRecorridos: number): number;

}