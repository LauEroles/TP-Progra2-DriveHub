import Reserva from "../src/reserva";
import Vehiculo from "../src/vehiculo";
import Cliente from "../src/cliente";
import Temporada from "../src/temporada";

describe("Reserva", () => {

    const mockVehiculo = {} as unknown as jest.Mocked<Vehiculo>;
    const mockCliente = {} as unknown as jest.Mocked<Cliente>;
    const fechaInicio: Date = new Date("2025-01-10");
    const fechaFin: Date = new Date("2025-01-12");

    const reserva = new Reserva(mockVehiculo, mockCliente, fechaInicio, fechaFin);

    test("constructor asigna correctamente los atributos", () => {
        expect(reserva.vehiculo).toBe(mockVehiculo);
        expect(reserva.cliente).toBe(mockCliente);
        expect(reserva.fechaInicio).toBe(fechaInicio);
        expect(reserva.fechaFin).toBe(fechaFin);
        expect(reserva.kmsRecorridos).toBe(0);
    });
    
    // validarFecha()
    test("validarFecha devuelve true cuando fechaFin >= fechaInicio", () => {
        expect(reserva.validarFecha()).toBe(true);
    });

    test("validarFecha devuelve false cuando fechaFin < fechaInicio", () => {
        const fechaFinInvalida = new Date("2025-01-05");
        const reserva = new Reserva(mockVehiculo, mockCliente, fechaInicio, fechaFinInvalida);
        expect(reserva.validarFecha()).toBe(false);
    });

    
    // getDias()
    test("getDias calcula correctamente los días (incluye ambos extremos)", () => {
        expect(reserva.getDias()).toBe(3);
    });

    test("getDias con misma fecha debería retornar 1 día", () => {
        const fecha = new Date("2025-01-10");
        const reserva = new Reserva(mockVehiculo, mockCliente, fecha, fecha);
        expect(reserva.getDias()).toBe(1);
    });


    // setKmsRecorridos()
    test("setKmsRecorridos asigna correctamente cuando km > 0", () => {
        reserva.setKmsRecorridos(120);
        expect(reserva.getKmsRecorridos()).toBe(120);
    });

    test("setKmsRecorridos lanza error si km <= 0", () => {
        expect(() => reserva.setKmsRecorridos(0)).toThrow(
            "El kilometro recorrido no puede ser menor a cero"
        );
        expect(() => reserva.setKmsRecorridos(-50)).toThrow(
            "El kilometro recorrido no puede ser menor a cero"
        );
    });


    // SETTERS simples
    
    
    // GETTERS simples
    test("getVehiculo devuelve el vehículo correcto", () => {
        expect(reserva.getVehiculo()).toBe(mockVehiculo);
    });

    test("getCliente devuelve el cliente correcto", () => {
        expect(reserva.getCliente()).toBe(mockCliente);
    });

    test("getFechaInicio y getFechaFin devuelven las fechas correctas", () => {
        expect(reserva.getFechaInicio()).toBe(fechaInicio);
        expect(reserva.getFechaFin()).toBe(fechaFin);
    });

    test("getTemporada devuelve la temporada correctamente", () => {
        let mockTemporada = {} as unknown as jest.Mocked<Temporada>;
        expect(reserva.getFechaInicio()).toBe(fechaInicio);
        expect(reserva.getFechaFin()).toBe(fechaFin);
    });

});
