import TempMedia from "../../src/temporadas/tempMedia"
import Temporada from "../../src/temporadas/temporada";

describe("TempMedia.calcTarifaBase", () => {

    let tempMedia: Temporada = new TempMedia();

    it("devuelve la tarifa base sin ningún cambio", () => {
        let tarifa: number = tempMedia.calcTarifaBase(100);
        expect(tarifa).toBe(100);
    });
    
});