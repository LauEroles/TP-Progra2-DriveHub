import Reserva from "./reserva";
import SistemaEmpresa from "./sistemaEmpresa";
import Vehiculo from "./vehiculo";

export default class gestorKilometraje{

    public actualizarKmVehiculo(reserva: Reserva, sistema: SistemaEmpresa): void{
      
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