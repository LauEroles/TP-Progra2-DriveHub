import Reserva from "./reserva";
import Vehiculo from "./vehiculo";
import Cliente from "./cliente";
import GestorReserva from "./gestor_reserva";
import GestorVehiculo from "./gestor_vehiculo";
import GestorMantenimiento from "./gestorMantenimiento";
import GestorKilometraje from "./gestorKilometraje";
import MantenimientoVehiculo from "./mantenimientoVehiculo";

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

  public getVehiculos(): Vehiculo[] {
      return this.vehiculos;
  }

  public getReservas(): Reserva[] {
      return this.reservas;
  }

  public getGestorReserva(): GestorReserva {
      return this.gestorReserva;
  }

  public setGestorReserva(gestorReserva: GestorReserva): void {
      this.gestorReserva = gestorReserva;
  }

  public getGestorVehiculo(): GestorVehiculo {
      return this.gestorVehiculo;
  }

  public setGestorVehiculo(gestorVehiculo: GestorVehiculo): void {
      this.gestorVehiculo = gestorVehiculo;
  }

  public getGestorMantenimiento(): GestorMantenimiento {
      return this.gestorMantenimiento;
  }

  public setGestorMantenimiento(gestorMantenimiento: GestorMantenimiento): void {
      this.gestorMantenimiento = gestorMantenimiento;
  }

  public getGestorKilometraje(): GestorKilometraje {
      return this.gestorKilometraje;
  }

  public setGestorKilometraje(gestorKilometraje: GestorKilometraje): void {
      this.gestorKilometraje = gestorKilometraje;
  }

  public realizarReserva(vehiculo:Vehiculo, cliente:Cliente, fechaInicio:Date, fechaFin:Date): Reserva|null{
    
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
        resultado=null;
    }

    return resultado;
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
    this.getGestorKilometraje().actualizarKmVehiculo(reserva, this);
  }

  public agregarVehiculo(vehiculo: Vehiculo) {
    this.getGestorVehiculo().agregar(vehiculo, this.getVehiculos());
  }

  public eliminarVehiculo(vehiculo: Vehiculo) {
    this.getGestorVehiculo().eliminar(vehiculo, this.getVehiculos());
  }

  public cancelarReserva(reserva: Reserva) {
    this.getGestorReserva().eliminar(reserva, this.getReservas());
  }

  public registrarMantenimiento(vehiculo: Vehiculo, mantenimiento: MantenimientoVehiculo) {
    this.getGestorMantenimiento().registrarMantenimiento(vehiculo, mantenimiento);
  }

  public dejarDeAlquilar(vehiculo: Vehiculo) {
    vehiculo.devolver();
  }

  public hacerMantenimiento(vehiculo: Vehiculo): void {
    vehiculo.enviarMantenimiento();
  }

  public finalizarMantenimiento(vehiculo: Vehiculo): void {
    vehiculo.finalizarMantenimiento();
  }

  public limpiar(vehiculo: Vehiculo) {
    vehiculo.limpiar();
  }

}
