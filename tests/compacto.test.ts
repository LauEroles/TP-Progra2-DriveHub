import Compacto from "../src/compacto";
import Vehiculo from "../src/vehiculo";

describe("Compacto.calcularTarifa", () => {

    const compacto: Vehiculo = new Compacto(1000, "AAA");

    test("calcula correctamente el cargo variable", () => {
        let cargo: number = compacto.calcCargoVariable(100);
        expect(cargo).toBe(0);
    });

    test("calcula correctamente el cargo variable después de los 100km", () => {
        let cargo: number = compacto.calcCargoVariable(200);
        expect(cargo).toBe(15);
    });

});