
import Reserva from "./reserva";
import Vehiculo from "./vehiculo";

export default class gestorKilometraje{

    public calcularKmsRecorridos(reserva: Reserva): number{

        const kmFinalRecorrido = reserva.kmFinal;
        const kmInicialVehiculo = reserva.getVehiculo().getKm()

        if(kmFinalRecorrido < kmInicialVehiculo){
            throw new Error("El kilometraje final no puede ser menor que el kilometraje inicial")
        }

        const totalRecorrido = kmFinalRecorrido - kmInicialVehiculo;

        return totalRecorrido;
    }

}