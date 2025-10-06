import Reserva from "./reserva";


export default class Cliente{

    private nombreCompleto: string;
    private  id: number;
    
    // en un futuro podriamos hacer una mejora y tener un historial de reservas de cada cliente que sea una coleccion
    private  reserva:Reserva;

    constructor(nombreCompleto: string, id: number, reserva:Reserva){

        this.nombreCompleto = nombreCompleto;
        this.id = id;
        this.reserva = reserva;

    }

    public solicitarReserva(reserva:Reserva,s:SistemaEmpresa){} //Validar disponibilidad



}