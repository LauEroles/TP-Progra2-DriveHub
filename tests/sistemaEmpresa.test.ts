import SistemaEmpresa from "../src/sistemaEmpresa";
import Vehiculo from "../src/vehiculo";
import Cliente from "../src/cliente";
import MantenimientoVehiculo from "../src/mantenimientoVehiculo";
import { mockDeep, MockProxy} from 'jest-mock-extended'

describe("SistemaEmpresa", () => {
  let sistema: SistemaEmpresa;
  let mockGestorReserva: any;
  let mockGestorVehiculo: any;
  let mockGestorMantenimiento: any;
  let mockGestorKilometraje: any;

  let mockVehiculo: MockProxy<Vehiculo>;
  let mockMantenimiento: MockProxy<MantenimientoVehiculo>;

  beforeEach(() => {
    mockGestorReserva = { 
      hayDisponibilidad: jest.fn(), 
      agregar: jest.fn(), 
      eliminar: jest.fn() 
    };
    mockGestorVehiculo = {
      agregar: jest.fn(),
      eliminar: jest.fn()
    };
    mockGestorMantenimiento = {
      registrarMantenimiento: jest.fn()
    };
    mockGestorKilometraje = {
      actualizarKmVehiculo: jest.fn()
    };
    mockVehiculo = mockDeep<Vehiculo>();
    mockMantenimiento = mockDeep<MantenimientoVehiculo>();
  
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

  test("agregarVehiculo debe delegar al GestorVehiculo.agregar()", () => {
    sistema.agregarVehiculo(mockVehiculo);
    
    expect(mockGestorVehiculo.agregar).toHaveBeenCalledTimes(1);
    expect(mockGestorVehiculo.agregar).toHaveBeenCalledWith(mockVehiculo,sistema.getVehiculos());
  });

  test("eliminarVehiculo debe delegar al GestorVehiculo.eliminar()", () => {
    sistema.eliminarVehiculo(mockVehiculo);
    
    expect(mockGestorVehiculo.eliminar).toHaveBeenCalledTimes(1);
    expect(mockGestorVehiculo.eliminar).toHaveBeenCalledWith(mockVehiculo,sistema.getVehiculos());
  });

  test("registrarMantenimiento debe delegar al GestorMantenimiento", () => {
    sistema.registrarMantenimiento(mockVehiculo, mockMantenimiento);
    
    expect(mockGestorMantenimiento.registrarMantenimiento).toHaveBeenCalledTimes(1);
    expect(mockGestorMantenimiento.registrarMantenimiento).toHaveBeenCalledWith(mockVehiculo,mockMantenimiento);
  });

  test("alquilar debe delegar a vehiculo.alquilar() exitosamente", () => {
    sistema.alquilar(mockVehiculo);
    
    expect(mockVehiculo.alquilar).toHaveBeenCalledTimes(1);
  });

  test("dejarDeAlquilar debe delegar a vehiculo.devolver()", () => {
    sistema.dejarDeAlquilar(mockVehiculo);
    
    expect(mockVehiculo.devolver).toHaveBeenCalledTimes(1);
  });

  test("hacerMantenimiento debe delegar a vehiculo.enviarMantenimiento()", () => {
    sistema.hacerMantenimiento(mockVehiculo);
    
    expect(mockVehiculo.enviarMantenimiento).toHaveBeenCalledTimes(1);
  });

  test("finalizarMantenimiento debe delegar a vehiculo.finalizarMantenimiento()", () => {
    sistema.finalizarMantenimiento(mockVehiculo);
    
    expect(mockVehiculo.finalizarMantenimiento).toHaveBeenCalledTimes(1);
  });

  test("limpiar debe delegar a vehiculo.limpiar()", () => {
    sistema.limpiar(mockVehiculo);
    
    expect(mockVehiculo.limpiar).toHaveBeenCalledTimes(1);
  });
});

