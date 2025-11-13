import ABM from "./abm";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo";

export default class GestorReserva implements ABM {

    public agregar<Reserva>(reserva: Reserva, reservas: Array<Reserva>): void {
        reservas.push(reserva);
    }

    public eliminar<Reserva>(reserva: Reserva, reservas: Array<Reserva>): void {
        let index: number = reservas.indexOf(reserva);
        reservas.splice(index, 1);
    }
    
   
    public hayDisponibilidad(fechaInicio: Date, fechaFin: Date, vehiculo: Vehiculo, reservas: Array<Reserva>): boolean {        
        return !reservas.some(reserva => {
            let mismoVehiculo: boolean = reserva.getVehiculo().getMatricula() === vehiculo.getMatricula();
            let fechasSolapadas: boolean = fechaInicio <= reserva.getFechaFin() && fechaFin >= reserva.getFechaInicio();
            return mismoVehiculo && fechasSolapadas;
        })
    }
}
