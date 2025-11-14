import Reserva from "../src/reserva";
import Vehiculo from "../src/vehiculo";
import Cliente from "../src/cliente";

describe("Reserva", () => {

    let mockVehiculo: jest.Mocked<Vehiculo>;
    let mockCliente: jest.Mocked<Cliente>;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {

        // Mocks básicos
        mockVehiculo = {} as unknown as jest.Mocked<Vehiculo>;
        mockCliente = {} as unknown as jest.Mocked<Cliente>;

        fechaInicio = new Date("2025-01-10");
        fechaFin = new Date("2025-01-12");
    });

    test("constructor asigna correctamente los atributos", () => {

        const reserva = new Reserva(mockVehiculo, mockCliente, fechaInicio, fechaFin);

        expect(reserva.vehiculo).toBe(mockVehiculo);
        expect(reserva.cliente).toBe(mockCliente);
        expect(reserva.fechaInicio).toBe(fechaInicio);
        expect(reserva.fechaFin).toBe(fechaFin);
        expect(reserva.kmsRecorridos).toBe(0);
    });

    
    // validarFecha()
    
    test("validarFecha devuelve true cuando fechaFin >= fechaInicio", () => {

        const reserva = new Reserva(mockVehiculo, mockCliente, fechaInicio, fechaFin);

        expect(reserva.validarFecha()).toBe(true);
    });

    test("validarFecha devuelve false cuando fechaFin < fechaInicio", () => {

        const fechaFinInvalida = new Date("2025-01-05");
        const reserva = new Reserva(mockVehiculo, mockCliente, fechaInicio, fechaFinInvalida);

        expect(reserva.validarFecha()).toBe(false);
    });

    
    // getDias()
    
    test("getDias calcula correctamente los días (incluye ambos extremos)", () => {

        
        const reserva = new Reserva(mockVehiculo, mockCliente, fechaInicio, fechaFin);

        expect(reserva.getDias()).toBe(3);
    });

    test("getDias con misma fecha debería retornar 1 día", () => {

        const fecha = new Date("2025-01-10");
        const reserva = new Reserva(mockVehiculo, mockCliente, fecha, fecha);

        expect(reserva.getDias()).toBe(1);
    });

    // setKmsRecorridos()

    test("setKmsRecorridos asigna correctamente cuando km > 0", () => {

        const reserva = new Reserva(mockVehiculo, mockCliente, fechaInicio, fechaFin);
        reserva.setKmsRecorridos(120);

        expect(reserva.getKmsRecorridos()).toBe(120);
    });

    test("setKmsRecorridos lanza error si km <= 0", () => {

        const reserva = new Reserva(mockVehiculo, mockCliente, fechaInicio, fechaFin);

        expect(() => reserva.setKmsRecorridos(0)).toThrow(
            "El kilometro recorrido no puede ser menor a cero"
        );

        expect(() => reserva.setKmsRecorridos(-50)).toThrow(
            "El kilometro recorrido no puede ser menor a cero"
        );
    });

    
    // GETTERS simples
    
    test("getVehiculo devuelve el vehículo correcto", () => {
        const reserva = new Reserva(mockVehiculo, mockCliente, fechaInicio, fechaFin);
        expect(reserva.getVehiculo()).toBe(mockVehiculo);
    });

    test("getCliente devuelve el cliente correcto", () => {
        const reserva = new Reserva(mockVehiculo, mockCliente, fechaInicio, fechaFin);
        expect(reserva.getCliente()).toBe(mockCliente);
    });

    test("getFechaInicio y getFechaFin devuelven las fechas correctas", () => {
        const reserva = new Reserva(mockVehiculo, mockCliente, fechaInicio, fechaFin);
        expect(reserva.getFechaInicio()).toBe(fechaInicio);
        expect(reserva.getFechaFin()).toBe(fechaFin);
    });
});
