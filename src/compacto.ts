import Vehiculo from "./vehiculo";
import {Estado} from "./estados/estado";
import { KM_MAX_COMPACTO, TARIFA_BASE_COMPACTO, CARGO_VARIABLE_COMPACTO } from "./constantes";

/**
* Vehículo de tipo compacto.
* Tarifa base de $30 por día. Aplica un cargo de $0.15 por cada kilómetro
* recorrido si se superan los 100 km por día de alquiler.
*/
export default class Compacto extends Vehiculo {
    
    /**
    * Crea un vehículo compacto con kilómetros iniciales, matrícula y estado.
    * @param {number} km Kilómetros iniciales del vehículo.
    * @param {string} matricula Matrícula del vehículo.
    * @param {Estado} estado Estado inicial del vehículo.
    */
    constructor(km: number, matricula: string, estado:Estado) {
        super(km, matricula, estado);
        this.tarifaBase = TARIFA_BASE_COMPACTO;
        this.cargoVariable = CARGO_VARIABLE_COMPACTO;
    }

    /**
    * Calcula el cargo adicional según los kilómetros recorridos.
    * Aplica solo si se supera el límite máximo diario (KM_MAX_COMPACTO).
    * @param {number} kmsRecorridos Cantidad de kilómetros recorridos durante el alquiler.
    * @returns {number} Cargo variable a aplicar.
    */
    calcCargoVariable(kmsRecorridos: number): number {
        let cargo: number = 0;
        if (kmsRecorridos > KM_MAX_COMPACTO) {
            let excedente: number = kmsRecorridos - KM_MAX_COMPACTO;
            cargo += excedente * this.getCargoVariable();
        }
        return cargo;
    }

}