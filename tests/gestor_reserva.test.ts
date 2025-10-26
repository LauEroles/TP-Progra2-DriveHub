import GestorReserva from "../src/gestor_reserva";
import Reserva from "../src/reserva";
import Cliente from "../src/cliente";
import Vehiculo from "../src/vehiculo";
import Suv from "../src/suv";
import Sedan from "../src/sedan";
import Compacto from "../src/compacto";

jest.mock("../src/reserva");
jest.mock("../src/cliente");
jest.mock("../src/vehiculo");
jest.mock("../src/suv");


describe("GestorReserva.hayDisponibilidad", () => {
    const gestor = new GestorReserva();


    test("devuelve true cuando no hay reservas existentes", () => {
        const mockSuv = new Suv(100, "AAA") as jest.Mocked<Vehiculo>;

        const mockCliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;

        const mockSolicitada = new Reserva(mockSuv, mockCliente, new Date(2025, 5, 12), new Date(2025, 5, 13)) as jest.Mocked<Reserva>;
        
        const reservas: Reserva[] = [];

        mockSolicitada.getVehiculo.mockReturnValue(mockSuv);
        mockSolicitada.getFechaInicio.mockReturnValue(new Date(2025, 5, 12));
        mockSolicitada.getFechaFin.mockReturnValue(new Date(2025, 5, 13));

        expect(gestor.hayDisponibilidad(mockSolicitada, reservas)).toBe(true);
    });


    test("devuelve true cuando hay solapamiento de fechas para distinto vehículo", () => {
        const mockSuv1 = new Suv(100, "AAA") as jest.Mocked<Vehiculo>;
        const mockSuv2 = new Suv(100, "BBB") as jest.Mocked<Vehiculo>;

        const mockCliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;

        const mockExistente = new Reserva(mockSuv1, mockCliente, new Date(2025, 5, 10), new Date(2025, 5, 15)) as jest.Mocked<Reserva>;
        const mockSolicitada = new Reserva(mockSuv2, mockCliente, new Date(2025, 5, 12), new Date(2025, 5, 13)) as jest.Mocked<Reserva>;

        mockSuv1.getMatricula.mockReturnValue("AAA");
        mockSuv2.getMatricula.mockReturnValue("BBB");

        mockExistente.getVehiculo.mockReturnValue(mockSuv1);
        mockExistente.getFechaInicio.mockReturnValue(new Date(2025, 5, 10));
        mockExistente.getFechaFin.mockReturnValue(new Date(2025, 5, 15));

        mockSolicitada.getVehiculo.mockReturnValue(mockSuv2);
        mockSolicitada.getFechaInicio.mockReturnValue(new Date(2025, 5, 12));
        mockSolicitada.getFechaFin.mockReturnValue(new Date(2025, 5, 13));

        expect(gestor.hayDisponibilidad(mockSolicitada, [mockExistente])).toBe(true);
    });


    test("devuelve false cuando hay solapamiento de fechas para el mismo vehículo", () => {
        const mockSuv = new Suv(100, "AAA") as jest.Mocked<Vehiculo>;

        const mockCliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;

        const mockExistente = new Reserva(mockSuv, mockCliente, new Date(2025, 5, 10), new Date(2025, 5, 15)) as jest.Mocked<Reserva>;
        const mockSolicitada = new Reserva(mockSuv, mockCliente, new Date(2025, 5, 12), new Date(2025, 5, 13)) as jest.Mocked<Reserva>;

        mockSuv.getMatricula.mockReturnValue("AAA");

        mockExistente.getVehiculo.mockReturnValue(mockSuv);
        mockExistente.getFechaInicio.mockReturnValue(new Date(2025, 5, 10));
        mockExistente.getFechaFin.mockReturnValue(new Date(2025, 5, 15));

        mockSolicitada.getVehiculo.mockReturnValue(mockSuv);
        mockSolicitada.getFechaInicio.mockReturnValue(new Date(2025, 5, 12));
        mockSolicitada.getFechaFin.mockReturnValue(new Date(2025, 5, 13));

        expect(gestor.hayDisponibilidad(mockSolicitada, [mockExistente])).toBe(false);
    });


    test("devuelve true cuando NO hay solapamiento de fechas para el mismo vehículo", () => {
        const mockSuv = new Suv(100, "AAA") as jest.Mocked<Vehiculo>;

        const mockCliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;

        const mockExistente = new Reserva(mockSuv, mockCliente, new Date(2025, 5, 10), new Date(2025, 5, 15)) as jest.Mocked<Reserva>;
        const mockSolicitada = new Reserva(mockSuv, mockCliente, new Date(2025, 5, 16), new Date(2025, 5, 18)) as jest.Mocked<Reserva>;

        mockSuv.getMatricula.mockReturnValue("AAA");

        mockExistente.getVehiculo.mockReturnValue(mockSuv);
        mockExistente.getFechaInicio.mockReturnValue(new Date(2025, 5, 10));
        mockExistente.getFechaFin.mockReturnValue(new Date(2025, 5, 15));

        mockSolicitada.getVehiculo.mockReturnValue(mockSuv);
        mockSolicitada.getFechaInicio.mockReturnValue(new Date(2025, 5, 16));
        mockSolicitada.getFechaFin.mockReturnValue(new Date(2025, 5, 18));

        expect(gestor.hayDisponibilidad(mockSolicitada, [mockExistente])).toBe(true);
    });
    
});