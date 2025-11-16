import Reserva from "./reserva";
import Vehiculo from "../src/vehiculos/vehiculo";
import Cliente from "./cliente";
import GestorReserva from "../src/gestores/gestor_reserva";
import GestorVehiculo from "../src/gestores/gestor_vehiculo";
import GestorMantenimiento from "../src/gestores/gestorMantenimiento";
import GestorKilometraje from "../src/gestores/gestorKilometraje";
import MantenimientoVehiculo from "./mantenimientoVehiculo";
import GestorEstadisticas from "./gestores/gestorReportes";
/**
 * Sistema principal que gestiona los vehículos, reservas, mantenimientos,
 * alquileres y estadísticas de la empresa.
 */


export default class SistemaEmpresa {
  private vehiculos: Vehiculo[] = [];
  private reservas: Reserva[] = [];
  private gestorReserva: GestorReserva;
  private gestorVehiculo: GestorVehiculo;
  private gestorMantenimiento: GestorMantenimiento;
  private gestorKilometraje: GestorKilometraje;
  private gestorEstadistica: GestorEstadisticas;

 /**
   * Crea una instancia del sistema de empresa.
   * @param gestorReserva Gestor encargado de manejar las reservas.
   * @param gestorVehiculo Gestor encargado de gestionar los vehículos.
   * @param gestorMantenimiento Gestor que registra y administra mantenimientos.
   * @param gestorKilometraje Gestor que actualiza el kilometraje de los vehículos.
   * @param gestorEstadistica Gestor encargado de generar reportes y estadísticas.
   */


  constructor(
  gestorReserva: GestorReserva,
  gestorVehiculo: GestorVehiculo,
  gestorMantenimiento: GestorMantenimiento,
  gestorKilometraje: GestorKilometraje,
  gestorEstadistica: GestorEstadisticas
  ) {
  this.gestorReserva = gestorReserva;
  this.gestorVehiculo = gestorVehiculo;
  this.gestorMantenimiento = gestorMantenimiento;
  this.gestorKilometraje = gestorKilometraje;
  this.gestorEstadistica = gestorEstadistica;
  }


  /** 
   * @returns Lista completa de vehículos registrados. */  
  public getVehiculos(): Vehiculo[] {
      return this.vehiculos;
  }

  /** 
   * @returns Lista de reservas activas. */
  public getReservas(): Reserva[] {
      return this.reservas;
  }


  /** 
     * @returns Instancia del gestor de reservas. */
  public getGestorReserva(): GestorReserva {
      return this.gestorReserva;
  }


  /**
   * Define el gestor de reservas.
   * @param gestorReserva Nuevo gestor de reservas.
   */ 
  public setGestorReserva(gestorReserva: GestorReserva): void {
      this.gestorReserva = gestorReserva;
  }

  /** 
  * @returns Instancia del gestor de vehículos. */

  public getGestorVehiculo(): GestorVehiculo {
      return this.gestorVehiculo;
  }

   /**
   * Define el gestor de vehículos.
   * @param gestorVehiculo Nuevo gestor de vehículos.
   */

  public setGestorVehiculo(gestorVehiculo: GestorVehiculo): void {
      this.gestorVehiculo = gestorVehiculo;
  }

  /** @returns Gestor de mantenimiento. */

  public getGestorMantenimiento(): GestorMantenimiento {
      return this.gestorMantenimiento;
  }

  /**
   * Define el gestor de mantenimiento.
   * @param gestorMantenimiento Nuevo gestor de mantenimiento.
   */ 

  public setGestorMantenimiento(gestorMantenimiento: GestorMantenimiento): void {
      this.gestorMantenimiento = gestorMantenimiento;
  }

  /** @returns Gestor de kilometraje. */

  public getGestorKilometraje(): GestorKilometraje {
      return this.gestorKilometraje;
  }

  /** @returns Gestor de estadísticas. */

    public getGestorEstadistica(): GestorEstadisticas {
  return this.gestorEstadistica;
  }

   /**
   * Define el gestor de estadísticas.
   * @param gestor Nuevo gestor.
   */

  public setGestorEstadistica(gestor: GestorEstadisticas): void {
  this.gestorEstadistica = gestor;
  }

   /**
   * Define el gestor de kilometraje.
   * @param gestorKilometraje Nuevo gestor km.
   */

  public setGestorKilometraje(gestorKilometraje: GestorKilometraje): void {
      this.gestorKilometraje = gestorKilometraje;
  }

   /**
   * Intenta realizar una reserva sobre un vehículo.
   * @param vehiculo Vehículo a reservar.
   * @param cliente Cliente que realiza la reserva.
   * @param fechaInicio Fecha de inicio del uso.
   * @param fechaFin Fecha de finalización.
   * @returns La reserva generada o null si no hay disponibilidad.
   */

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

  /**
   * Intenta alquilar un vehículo.
   * @param vehiculoAAlquilar Vehículo a alquilar.
   */


  public alquilar(vehiculoAAlquilar: Vehiculo): void{
    try{ 
      vehiculoAAlquilar.alquilar();
      console.log(`Vehiculo, ${vehiculoAAlquilar.getMatricula()} alquilado con éxito`);
    
    }catch(error:any){
        console.log(`Error: ${error.message}`);
    }
  }

   /**
   * Actualiza el kilometraje de un vehículo asociado a una reserva.
   * @param reserva Reserva cuyo kilometraje debe actualizarse.
   */

  public actualizarKmVehiculo(reserva: Reserva): void{
    this.getGestorKilometraje().actualizarKmVehiculo(reserva, this);
  }

  /**
   * Agrega un vehículo al sistema.
   * @param vehiculo Vehículo a agregar.
   */

  public agregarVehiculo(vehiculo: Vehiculo) {
    this.getGestorVehiculo().agregar(vehiculo, this.getVehiculos());
  }

    /**
   * Elimina un vehículo del sistema.
   * @param vehiculo Vehículo a eliminar.
   */

  public eliminarVehiculo(vehiculo: Vehiculo) {
    this.getGestorVehiculo().eliminar(vehiculo, this.getVehiculos());
  }

   /**
   * Cancela una reserva.
   * @param reserva Reserva a cancelar.
   */

  public cancelarReserva(reserva: Reserva) {
    this.getGestorReserva().eliminar(reserva, this.getReservas());
  }


   /**
   * Registra un mantenimiento para un vehículo.
   * @param vehiculo Vehículo a mantener.
   * @param mantenimiento Objeto de mantenimiento.
   */

  public registrarMantenimiento(vehiculo: Vehiculo, mantenimiento: MantenimientoVehiculo) {
    this.getGestorMantenimiento().registrarMantenimiento(vehiculo, mantenimiento);
  }

   /**
   * Finaliza el alquiler y cambia el estado del vehículo.
   * @param vehiculo Vehículo que vuelve de alquiler.
   */

  public dejarDeAlquilar(vehiculo: Vehiculo) {
    vehiculo.devolver();
  }

   /**
   * Envía un vehículo a mantenimiento.
   * @param vehiculo Vehículo a enviar.
   */

  public hacerMantenimiento(vehiculo: Vehiculo): void {
    vehiculo.enviarMantenimiento();
  }

   /**
   * Finaliza el mantenimiento de un vehículo.
   * @param vehiculo Vehículo que sale de mantenimiento.
   */

  public finalizarMantenimiento(vehiculo: Vehiculo): void {
    vehiculo.finalizarMantenimiento();
  }


  /**
   * Limpia un vehículo luego de ser devuelto.
   * @param vehiculo Vehículo a limpiar.
   */
  public limpiar(vehiculo: Vehiculo) {
    vehiculo.limpiar();
  }


}
