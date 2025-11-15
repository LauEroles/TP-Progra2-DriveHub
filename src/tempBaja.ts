import Temporada from "./temporada";

export default class TempBaja implements Temporada {
    
    calcTarifaBase(base: number): number {
        let tarifa: number = base - 10/100 * base;
        return tarifa;
    }
    
}