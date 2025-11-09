import Sedan from "../src/sedan";
import Vehiculo from "../src/vehiculo";

describe("Clase Sedan", () => {
  const sedan: Vehiculo = new Sedan(1000, "AAA");

  test("calcula correctamente el cargo variable para Sedan", () => {
    let cargo = sedan.calcCargoVariable(100);
    expect(cargo).toBe(20);   
  });

});
