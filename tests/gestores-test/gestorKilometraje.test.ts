import GestorKilometraje from "../../src/gestores/gestorKilometraje";
import Reserva from "../../src/reserva";
import SistemaEmpresa from "../../src/sistemaEmpresa";
import Vehiculo from "../../src/vehiculos/vehiculo";

describe("GestorKilometraje", () => {

    let gestor: GestorKilometraje;

    let mockReserva: jest.Mocked<Reserva>;
    let mockSistema: jest.Mocked<SistemaEmpresa>;
    let mockVehiculoReserva: jest.Mocked<Vehiculo>;
    let mockVehiculoSistema: jest.Mocked<Vehiculo>;

    beforeEach(() => {
        gestor = new GestorKilometraje();

        mockVehiculoReserva = {
            getMatricula: jest.fn(),
            getKm: jest.fn()
        } as any;

        mockVehiculoSistema = {
            getMatricula: jest.fn(),
            setKm: jest.fn()
        } as any;

        mockReserva = {
            getVehiculo: jest.fn(),
            getKmsRecorridos: jest.fn()
        } as any;

        mockSistema = {
            getVehiculos: jest.fn()
        } as any;
    });

    
    test("actualiza correctamente el kilometraje cuando el vehículo existe", () => {

        mockVehiculoReserva.getMatricula.mockReturnValue("ABC123");
        mockVehiculoReserva.getKm.mockReturnValue(1000);

        mockVehiculoSistema.getMatricula.mockReturnValue("ABC123");

        mockReserva.getVehiculo.mockReturnValue(mockVehiculoReserva);
        mockReserva.getKmsRecorridos.mockReturnValue(250);

        mockSistema.getVehiculos.mockReturnValue([mockVehiculoSistema]);

        gestor.actualizarKmVehiculo(mockReserva, mockSistema);

        expect(mockVehiculoSistema.setKm).toHaveBeenCalledWith(1250); // 1000 + 250
        expect(mockVehiculoSistema.setKm).toHaveBeenCalledTimes(1);
    });


    test("lanza error si el vehículo no existe en el sistema", () => {
        mockVehiculoReserva.getMatricula.mockReturnValue("ZZZ999");
        mockReserva.getVehiculo.mockReturnValue(mockVehiculoReserva);

        mockSistema.getVehiculos.mockReturnValue([]);

        expect(() =>
            gestor.actualizarKmVehiculo(mockReserva, mockSistema)
        ).toThrow("El vehículo ZZZ999 no está registrado en el sistema.");
    });


    test("usa correctamente los métodos de la reserva", () => {
        mockVehiculoReserva.getMatricula.mockReturnValue("ABC123");
        mockVehiculoReserva.getKm.mockReturnValue(500);
        mockVehiculoSistema.getMatricula.mockReturnValue("ABC123");

        mockReserva.getVehiculo.mockReturnValue(mockVehiculoReserva);
        mockReserva.getKmsRecorridos.mockReturnValue(100);

        mockSistema.getVehiculos.mockReturnValue([mockVehiculoSistema]);

        gestor.actualizarKmVehiculo(mockReserva, mockSistema);

        expect(mockReserva.getVehiculo).toHaveBeenCalled();
        expect(mockReserva.getKmsRecorridos).toHaveBeenCalled();
    });


    test("usa correctamente getVehiculo().getKm()", () => {
        mockVehiculoReserva.getMatricula.mockReturnValue("ABC123");
        mockVehiculoReserva.getKm.mockReturnValue(300);

        mockVehiculoSistema.getMatricula.mockReturnValue("ABC123");

        mockReserva.getVehiculo.mockReturnValue(mockVehiculoReserva);
        mockReserva.getKmsRecorridos.mockReturnValue(50);

        mockSistema.getVehiculos.mockReturnValue([mockVehiculoSistema]);

        gestor.actualizarKmVehiculo(mockReserva, mockSistema);

        expect(mockVehiculoReserva.getKm).toHaveBeenCalled();
    });

});
