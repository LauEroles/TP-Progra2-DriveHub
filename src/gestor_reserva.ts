import ABM from "./abm";

export default class GestionReserva implements ABM {

    agregar<Reserva>(reserva: Reserva, reservas: Array<Reserva>): void {
        reservas.push(reserva);
    }

    eliminar<Reserva>(reserva: Reserva, reservas: Array<Reserva>): void {
        let index: number = reservas.indexOf(reserva);
        reservas.splice(index, 1);
    }
    
}