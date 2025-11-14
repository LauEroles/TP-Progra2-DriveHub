import Cliente from "../src/cliente";
import SistemaEmpresa from "../src/sistemaEmpresa";
import Vehiculo from "../src/vehiculo";

describe("Cliente", () => {

    let mockSistema: jest.Mocked<SistemaEmpresa>;
    let mockVehiculo: jest.Mocked<Vehiculo>;

    beforeEach(() => {
        // Mock de SistemaEmpresa
        mockSistema = {
            realizarReserva: jest.fn()
        } as unknown as jest.Mocked<SistemaEmpresa>;

        // Mock de Vehiculo
        mockVehiculo = {} as unknown as jest.Mocked<Vehiculo>;
    });

    // constructor
    test("constructor debe asignar correctamente nombreCompleto e id", () => {
        const cliente = new Cliente("Juan Pérez", 101);
        expect(cliente).toBeInstanceOf(Cliente);
        expect((cliente as any).nombreCompleto).toBe("Juan Pérez");
        expect((cliente as any).id).toBe(101);
    });

    // solicitarReserva
    test("solicitarReserva debe invocar sistema.realizarReserva con los datos dados", () => {
        const cliente = new Cliente("Ana Gómez", 202);
        const fechaInicio: Date = new Date(2025, 11, 13);
        const fechaFin: Date = new Date(2025, 11, 15);
        cliente.solicitarReserva(fechaInicio, fechaFin, mockVehiculo, mockSistema);
        expect(mockSistema.realizarReserva).toHaveBeenCalledTimes(1);
        expect(mockSistema.realizarReserva).toHaveBeenCalledWith(mockVehiculo, cliente, fechaInicio, fechaFin);
    });

    test("getNombreCompleto debe devolver el nombre del cliente", () => {
        const cliente = new Cliente("Ana Gómez", 456);
        expect(cliente.getNombreCompleto()).toBe("Ana Gómez");
    });

    test("setNombreCompleto debe actualizar el nombre del cliente", () => {
        const cliente = new Cliente("Nombre Viejo", 789);
        cliente.setNombreCompleto("Nombre Nuevo");
        expect(cliente.getNombreCompleto()).toBe("Nombre Nuevo");
    });

    test("getId debe devolver el id del cliente", () => {
        const cliente = new Cliente("Carlos López", 111);
        expect(cliente.getId()).toBe(111);
    });

    test("setId debe actualizar el id del cliente", () => {
        const cliente = new Cliente("Persona", 222);
        cliente.setId(333);
        expect(cliente.getId()).toBe(333);
    });

});
