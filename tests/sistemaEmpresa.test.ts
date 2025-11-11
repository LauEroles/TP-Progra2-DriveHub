import SistemaEmpresa from "../src/sistemaEmpresa";
import Vehiculo from "../src/vehiculo";

describe("SistemaEmpresa", () => {
  let sistema: SistemaEmpresa;
  let mockGestorReserva: any;
  let mockGestorVehiculo: any;
  let mockGestorMantenimiento: any;
  let mockGestorKilometraje: any;

  beforeEach(() => {
    mockGestorReserva = { hayDisponibilidad: jest.fn(), agregar: jest.fn() };
    mockGestorVehiculo = {};
    mockGestorMantenimiento = {};
    mockGestorKilometraje = {};

    sistema = new SistemaEmpresa(
      mockGestorReserva,
      mockGestorVehiculo,
      mockGestorMantenimiento,
      mockGestorKilometraje
    );
  });

  test("actualizarKmVehiculo debe actualizar el km del vehículo correctamente", () => {
    const mockVehiculo = {
      getMatricula: jest.fn().mockReturnValue("ABC123"),
      getKm: jest.fn().mockReturnValue(1000),
      setKm: jest.fn(),
    } as unknown as Vehiculo;

    const mockReserva: any = {
      getVehiculo: jest.fn().mockReturnValue(mockVehiculo),
      kmsRecorridos: 200,
    };

    (sistema as any).vehiculos.push(mockVehiculo);

    sistema.actualizarKmVehiculo(mockReserva);

    expect(mockVehiculo.setKm).toHaveBeenCalledWith(1200);
  });

  // 🧩 Test: realizarReserva
  test("realizarReserva debe agregar la reserva y devolver true cuando hay disponibilidad", () => {
    const mockReserva: any = {
      getVehiculo: jest.fn(),
      getCliente: jest.fn(),
    };

    mockGestorReserva.hayDisponibilidad.mockReturnValue(true);
    const resultado = sistema.realizarReserva(mockReserva);

    expect(mockGestorReserva.hayDisponibilidad).toHaveBeenCalledWith(mockReserva, []);
    expect(mockGestorReserva.agregar).toHaveBeenCalledWith(mockReserva, []);
    expect(resultado).toBe(true);

  });
})