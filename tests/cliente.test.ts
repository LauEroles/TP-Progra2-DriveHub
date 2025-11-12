
import Cliente from "../src/cliente";
import Reserva from "../src/reserva";
import SistemaEmpresa from "../src/sistemaEmpresa";

describe("Cliente", () => {

    let mockSistema: jest.Mocked<SistemaEmpresa>;
    let mockReserva: jest.Mocked<Reserva>;

    beforeEach(() => {

        // Mock de SistemaEmpresa con solo lo que necesita Cliente
        mockSistema = {
            realizarReserva: jest.fn()
        } as unknown as jest.Mocked<SistemaEmpresa>;

        // Mock de Reserva (no importa su contenido para este test)
        mockReserva = {} as unknown as jest.Mocked<Reserva>;
    });

    // --------------------------
    // CONSTRUCTOR
    // --------------------------
    test("constructor debe asignar correctamente nombreCompleto e id", () => {

        const cliente = new Cliente("Juan Pérez", 101);

        expect(cliente).toBeInstanceOf(Cliente);
        expect((cliente as any).nombreCompleto).toBe("Juan Pérez");
        expect((cliente as any).id).toBe(101);
        // reserva inicialmente queda undefined (como está en tu constructor)
        expect((cliente as any).reserva).toBeUndefined();
    });

    // --------------------------
    // solicitarReserva
    // --------------------------
    test("solicitarReserva debe invocar sistema.realizarReserva con la reserva dada", () => {

        const cliente = new Cliente("Ana Gómez", 202);

        cliente.solicitarReserva(mockReserva, mockSistema);

        expect(mockSistema.realizarReserva).toHaveBeenCalledTimes(1);
        expect(mockSistema.realizarReserva).toHaveBeenCalledWith(mockReserva);
    });

});
