import GestorReserva from "../src/gestor_reserva";
import Reserva from "../src/reserva";
import Cliente from "../src/cliente";
import Suv from "../src/suv";
import Sedan from "../src/sedan";
import Compacto from "../src/compacto";

jest.mock("../src/reserva");
jest.mock("../src/cliente");
jest.mock("../src/suv");


describe("GestorReserva.hayDisponibilidad", () => {
    const gestor = new GestorReserva();

    beforeEach(() => {
        
    })

    test("devuelve true cuando no hay reservas existentes", () => {
        const mockSuv = new Suv(100, "AAA") as jest.Mocked<Suv>;
        const mockCliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;
        const mockSolicitada = new Reserva(mockSuv, mockCliente, new Date(2025, 5, 12), new Date(2025, 5, 13)) as jest.Mocked<Reserva>;
        const reservas: Reserva[] = [];

        mockSolicitada.getVehiculo.mockReturnValue(mockSuv);
        mockSolicitada.getFechaInicio.mockReturnValue(new Date(2025, 5, 12));
        mockSolicitada.getFechaFin.mockReturnValue(new Date(2025, 5, 13));

        expect(gestor.hayDisponibilidad(mockSolicitada, reservas)).toBe(true);
    });

    test("devuelve false cuando hay solapamiento para el mismo vehículo", () => {
        const mockSuv = new Suv(100, "AAA") as jest.Mocked<Suv>;
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

    // test("devuelve false cuando hay solapamiento para el mismo vehículo", () => {
    //     const existente = new MockReserva("AAA111", new Date(2025, 5, 10), new Date(2025, 5, 15));
    //     const solicitada = new MockReserva("AAA111", new Date(2025, 5, 12), new Date(2025, 5, 13));
    //     expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(false);
    // });

    // test("devuelve true cuando hay solapamiento en fechas pero distinto vehículo", () => {
    //     const existente = new MockReserva("BBB222", new Date(2025, 5, 10), new Date(2025, 5, 15));
    //     const solicitada = new MockReserva("AAA111", new Date(2025, 5, 12), new Date(2025, 5, 14));
    //     expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(true);
    // });

    // test("considera solapamiento en el borde (fechas inclusivas) — inicio solicitado en fin existente", () => {
    //     const existente = new MockReserva("CCC333", new Date(2025, 5, 10), new Date(2025, 5, 15));
    //     const solicitada = new MockReserva("CCC333", new Date(2025, 5, 15), new Date(2025, 5, 20));
    //     // Según la implementación, los bordes inclusivos cuentan como solapamiento -> no hay disponibilidad
    //     expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(false);
    // });

    // test("devuelve true cuando no hay solapamiento (periodos separados)", () => {
    //     const existente = new MockReserva("DDD444", new Date(2025, 5, 10), new Date(2025, 5, 15));
    //     const solicitada = new MockReserva("DDD444", new Date(2025, 5, 16), new Date(2025, 5, 20));
    //     expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(true);
    // });
});