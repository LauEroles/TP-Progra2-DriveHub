import Reserva from "./reserva";
import Vehiculo from "./vehiculo";
import Cliente from "./cliente";
import GestorReserva from "./gestor_reserva";
import GestorVehiculo from "./gestor_vehiculo";
import GestorMantenimiento from "./gestorMantenimiento";
import GestorKilometraje from "./gestorKilometraje";

export default class SistemaEmpresa {
  private vehiculos: Vehiculo[] = [];
  private reservas: Reserva[] = [];
  private gestorReserva: GestorReserva;
  private gestorVehiculo: GestorVehiculo;
  private gestorMantenimiento: GestorMantenimiento;
  private gestorKilometraje: GestorKilometraje;

  constructor(
    gestorReserva: GestorReserva,
    gestorVehiculo: GestorVehiculo,
    gestorMantenimiento: GestorMantenimiento,
    gestorKilometraje: GestorKilometraje
  ) {
    this.gestorReserva = gestorReserva;
    this.gestorVehiculo = gestorVehiculo;
    this.gestorMantenimiento = gestorMantenimiento;
    this.gestorKilometraje = gestorKilometraje;
  }

  public realizarReserva(reservaDeseada: Reserva): boolean{

    const disponible=this.gestorReserva.hayDisponibilidad(reservaDeseada, this.reservas)

    if(disponible){
        this.gestorReserva.agregar(reservaDeseada, this.reservas);
        console.log("Reserva agregada con éxito")
        return true;
    }
    else {
        console.log("Rechazado por falta de disponibilidad")
        return false;
    }

  }

}
