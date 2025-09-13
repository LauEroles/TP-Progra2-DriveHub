/*SUV: Tarifa base de $80 por día. Aplica un cargo fijo adicional de $15 por día por
concepto de seguro y un cargo de $0.25 por cada kilómetro recorrido si se superan
los 500km en total durante el período de alquiler. */

import Vehiculo from "./vehiculo"

export default class Suv extends Vehiculo{

    constructor(km:number, matricula:string){
        super(km, matricula);
    }

    calcularTarifa(reserva):number{

       


        let calculoCargoVariable:number = 0;
        let kmRecorrido: number=reserva.getKmfinal() - this.getKmInicial();

        if ( kmRecorrido > 500) {
            calculoCargoVariable = kmRecorrido * 0.25;
        }

        let sumatoriaTotal:number = this.getTarifaBase() + this.getCargoFijo() + calculoCargoVariable;
        
        return sumatoriaTotal;
    }

}

