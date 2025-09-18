/*
Sedán: Tarifa base de $50 por día. Aplica un cargo de $0.20 por cada kilómetro
recorrido, sin límite diario.
*/
import Vehiculo from "./vehiculo"

export default class Sedan extends Vehiculo{

    constructor(){
        super()
        this.tarifaBase=50;
        this.cargoFijo=0.20
    }

    calcularTarifa(): number {
        let kmsRecorridos: number = this.kmFinal - this.kmInicial;
        let total: number =this.tarifaBase + kmsRecorridos * this.cargoFijo;

        return total;
    }
    
}