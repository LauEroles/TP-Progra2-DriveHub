import GestorMantenimiento from "../src/gestorMantenimiento";
import MantenimientoVehiculo from "../src/mantenimientoVehiculo";

jest.mock("../src/mantenimientoVehiculo");

describe("GestorMantenimiento ", () => {
  let gestor: GestorMantenimiento;

  beforeEach(() => {
    jest.clearAllMocks();
    gestor = new GestorMantenimiento();
  });

  test("se llama al método agregarMantenimientoVehiculo usando mock", () => {
    
    const vehiculoMock = {
      agregarMantenimientoVehiculo: jest.fn()
    } as unknown as import("../src/vehiculo").default;

    // Creamos un mock de mantenimiento
    const mantenimientoMock = new MantenimientoVehiculo(1200, new Date());

    // Llamamos al método que queremos probar
    gestor.registrarMantenimiento(vehiculoMock, mantenimientoMock);

    // Verificamos que el método existe y es una función
    expect(vehiculoMock.agregarMantenimientoVehiculo).toBeDefined();
    expect(typeof vehiculoMock.agregarMantenimientoVehiculo).toBe("function");

    // Verificamos que el método se llamó con el mantenimientoMock
    expect(vehiculoMock.agregarMantenimientoVehiculo).toHaveBeenCalledWith(mantenimientoMock);
  });
});



