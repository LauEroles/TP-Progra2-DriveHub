import SistemaEmpresa from "../src/sistemaEmpresa";
import Vehiculo from "../src/vehiculos/vehiculo";
import Cliente from "../src/cliente";
import MantenimientoVehiculo from "../src/mantenimientoVehiculo";
import { mockDeep, MockProxy} from 'jest-mock-extended'

describe("SistemaEmpresa", () => {
  let sistema: SistemaEmpresa;
  let mockGestorReserva: any;
  let mockGestorVehiculo: any;
  let mockGestorMantenimiento: any;
  let mockGestorKilometraje: any;
  let mockGestorReporte: any;

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
      mockGestorKilometraje,
      mockGestorReporte
    );
  });

  
  // Test de actualizar KM
 test("actualizarKmVehiculo llama al método de GestorKilometraje", () => {
  const mockReserva: any = {};

  sistema.actualizarKmVehiculo(mockReserva);

  expect(mockGestorKilometraje.actualizarKmVehiculo).toHaveBeenCalledTimes(1);
  expect(mockGestorKilometraje.actualizarKmVehiculo).toHaveBeenCalledWith(mockReserva, sistema);
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

  describe("Getters y Setters de SistemaEmpresa", () => {
    let mockNuevoGestorReserva: MockProxy<any>;
    let mockNuevoGestorVehiculo: MockProxy<any>;
    let mockNuevoGestorMantenimiento: MockProxy<any>;
    let mockNuevoGestorKilometraje: MockProxy<any>;
  
    beforeEach(() => {
      mockNuevoGestorReserva = mockDeep();
      mockNuevoGestorVehiculo = mockDeep();
      mockNuevoGestorMantenimiento = mockDeep();
      mockNuevoGestorKilometraje = mockDeep();
    });
    
    test("getVehiculos debe devolver el array de vehículos", () => {
      const vehiculos = sistema.getVehiculos();
      
      expect(vehiculos).toBeDefined();
      expect(Array.isArray(vehiculos)).toBe(true);
      expect(vehiculos.length).toBe(0); // Inicialmente vacío
    });
  
    test("getReservas debe devolver el array de reservas", () => {
      const reservas = sistema.getReservas();
      
      expect(reservas).toBeDefined();
      expect(Array.isArray(reservas)).toBe(true);
      expect(reservas.length).toBe(0); // Inicialmente vacío
    });
  
    test("getGestorReserva debe devolver el gestor de reservas mockeado", () => {
      const gestor = sistema.getGestorReserva();
      
      expect(gestor).toBe(mockGestorReserva);
      expect(gestor).toBeDefined();
    });
  
    test("setGestorReserva debe actualizar el gestor de reservas con un mock", () => {
      sistema.setGestorReserva(mockNuevoGestorReserva);
      
      expect(sistema.getGestorReserva()).toBe(mockNuevoGestorReserva);
      expect(sistema.getGestorReserva()).not.toBe(mockGestorReserva);
    });
  
    test("getGestorVehiculo debe devolver el gestor de vehículos mockeado", () => {
      const gestor = sistema.getGestorVehiculo();
      
      expect(gestor).toBe(mockGestorVehiculo);
      expect(gestor).toBeDefined();
    });
  
    test("setGestorVehiculo debe actualizar el gestor de vehículos con un mock", () => {
      sistema.setGestorVehiculo(mockNuevoGestorVehiculo);
      
      expect(sistema.getGestorVehiculo()).toBe(mockNuevoGestorVehiculo);
      expect(sistema.getGestorVehiculo()).not.toBe(mockGestorVehiculo);
    });
  
    test("getGestorMantenimiento debe devolver el gestor de mantenimiento mockeado", () => {
      const gestor = sistema.getGestorMantenimiento();
      
      expect(gestor).toBe(mockGestorMantenimiento);
      expect(gestor).toBeDefined();
    });
  
    test("setGestorMantenimiento debe actualizar el gestor de mantenimiento con un mock", () => {
      sistema.setGestorMantenimiento(mockNuevoGestorMantenimiento);
      
      expect(sistema.getGestorMantenimiento()).toBe(mockNuevoGestorMantenimiento);
      expect(sistema.getGestorMantenimiento()).not.toBe(mockGestorMantenimiento);
    });
  
    test("getGestorKilometraje debe devolver el gestor de kilometraje mockeado", () => {
      const gestor = sistema.getGestorKilometraje();
      
      expect(gestor).toBe(mockGestorKilometraje);
      expect(gestor).toBeDefined();
    });
  
    test("setGestorKilometraje debe actualizar el gestor de kilometraje con un mock", () => {
      sistema.setGestorKilometraje(mockNuevoGestorKilometraje);
      
      expect(sistema.getGestorKilometraje()).toBe(mockNuevoGestorKilometraje);
      expect(sistema.getGestorKilometraje()).not.toBe(mockGestorKilometraje);
    });
  });

});

