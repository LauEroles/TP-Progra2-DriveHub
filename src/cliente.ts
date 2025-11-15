import SistemaEmpresa from "./sistemaEmpresa";
import Vehiculo from "./vehiculo";

export default class Cliente {

    private nombreCompleto: string;
    private id: number;

    constructor(nombreCompleto: string, id: number) {
        this.nombreCompleto = nombreCompleto;
        this.id = id;
    }

    public getNombreCompleto(): string {
        return this.nombreCompleto;
    }

    public setNombreCompleto(nombreCompleto: string): void {
        this.nombreCompleto = nombreCompleto;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public solicitarReserva(fechaInicio: Date, fechaFin: Date, vehiculo: Vehiculo, sistema: SistemaEmpresa) {
        sistema.realizarReserva(vehiculo, this, fechaInicio, fechaFin);
    } 

}