
import MantenimientoVehiculo from "../src/mantenimientoVehiculo";

// Mock de la clase
jest.mock("../src/mantenimientoVehiculo");

describe("MantenimientoVehiculo ", () => {
  const MockMantenimiento = MantenimientoVehiculo as jest.MockedClass<typeof MantenimientoVehiculo>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("se instancia la clase mock", () => {
    const fecha = new Date("2025-10-12");
    const mantenimientoMock = new MockMantenimiento(1000, fecha);

    expect(mantenimientoMock).toBeDefined();
    
    expect(MockMantenimiento).toHaveBeenCalledWith(1000, fecha);
  });

  test("se llama a los métodos get y set usando mocks", () => {
    const fecha = new Date("2025-10-12");
    const mantenimientoMock = new MockMantenimiento(1200, fecha);

    // Mockeamos los métodos
    mantenimientoMock.getCostoMantenimiento = jest.fn(() => 1200);
    mantenimientoMock.setCostoMantenimiento = jest.fn();
    mantenimientoMock.getFecha = jest.fn(() => fecha);
    mantenimientoMock.setFecha = jest.fn();
    mantenimientoMock.mostrarDetalle = jest.fn(() => `Mantenimiento realizado el ${fecha} con costo $1200`);

    
    expect(mantenimientoMock.getCostoMantenimiento()).toBe(1200);
    mantenimientoMock.setCostoMantenimiento(1500);
    expect(mantenimientoMock.setCostoMantenimiento).toBeDefined();
    expect(mantenimientoMock.getFecha()).toBe(fecha);

    // Probamos mostrarDetalle
    expect(mantenimientoMock.mostrarDetalle()).toBe(`Mantenimiento realizado el ${fecha} con costo $1200`);
    expect(mantenimientoMock.mostrarDetalle).toBeDefined();
  });
});
