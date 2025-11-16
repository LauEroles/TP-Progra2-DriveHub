import TempBaja from "../../src/temporadas/tempBaja"
import Temporada from "../../src/temporadas/temporada";

describe("TempBaja.calcTarifaBase", () => {

    let tempBaja: Temporada = new TempBaja();

    it("le resta un 10% a la tarifa base", () => {
        let tarifa: number = tempBaja.calcTarifaBase(100);
        expect(tarifa).toBe(90);
    });
    
});