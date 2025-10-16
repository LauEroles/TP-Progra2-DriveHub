import SistemaEmpresa from "../src/prueba_SistemaEmpresa";
import Reserva from "../src/prueba_reserva";
// import Vehiculo from "../src/vehiculo";
// import Suv from "../src/suv";
// import Sedan from "../src/sedan";
// import Compacto from "../src/compacto";

jest.mock("../src/prueba_reserva");
//jest.mock("../src/cliente");
//jest.mock("../src/vehiculo");

const MockReserva = Reserva as jest.MockedClass<typeof Reserva>;
//const MockCliente = Cliente as jest.MockedClass<typeof Cliente>;
//const MockSuv = Vehiculo as jest.MockedClass<typeof Suv>;

describe("SistemaEmpresa.hayDisponibilidad", () => {
    const sistema = new SistemaEmpresa();

    test("devuelve true cuando no hay reservas existentes", () => {
        expect(sistema.hayDisponibilidad(new Date(2025, 5, 10), new Date(2025, 5, 12), "AAA")).toBe(true);
    });

    test("devuelve false cuando hay solapamiento de fechas para el mismo vehículo", () => {
        const reserva = new MockReserva(new Date(2025, 5, 10), new Date(2025, 5, 15), "AAA", 1);
        sistema.getReservas().push(reserva);
        expect(sistema.hayDisponibilidad(new Date(2025, 5, 12), new Date(2025, 5, 13), "AAA")).toBe(false);
    });
});