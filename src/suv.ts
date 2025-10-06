/*SUV: Tarifa base de $80 por día. Aplica un cargo fijo adicional de $15 por día por
concepto de seguro y un cargo de $0.25 por cada kilómetro recorrido si se superan
los 500km en total durante el período de alquiler. */
import Reserva from "./reserva";
import Vehiculo from "./vehiculo"
import { TARIFA_BASE_SUV, CARGO_FIJO_ADICIONAL_SUV,CARGO_VARIABLE_MAY_500KM} from "./constantes";
export default class Suv extends Vehiculo{

    constructor(km:number, matricula:string){
        super(km, matricula);
    }

    calcularTarifa(reserva:Reserva):number{


        let calculoCargoVariable:number = 0;

        // Implementar las constantes aqui tambien
        // cuando se haga en gestion Kilometraje el metodo calcularKmRecorridos
        let kmRecorrido: number=reserva.getKmFinal() - this.getKm();

        if ( kmRecorrido > 500) {
            calculoCargoVariable = kmRecorrido * 0.25;
        }

        let sumatoriaTotal:number = this.getTarifaBase() + this.getCargoFijo() + calculoCargoVariable;
        
        return sumatoriaTotal;
    }

}

