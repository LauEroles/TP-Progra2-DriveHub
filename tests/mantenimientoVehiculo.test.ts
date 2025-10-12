jest.mock("../src/mantenimientoVehiculo");
import MantenimientoVehiculo from "../src/mantenimientoVehiculo";
import Vehiculo from "../src/vehiculo";
import GestorMantenimiento from "../src/gestorMantenimiento";   

describe("MantenimientoVehiculo (con mocks)", () => {
  const MockMantenimiento = MantenimientoVehiculo as jest.MockedClass<typeof MantenimientoVehiculo>;

  beforeEach(() => {
    MockMantenimiento.mockClear();
  });
   test("Se puede instanciar la clase  correctamente", () => {
    const fecha = new Date("2025-10-10");
    const m = new MockMantenimiento(1200, fecha);

    expect(MockMantenimiento).toHaveBeenCalledWith(1200, fecha);
    expect(m).toBeInstanceOf(MockMantenimiento);
  });
  test("Simula que el constructor lanza un error si el costo es 0", () => {
    MockMantenimiento.mockImplementationOnce(() => {
      throw new Error("El costo de mantenimiento debe ser mayor a 0");
    });

    expect(() => new MockMantenimiento(0, new Date())).toThrow("El costo de mantenimiento debe ser mayor a 0");
  });
});