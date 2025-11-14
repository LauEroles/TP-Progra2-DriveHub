import SistemaEmpresa from "../src/sistemaEmpresa";
import Vehiculo from "../src/vehiculo";
import Cliente from "../src/cliente";

describe("SistemaEmpresa", () => {
  let sistema: SistemaEmpresa;
  let mockGestorReserva: any;
  let mockGestorVehiculo: any;
  let mockGestorMantenimiento: any;
  let mockGestorKilometraje: any;

  beforeEach(() => {
    mockGestorReserva = { hayDisponibilidad: jest.fn(), agregar: jest.fn(), eliminar: jest.fn() };
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

  // Test de actualizar KM
  
 test("actualizarKmVehiculo debe actualizar el km del vehículo correctamente", () => {
  const mockVehiculo = {
    getMatricula: jest.fn().mockReturnValue("ABC123"),
    getKm: jest.fn().mockReturnValue(1000),
    setKm: jest.fn(),
  } as unknown as Vehiculo;

  (sistema as any).vehiculos.push(mockVehiculo);

  const mockReserva: any = {
    getVehiculo: jest.fn().mockReturnValue(mockVehiculo), 
    getKmsRecorridos: jest.fn().mockReturnValue(200),
  };

  sistema.actualizarKmVehiculo(mockReserva);

  expect(mockVehiculo.setKm).toHaveBeenCalledWith(1200);
});


  // Test de realizarReserva

  test("realizarReserva debe agregar la reserva y devolver la reserva cuando hay disponibilidad", () => {
    const mockVehiculo = {
      getMatricula: jest.fn().mockReturnValue("AA111AA"),
      getKm: jest.fn().mockReturnValue(100)
    } as unknown as Vehiculo;

    const mockCliente = {
      getNombre: jest.fn().mockReturnValue("Juan")
    } as unknown as Cliente;

    const fechaInicio = new Date("2025-01-01");
    const fechaFin = new Date("2025-01-05");


    mockGestorReserva.hayDisponibilidad = jest.fn().mockReturnValue(true);
    mockGestorReserva.agregar = jest.fn();


    const mockReservaCreada = {
      getVehiculo: jest.fn().mockReturnValue(mockVehiculo),
      getCliente: jest.fn().mockReturnValue(mockCliente),
      getFechaInicio: jest.fn().mockReturnValue(fechaInicio),
      getFechaFin: jest.fn().mockReturnValue(fechaFin),
      getKmsRecorridos: jest.fn().mockReturnValue(0)
    };

    jest.spyOn(require("../src/reserva"), "default")
      .mockImplementation(() => mockReservaCreada);

    const resultado = sistema.realizarReserva(mockVehiculo, mockCliente, fechaInicio, fechaFin);

    expect(mockGestorReserva.hayDisponibilidad).toHaveBeenCalledWith(
      fechaInicio,
      fechaFin,
      mockVehiculo,
      []
    );

    expect(mockGestorReserva.agregar).toHaveBeenCalledWith(
      mockReservaCreada,
      []
    );

    expect(resultado).toBe(mockReservaCreada);
  });
});

