import Reserva from "./reserva";
import SistemaEmpresa from "./sistemaEmpresa";
import Vehiculo from "./vehiculo";

/**
* Gestor encargado de actualizar el kilometraje de los vehículos
* según las reservas realizadas en el sistema.
*/
export default class GestorKilometraje {

    /**
    * Actualiza el kilometraje de un vehículo en el sistema basado en la reserva.
    * @param {Reserva} reserva Reserva que contiene el vehículo y los kilómetros recorridos.
    * @param {SistemaEmpresa} sistema Sistema donde se encuentra registrado el vehículo.
    * @throws {Error} Si el vehículo de la reserva no está registrado en el sistema.
    */
    public actualizarKmVehiculo(reserva: Reserva, sistema: SistemaEmpresa): void {
      
        const vehiculoReserva = reserva.getVehiculo();
    
        const vehiculoSistema = sistema.getVehiculos().find(
            (v) => v.getMatricula() === vehiculoReserva.getMatricula()
        );
        
        if (!vehiculoSistema) {
            throw new Error(
            `El vehículo ${vehiculoReserva.getMatricula()} no está registrado en el sistema.`
            );
        }
        
        const nuevoKM = reserva.getVehiculo().getKm() + reserva.getKmsRecorridos();
        
        vehiculoSistema.setKm(nuevoKM);
        
    }

}