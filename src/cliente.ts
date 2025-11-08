import Reserva from "./reserva";
import SistemaEmpresa from "./sistemaEmpresa";


export default class Cliente{

    private nombreCompleto: string;
    private id: number;
    // en un futuro podriamos hacer una mejora y tener un historial de reservas de cada cliente que sea una coleccion
    private  reserva: Reserva;

    constructor(nombreCompleto: string, id: number) {
        this.nombreCompleto = nombreCompleto;
        this.id = id;
        this.reserva = undefined as unknown as Reserva;
    }

    public solicitarReserva(reserva:Reserva,sistema:SistemaEmpresa){

        sistema.realizarReserva(reserva);

    } 



}