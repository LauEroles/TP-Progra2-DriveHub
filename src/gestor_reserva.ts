import ABM from "./abm";
import Reserva from "./reserva";

export default class GestorReserva implements ABM {

    public agregar<Reserva>(reserva: Reserva, reservas: Array<Reserva>): void {
        reservas.push(reserva);
    }

    public eliminar<Reserva>(reserva: Reserva, reservas: Array<Reserva>): void {
        let index: number = reservas.indexOf(reserva);
        reservas.splice(index, 1);
    }
    
    // public hayDisponibilidad(reservaSolicitada: Reserva, reservas: Array<Reserva>): boolean {        
    //     return reservaSolicitada.validarFecha() && !reservas.some(reserva => {
    //         let mismoVehiculo: boolean = reserva.getVehiculo().getMatricula() === reservaSolicitada.getVehiculo().getMatricula();
    //         let fechasSolapadas: boolean = reservaSolicitada.getFechaInicio() <= reserva.getFechaFin() && reservaSolicitada.getFechaFin() >= reserva.getFechaInicio();
    //         return mismoVehiculo && fechasSolapadas;
    //     })
    // }
}