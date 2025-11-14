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

    });

});
