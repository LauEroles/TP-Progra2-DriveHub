import MantenimientoVehiculo from "../mantenimientoVehiculo";
import Vehiculo from "../../src/vehiculos/vehiculo";

/**
* Gestor encargado de registrar mantenimientos en los vehículos.
*/
export default class GestorMantenimiento {

    /**
    * Registra un mantenimiento en un vehículo.
    * @param {Vehiculo} v Vehículo al que se le registrará el mantenimiento.
    * @param {MantenimientoVehiculo} m Mantenimiento a registrar.
    */
    public registrarMantenimiento (v: Vehiculo, m: MantenimientoVehiculo): void {
        v.agregarMantenimientoVehiculo(m); 
    }
    
}
