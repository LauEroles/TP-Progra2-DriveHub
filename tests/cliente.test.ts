import Cliente from "../src/cliente";
import SistemaEmpresa from "../src/sistemaEmpresa";
import Vehiculo from "../src/vehiculos/vehiculo";

describe("Cliente", () => {

  test("constructor inicializa correctamente", () => {
    const cliente = new Cliente("Juan Perez", 1);
    expect(cliente.getNombreCompleto()).toBe("Juan Perez");
    expect(cliente.getId()).toBe(1);
  });

  test("setters y getters funcionan correctamente", () => {
    const cliente = new Cliente("Ana Gomez", 45);

    cliente.setNombreCompleto("Carla Lopez");
    cliente.setId(99);

    expect(cliente.getNombreCompleto()).toBe("Carla Lopez");
    expect(cliente.getId()).toBe(99);
  });

  test("solicitarReserva llama a sistema.realizarReserva", () => {
    const mockSistema: SistemaEmpresa = {
      realizarReserva: jest.fn()
    } as unknown as jest.Mocked<SistemaEmpresa>;

    const mockVehiculo = {} as unknown as jest.Mocked<Vehiculo>;

    const cliente = new Cliente("Juan", 10);

    const fechaInicio = new Date("2025-01-10");
    const fechaFin = new Date("2025-01-12");

    cliente.solicitarReserva(fechaInicio, fechaFin, mockVehiculo, mockSistema);

    expect(mockSistema.realizarReserva).toHaveBeenCalledWith(
      mockVehiculo,
      cliente,
      fechaInicio,
      fechaFin
    );
  });

});