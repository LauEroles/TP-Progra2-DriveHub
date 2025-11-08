import Temporada from "./temporada";

export default class TempMedia implements Temporada {
    
    calcTarifaBase(base: number): number {
        return base;
    }
    
}