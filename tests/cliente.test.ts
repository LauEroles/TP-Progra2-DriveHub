
import Cliente from "../src/cliente";
import Reserva from "../src/reserva";
import Vehiculo from "../src/vehiculo";

jest.mock("../src/reserva");

describe("Cliente - sin SistemaEmpresa con Vehiculo mock", () => {

    let cliente: Cliente;
    let mockReserva: jest.Mocked<Reserva>;
    let mockVehiculo: jest.Mocked<Vehiculo>;

    beforeEach(() => {
        jest.clearAllMocks();

        // Mock de Vehiculo en lugar de Srv
        mockVehiculo = {
            calcularTarifa: jest.fn(),
            getTarifaBase: jest.fn(),
            getCargoFijo: jest.fn(),
            getCargoVariable: jest.fn(),
            getKm: jest.fn(),
            getMatricula: jest.fn().mockReturnValue("AAA123"),
            getEstado: jest.fn(),
            setEstado: jest.fn(),
            setTarifaBase: jest.fn(),
            setCargoFijo: jest.fn(),
            setCargoVariable: jest.fn(),
            setKm: jest.fn(),
            setMatricula: jest.fn(),
            agregarManteniminentoVehiculo: jest.fn(),
        } as unknown as jest.Mocked<Vehiculo>;

        // Cliente real
        cliente = new Cliente("Verónica", 123);

        // Mock de Reserva
        mockReserva = {
            getVehiculo: jest.fn().mockReturnValue(mockVehiculo),
            getFechaInicio: jest.fn().mockReturnValue(new Date(2025,5,12)),
            getFechaFin: jest.fn().mockReturnValue(new Date(2025,5,13)),
            getCliente: jest.fn().mockReturnValue(cliente),
            getKmsRecorridos: jest.fn().mockReturnValue(0),
            getDias: jest.fn().mockReturnValue(2),
        } as unknown as jest.Mocked<Reserva>;
    });

    test("crear cliente correctamente", () => {
        expect(cliente).toBeDefined();
        expect((cliente as any).nombreCompleto).toBe("Verónica");
        expect((cliente as any).id).toBe(123);
    });

    test("asignar reserva al cliente", () => {
        (cliente as any).reserva = mockReserva;
        expect((cliente as any).reserva).toBe(mockReserva);
    });

    test("acceder a datos de la reserva usando métodos mockeados", () => {
        (cliente as any).reserva = mockReserva;

        expect((cliente as any).reserva.getVehiculo()).toBe(mockVehiculo);
        expect((cliente as any).reserva.getFechaInicio()).toEqual(new Date(2025,5,12));
        expect((cliente as any).reserva.getFechaFin()).toEqual(new Date(2025,5,13));
        expect((cliente as any).reserva.getCliente()).toBe(cliente);
        expect((cliente as any).reserva.getDias()).toBe(2);
    });
});

