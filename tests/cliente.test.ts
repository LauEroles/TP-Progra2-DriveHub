
import Cliente from "../src/cliente";
import Reserva from "../src/reserva";
import Suv from "../src/suv";

jest.mock("../src/reserva");
jest.mock("../src/suv");

describe("Cliente - sin SistemaEmpresa", () => {

    let cliente: Cliente;
    let mockReserva: Reserva;
    let mockSuv: Suv;

    beforeEach(() => {
        mockSuv = new Suv(100, "AAA") as jest.Mocked<Suv>;
        cliente = new Cliente("Juan", 123);
        mockReserva = new Reserva(mockSuv, cliente, new Date(2025,5,12), new Date(2025,5,13)) as jest.Mocked<Reserva>;
    });

    test("crear cliente correctamente", () => {
        expect(cliente).toBeDefined();
        expect((cliente as any).nombreCompleto).toBe("Juan");
        expect((cliente as any).id).toBe(123);
    });

    test("asignar reserva al cliente", () => {
        // simulamos asignar la reserva directamente
        (cliente as any).reserva = mockReserva;

        expect((cliente as any).reserva).toBe(mockReserva);
    });

    test("acceder a datos de la reserva", () => {
        (cliente as any).reserva = mockReserva;

        expect((cliente as any).reserva.getVehiculo()).toBe(mockSuv);
        expect((cliente as any).reserva.getFechaInicio()).toEqual(new Date(2025,5,12));
        expect((cliente as any).reserva.getFechaFin()).toEqual(new Date(2025,5,13));
    });

});
