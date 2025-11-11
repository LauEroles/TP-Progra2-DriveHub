import SistemaEmpresa from "../src/sistemaEmpresa";
import GestorReserva from "../src/gestor_reserva";
import GestorVehiculo from "../src/gestor_vehiculo";
import GestorMantenimiento from "../src/gestorMantenimiento";
import GestorKilometraje from "../src/gestorKilometraje";
import Reserva from "../src/reserva";
import Vehiculo from "../src/vehiculo";

let sistema: SistemaEmpresa;
let mockGestorReserva: jest.Mocked<GestorReserva>;
let mockGestorVehiculo: jest.Mocked<GestorVehiculo>;
let mockGestorMantenimiento: jest.Mocked<GestorMantenimiento>;
let mockGestorKilometraje: jest.Mocked<GestorKilometraje>;


beforeEach(() => {
  mockGestorReserva = new GestorReserva() as jest.Mocked<GestorReserva>;
  mockGestorVehiculo = new GestorVehiculo() as jest.Mocked<GestorVehiculo>;
  mockGestorMantenimiento = new GestorMantenimiento() as jest.Mocked<GestorMantenimiento>;
  mockGestorKilometraje = new GestorKilometraje() as jest.Mocked<GestorKilometraje>;

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

