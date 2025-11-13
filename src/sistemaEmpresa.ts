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

  
  public realizarReserva(vehiculo:Vehiculo, cliente:Cliente, fechaInicio:Date, fechaFin:Date): Reserva{
    
    let resultado:Reserva|null;
    const disponible=this.gestorReserva.hayDisponibilidad(fechaInicio, fechaFin, vehiculo, this.reservas);

    if(disponible){          
        let reservaTemporal=new Reserva(vehiculo,cliente,fechaInicio,fechaFin);
        this.gestorReserva.agregar(reservaTemporal, this.reservas);
        console.log("Reserva agregada con éxito")
        resultado=reservaTemporal;
    }
    else {
        console.log("Rechazado por falta de disponibilidad")
    }

    return resultado!;
  }

  public alquilar(vehiculoAAlquilar: Vehiculo): void{
    try{ 
      vehiculoAAlquilar.alquilar();
      console.log(`Vehiculo, ${vehiculoAAlquilar.getMatricula()} alquilado con éxito`);
    
    }catch(error:any){
        console.log(`Error: ${error.message}`);
    }
  }

  public actualizarKmVehiculo(reserva: Reserva): void{
  const vehiculoReserva = reserva.getVehiculo();

    // Esto lo generé para encontrar el vehículo y poder actualizar el KM.

  const vehiculoSistema = this.vehiculos.find(
    (v) => v.getMatricula() === vehiculoReserva.getMatricula()
  );

  if (!vehiculoSistema) {
    throw new Error(
      `El vehículo ${vehiculoReserva.getMatricula()} no está registrado en el sistema.`
    );
  }

  const nuevoKM = reserva.getVehiculo().getKm() + reserva.kmRecorrido;

  vehiculoSistema.setKm(nuevoKM);

  }

}
