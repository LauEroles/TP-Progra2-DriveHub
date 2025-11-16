import TempAlta from "../../src/temporadas/tempAlta"
import Temporada from "../../src/temporadas/temporada";

describe("TempAlta.calcTarifaBase", () => {

    let tempAlta: Temporada = new TempAlta();

    it("le agrega un 20% a la tarifa base", () => {
        let tarifa: number = tempAlta.calcTarifaBase(100);
        expect(tarifa).toBe(120);
    });
    
});