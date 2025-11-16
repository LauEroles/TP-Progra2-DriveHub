import Compacto from "../../src/vehiculos/compacto";
import Vehiculo from "../../src/vehiculos/vehiculo";
import { Estado } from "../../src/estados/estado";
import { Disponible } from "../../src/estados/disponible";

describe("Compacto.calcularTarifa", () => {

    const estado:Estado=new Disponible();
    const compacto: Vehiculo = new Compacto(1000, "AAA",estado);

    test("calcula correctamente el cargo variable", () => {
        let cargo: number = compacto.calcCargoVariable(100);
        expect(cargo).toBe(0);
    });

    test("calcula correctamente el cargo variable después de los 100km", () => {
        let cargo: number = compacto.calcCargoVariable(200);
        expect(cargo).toBe(15);
    });

});