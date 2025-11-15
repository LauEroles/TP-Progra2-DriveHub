
import Sedan from "../src/sedan";
import Vehiculo from "../src/vehiculo";
import {Estado} from "../src/estados/estado";
import {Disponible} from "../src/estados/disponible";

describe("Clase Sedan", () => {
  const estado:Estado= new Disponible();
  const sedan: Vehiculo = new Sedan(1000, "AAA", estado);

  test("calcula correctamente el cargo variable para Sedan", () => {
    let cargo = sedan.calcCargoVariable(100);
    expect(cargo).toBe(20);   
  });

});
