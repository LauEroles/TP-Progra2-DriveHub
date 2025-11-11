import Temporada from "./temporada";

export default class TempAlta implements Temporada {
    
    calcTarifaBase(base: number): number {
        let tarifa: number = base + 20/100 * base;
        return tarifa;
    }
    
}