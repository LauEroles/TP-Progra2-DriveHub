import MantenimientoVehiculo from "./mantenimientoVehiculo";
import Vehiculo from "./vehiculo";

export default class GestorMantenimiento {

    public registrarMantenimiento (v:Vehiculo,m:MantenimientoVehiculo):void{
     v.agregarManteniminentoVehiculo(m); 
}
}
