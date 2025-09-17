import Reserva from "./reserva";


export default class Cliente{

    protected nombreCompleto: string;
    protected  id: number;
    public  reserva:Reserva | undefined;

    constructor(nombreCompleto: string, id: number, reserva?:Reserva){

        this.nombreCompleto = nombreCompleto;
        this.id = id;
        this.reserva = reserva ?? undefined;

    }

    public crearReserva(){} //Validar disponibilidad


}