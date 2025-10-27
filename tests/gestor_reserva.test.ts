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
        const suv = new Suv(100, "AAA") as jest.Mocked<Vehiculo>;

        const cliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;

        const solicitada = new Reserva(suv, cliente, new Date(2025, 5, 12), new Date(2025, 5, 13)) as jest.Mocked<Reserva>;
        
        const reservas: Reserva[] = [];

        solicitada.getVehiculo.mockReturnValue(suv);
        solicitada.getFechaInicio.mockReturnValue(new Date(2025, 5, 12));
        solicitada.getFechaFin.mockReturnValue(new Date(2025, 5, 13));

        expect(gestor.hayDisponibilidad(solicitada, reservas)).toBe(true);
    });


    test("devuelve true cuando hay solapamiento de fechas para distinto vehículo", () => {
        const suv1 = new Suv(100, "AAA") as jest.Mocked<Vehiculo>;
        const suv2 = new Suv(100, "BBB") as jest.Mocked<Vehiculo>;

        const cliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;

        const existente = new Reserva(suv1, cliente, new Date(2025, 5, 10), new Date(2025, 5, 15)) as jest.Mocked<Reserva>;
        const solicitada = new Reserva(suv2, cliente, new Date(2025, 5, 12), new Date(2025, 5, 13)) as jest.Mocked<Reserva>;

        suv1.getMatricula.mockReturnValue("AAA");
        suv2.getMatricula.mockReturnValue("BBB");

        existente.getVehiculo.mockReturnValue(suv1);
        existente.getFechaInicio.mockReturnValue(new Date(2025, 5, 10));
        existente.getFechaFin.mockReturnValue(new Date(2025, 5, 15));

        solicitada.getVehiculo.mockReturnValue(suv2);
        solicitada.getFechaInicio.mockReturnValue(new Date(2025, 5, 12));
        solicitada.getFechaFin.mockReturnValue(new Date(2025, 5, 13));

        expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(true);
    });


    test("devuelve false cuando hay solapamiento de fechas para el mismo vehículo", () => {
        const suv = new Suv(100, "AAA") as jest.Mocked<Vehiculo>;

        const cliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;

        const existente = new Reserva(suv, cliente, new Date(2025, 5, 10), new Date(2025, 5, 15)) as jest.Mocked<Reserva>;
        const solicitada = new Reserva(suv, cliente, new Date(2025, 5, 12), new Date(2025, 5, 13)) as jest.Mocked<Reserva>;

        suv.getMatricula.mockReturnValue("AAA");

        existente.getVehiculo.mockReturnValue(suv);
        existente.getFechaInicio.mockReturnValue(new Date(2025, 5, 10));
        existente.getFechaFin.mockReturnValue(new Date(2025, 5, 15));

        solicitada.getVehiculo.mockReturnValue(suv);
        solicitada.getFechaInicio.mockReturnValue(new Date(2025, 5, 12));
        solicitada.getFechaFin.mockReturnValue(new Date(2025, 5, 13));

        expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(false);
    });


    test("devuelve true cuando NO hay solapamiento de fechas para el mismo vehículo", () => {
        const suv = new Suv(100, "AAA") as jest.Mocked<Vehiculo>;

        const cliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;

        const existente = new Reserva(suv, cliente, new Date(2025, 5, 10), new Date(2025, 5, 15)) as jest.Mocked<Reserva>;
        const solicitada = new Reserva(suv, cliente, new Date(2025, 5, 16), new Date(2025, 5, 18)) as jest.Mocked<Reserva>;

        suv.getMatricula.mockReturnValue("AAA");

        existente.getVehiculo.mockReturnValue(suv);
        existente.getFechaInicio.mockReturnValue(new Date(2025, 5, 10));
        existente.getFechaFin.mockReturnValue(new Date(2025, 5, 15));

        solicitada.getVehiculo.mockReturnValue(suv);
        solicitada.getFechaInicio.mockReturnValue(new Date(2025, 5, 16));
        solicitada.getFechaFin.mockReturnValue(new Date(2025, 5, 18));

        expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(true);
    });

});