import Suv from "../../src/vehiculos/suv";
import Vehiculo from "../../src/vehiculos/vehiculo";
import {Estado} from "../../src/estados/estado";
import {Disponible} from "../../src/estados/disponible";

describe("Clase Suv con mock de Reserva", () => {
  const estado:Estado= new Disponible();
  const suv: Vehiculo = new Suv(1000, "AAA",estado);

  test("calcula correctamente el cargo variable sin superar 500 km", () => {
    let cargo = suv.calcCargoVariable(400);
    expect(cargo).toBe(0);
  });

  test("calcula correctamente el cargo variable superando 500 km", () => {
    const cargo = suv.calcCargoVariable(600);
    expect(cargo).toBe(25);
  });

});
