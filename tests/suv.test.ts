import Suv from "../src/suv";
import Vehiculo from "../src/vehiculo";

describe("Clase Suv con mock de Reserva", () => {
  const suv: Vehiculo = new Suv(1000, "AAA");

  test("calcula correctamente el cargo variable sin superar 500 km", () => {
    let cargo = suv.calcCargoVariable(400);
    expect(cargo).toBe(0);
  });

  test("calcula correctamente el cargo variable superando 500 km", () => {
    const cargo = suv.calcCargoVariable(600);
    expect(cargo).toBe(25);
  });

});
