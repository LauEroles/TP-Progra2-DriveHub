/*
Sedán: Tarifa base de $50 por día. Aplica un cargo de $0.20 por cada kilómetro
recorrido, sin límite diario.
*/
import Vehiculo from "./vehiculo"
import {  TARIFA_BASE_SEDAN,CARGO_VARIABLE_SEDAN } from "./constantes";
import Reserva from "./reserva";
export default class Sedan extends Vehiculo{

    constructor(km: number, matricula: string){
        super(km, matricula);
        this.tarifaBase=TARIFA_BASE_SEDAN;
        this.cargoVariable=CARGO_VARIABLE_SEDAN;
    }

    calcularTarifa(reserva:Reserva): number {
        // Implementar las constantes aqui tambien
        // cuando se haga en gestion Kilometraje el metodo calcularKmRecorridos
        const dias = reserva.getDias();
        let kmsRecorridos: number = reserva.getKmsRecorridos();
        let total: number = (this.tarifaBase * dias)+ kmsRecorridos * this.cargoVariable;

        return total;
    }
    
}