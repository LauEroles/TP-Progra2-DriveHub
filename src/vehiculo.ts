
import Reserva from "./reserva"

export default  abstract class Vehiculo{

    protected tarifaBase: number;
    protected cargoVariable: number;
    protected cargoFijo: number;
    protected km: number;
    protected matricula: string;
    //estos dos atributos les doy de alta cuando los compis creen esas clase y enum
    // estado:Estado;
    // mantenimiento:MantenimientoVehiculo;

    constructor(km:number, matricula:string){
        this.tarifaBase=0;
        this.cargoVariable=0;
        this.cargoFijo=0;
        this.km=km;
        this.matricula=matricula;
       // this.estado=estado; //es un enum esperar a que se cree
       // this.mantenimiento=newantenimientoVehiculo() // esperar a que se cree

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

    public getKmInicial(): number {
        return this.kmInicial;
    }

    public setKm(km: number): void {
        this.kmInicial = km;
    }

    public getKmRecorrido(): number {
    return this.kmRecorrido;
    }

    public setKmRecorrido(kmRecorrido: number) {
        this.kmRecorrido = kmRecorrido;
    }

    public getMatricula(): string {
        return this.matricula;
    }

    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }

    abstract calcularTarifa(reserva:Reserva):number;



}