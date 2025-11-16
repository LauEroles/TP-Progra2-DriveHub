import Reserva from "../src/reserva";
import Vehiculo from "../src/vehiculos/vehiculo";
import Cliente from "../src/cliente";
import Temporada from "../src/temporadas/temporada";
import TempAlta from "../src/temporadas/tempAlta";
import TempBaja from "../src/temporadas/tempBaja";
import TempMedia from "../src/temporadas/tempMedia";

describe("Reserva", () => {

    const mockVehiculo = {
        getTarifaBase: jest.fn(),
        getCargoFijo: jest.fn(),
        calcCargoVariable: jest.fn()
    } as unknown as jest.Mocked<Vehiculo>;

    const mockCliente = {} as unknown as jest.Mocked<Cliente>;
    const fechaInicio: Date = new Date("2025-01-10");
    const fechaFin: Date = new Date("2025-01-12");

    const mockTemporada = {
        calcTarifaBase: jest.fn()
    } as unknown as jest.Mocked<Temporada>;

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


    // setTemporada()
    test("asigna TempAlta para meses 12, 1, 2, 7", () => {
        const mesesAlta = [12, 1, 2, 7];

        mesesAlta.forEach(mes => {
            reserva.fechaInicio = new Date(2025, mes - 1, 10);

            reserva.setTemporada();

            expect(reserva.temporada).toBeInstanceOf(TempAlta);
        });
    });

    test("asigna TempMedia para meses 3, 4, 11", () => {
        const mesesMedia = [3, 4, 11];

        mesesMedia.forEach(mes => {
            reserva.fechaInicio = new Date(2025, mes - 1, 10);

            reserva.setTemporada();

            expect(reserva.temporada).toBeInstanceOf(TempMedia);
        });
    });

    test("asigna TempBaja para el resto de los meses", () => {
        const mesesBaja = [5, 6, 8, 9, 10];

        mesesBaja.forEach(mes => {
            reserva.fechaInicio = new Date(2025, mes - 1, 10);

            reserva.setTemporada();

            expect(reserva.temporada).toBeInstanceOf(TempBaja);
        });
    });


    // SETTERS simples
    test("setVehiculo asigna correctamente el vehículo", () => {
        const mockVehiculo2 = {} as unknown as jest.Mocked<Vehiculo>;
        reserva.setVehiculo(mockVehiculo2);
        expect(reserva.vehiculo).toBe(mockVehiculo2);
    });

    test("setCliente asigna correctamente el cliente", () => {
        const mockCliente2 = {} as unknown as jest.Mocked<Cliente>;
        reserva.setCliente(mockCliente2);
        expect(reserva.cliente).toBe(mockCliente2);
    });

    test("setFechaInicio asigna correctamente la fecha de inicio", () => {
        const fecha = new Date("2025-11-15");
        reserva.setFechaInicio(fecha);
        expect(reserva.fechaInicio).toBe(fecha);
    });

    test("setFechaFin asigna correctamente la fecha de fin", () => {
        const fecha = new Date("2025-11-17");
        reserva.setFechaFin(fecha);
        expect(reserva.fechaFin).toBe(fecha);
    });
    

    // GETTERS simples
    test("getVehiculo devuelve el vehículo correcto", () => {
        const mockVehiculo2 = {} as unknown as jest.Mocked<Vehiculo>;
        reserva.vehiculo = mockVehiculo2
        expect(reserva.getVehiculo()).toBe(mockVehiculo2);
    });

    test("getCliente devuelve el cliente correcto", () => {
        const mockCliente2 = {} as unknown as jest.Mocked<Cliente>;
        reserva.cliente = mockCliente2;
        expect(reserva.getCliente()).toBe(mockCliente2);
    });

    test("getFechaInicio y getFechaFin devuelven las fechas correctas", () => {
        const fecha1 = new Date(2025, 11, 20);
        const fecha2 = new Date(2025, 11, 22);
        reserva.fechaInicio = fecha1;
        reserva.fechaFin = fecha2;
        expect(reserva.getFechaInicio()).toBe(fecha1);
        expect(reserva.getFechaFin()).toBe(fecha2);
    });

    test("getTemporada devuelve la temporada correctamente", () => {
        const mockTemporada = {} as unknown as jest.Mocked<Temporada>;
        reserva.temporada = mockTemporada;
        expect(reserva.getTemporada()).toBe(mockTemporada);
    });


    //calcularTotal()
     test("calcula correctamente el total de la reserva según la fórmula", () => {
        reserva.temporada = mockTemporada;
        reserva.vehiculo = mockVehiculo;

        mockTemporada.calcTarifaBase.mockReturnValue(80);
        mockVehiculo.getTarifaBase.mockReturnValue(80);
        mockVehiculo.getCargoFijo.mockReturnValue(20);
        mockVehiculo.calcCargoVariable.mockReturnValue(50);

        reserva.getDias = jest.fn() as any;
        reserva.getKmsRecorridos = jest.fn() as any;

        (reserva.getDias as jest.Mock).mockReturnValue(3);
        (reserva.getKmsRecorridos as jest.Mock).mockReturnValue(200);

        const total = reserva.calcularTotal();

        expect(total).toBe(350);
        expect(mockTemporada.calcTarifaBase).toHaveBeenCalledWith(80);
        expect(mockVehiculo.getTarifaBase).toHaveBeenCalled();
        expect(mockVehiculo.getCargoFijo).toHaveBeenCalled();
        expect(mockVehiculo.calcCargoVariable).toHaveBeenCalledWith(200);
    });

});
