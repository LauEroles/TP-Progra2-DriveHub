import GestorReserva from "../src/gestor_reserva";
import Reserva from "../src/reserva";
import Cliente from "../src/cliente";
import Vehiculo from "../src/vehiculo";
import Suv from "../src/suv";
import Sedan from "../src/sedan";
import Compacto from "../src/compacto";
import { Estado } from "../src/estados/estado";
import { Disponible } from "../src/estados/disponible";
import { mockDeep, MockProxy} from 'jest-mock-extended'



jest.mock("../src/reserva");
jest.mock("../src/cliente");
jest.mock("../src/vehiculo");
jest.mock("../src/suv");
jest.mock("../src/estados/estado")
jest.mock("../src/estados/disponible")

describe("GestorReserva.hayDisponibilidad", () => {

    const gestor = new GestorReserva();

    const estado: Estado = new Disponible() as jest.Mocked<Estado>;
    const cliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;

    const suv = new Suv(100, "AAA", estado) as jest.Mocked<Vehiculo>;
    suv.getMatricula.mockReturnValue("AAA");

    const existente = new Reserva(suv, cliente, new Date(2025, 5, 10), new Date(2025, 5, 15)) as jest.Mocked<Reserva>;
    
    existente.getVehiculo.mockReturnValue(suv);
    existente.getFechaInicio.mockReturnValue(new Date(2025, 5, 10));
    existente.getFechaFin.mockReturnValue(new Date(2025, 5, 15));

    
    test("devuelve true cuando no hay reservas existentes", () => {
        const fechaInicio: Date = new Date(2025, 5, 12);
        const fechaFin: Date = new Date(2025, 5, 13);

        expect(gestor.hayDisponibilidad(fechaInicio, fechaFin, suv, [])).toBe(true);
    });

    test("devuelve true cuando hay solapamiento de fechas para distinto vehículo", () => {
        const suv2 = new Suv(100, "BBB", estado) as jest.Mocked<Vehiculo>;
        const fechaInicio: Date = new Date(2025, 5, 12);
        const fechaFin: Date = new Date(2025, 5, 13);

        suv2.getMatricula.mockReturnValue("BBB");

        expect(gestor.hayDisponibilidad(fechaInicio, fechaFin, suv2, [existente])).toBe(true);
    });

    test("devuelve false cuando hay solapamiento de fechas para el mismo vehículo", () => {
        const fechaInicio: Date = new Date(2025, 5, 12);
        const fechaFin: Date = new Date(2025, 5, 13);

        expect(gestor.hayDisponibilidad(fechaInicio, fechaFin, suv, [existente])).toBe(false);
    });

    test("devuelve true cuando NO hay solapamiento de fechas para el mismo vehículo", () => {
        const fechaInicio: Date = new Date(2025, 5, 16);
        const fechaFin: Date = new Date(2025, 5, 18);

        expect(gestor.hayDisponibilidad(fechaInicio, fechaFin, suv, [existente])).toBe(true);
    });
});

describe("GestorReserva agrega reserva", ()=>{
    test("Deberia agregar la reserva", ()=>{
        const gestor= new GestorReserva();
        const reservas: Reserva[]=[];

        const estado=new Disponible() as jest.Mocked<Estado>;
        const cliente= new Cliente("Pepe", 1) as jest.Mocked<Cliente>;
        const vehiculo= new Suv(100, "AAA", estado) as jest.Mocked<Vehiculo>;

        const reserva=new Reserva(vehiculo, cliente, new Date(2025, 5, 10), new Date(2025, 5, 15))as jest.Mocked<Reserva>;
        
        gestor.agregar(reserva, reservas);

        expect(reservas.length).toBe(1);
        expect(reservas[0]).toBe(reserva);

    });


    test("Deberia eliminar una reserva de la lista", ()=>{
        const gestor= new GestorReserva();
        const reservas: Reserva[]=[];

        const estado=new Disponible() as jest.Mocked<Estado>;
        const cliente= new Cliente("Pepe", 1) as jest.Mocked<Cliente>;
        const vehiculo= new Suv(100, "AAA", estado) as jest.Mocked<Vehiculo>;

        const reserva=new Reserva(vehiculo, cliente, new Date(2025, 5, 10), new Date(2025, 5, 15))as jest.Mocked<Reserva>;
        
        gestor.agregar(reserva, reservas);
        gestor.eliminar(reserva, reservas);

        expect(reservas.length).toBe(0);
    });

});