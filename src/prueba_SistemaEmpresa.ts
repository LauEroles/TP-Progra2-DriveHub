import Reserva from "./prueba_reserva";
import Vehiculo from "./vehiculo";

export default class SistemaEmpresa {
    private vehiculos: Array<Vehiculo>;
    private reservas: Array<Reserva>;

    constructor() {
        this.vehiculos = [];
        this.reservas = [];
    }

    public getVehiculos(): Array<Vehiculo> {
        return this.vehiculos;
    }

    public getReservas(): Array<Reserva> {
        return this.reservas;
    }

    public hayDisponibilidad(fechaInicio: Date, fechaFin: Date, matriculaVehiculo: string): boolean {        
        if (!this.validarFechas(fechaInicio, fechaFin)) {
            throw new Error("La fecha de fin no puede ser menor a la fecha de inicio.");
        }
        return !this.reservas.some(reserva => {
            let mismoVehiculo: boolean = matriculaVehiculo === reserva.getMatriculaVehiculo();
            let fechasSolapadas: boolean = fechaInicio <= reserva.getFechaFin() && fechaFin >= reserva.getFechaInicio();
            return mismoVehiculo && fechasSolapadas;
        })
    }

    public validarFechas(fechaInicio: Date, fechaFin: Date): boolean {
        let fechaValida: boolean = true;
        if (fechaFin < fechaInicio) {
            fechaValida = false;
        }
        return fechaValida;
    }
}