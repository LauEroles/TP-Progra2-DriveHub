// import GestorReserva from "../src/gestor_reserva";
// import Reserva from "../src/reserva";
// import Cliente from "../src/cliente";
// import Vehiculo from "../src/vehiculo";
// import Suv from "../src/suv";
// import Sedan from "../src/sedan";
// import Compacto from "../src/compacto";

// jest.mock("../src/reserva");
// jest.mock("../src/cliente");
// jest.mock("../src/vehiculo");

// const MockReserva = Reserva as jest.MockedClass<typeof Reserva>;
// const MockCliente = Cliente as jest.MockedClass<typeof Cliente>;
// const MockSuv = Vehiculo as jest.MockedClass<typeof Suv>;

// describe("GestorReserva.hayDisponibilidad", () => {
//     const gestor = new GestorReserva();
//     const cliente = new MockCliente("Pepe", 1);

//     test("devuelve true cuando no hay reservas existentes", () => {
//         const suv = new MockSuv(100, "AAA");
//         const solicitada = new MockReserva(suv, cliente, new Date(2025, 5, 10), new Date(2025, 5, 12));
//         const reservas: Reserva[] = [];

//         expect(gestor.hayDisponibilidad(solicitada, reservas)).toBe(true);
//     });

//     // test("devuelve false cuando hay solapamiento de fechas para el mismo vehículo", () => {
//     //     const suv = new MockSuv(100, "AAA");
//     //     const existente = new MockReserva(suv, cliente, new Date(2025, 5, 10), new Date(2025, 5, 15));
//     //     const solicitada = new MockReserva(suv, cliente, new Date(2025, 5, 12), new Date(2025, 5, 13));

//     //     expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(false);
//     // });

//     // test("devuelve true cuando hay solapamiento de fechas para vehículos distintos", () => {
//     //     const suv1 = new MockSuv(1000, "AAA");
//     //     const suv2 = new MockSuv(2000, "BBB");
//     //     const existente = new MockReserva(suv1, cliente, new Date(2025, 5, 10), new Date(2025, 5, 15));
//     //     const solicitada = new MockReserva(suv2, cliente, new Date(2025, 5, 12), new Date(2025, 5, 14));

//     //     expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(true);
//     // });

//     // test("devuelve true cuando no hay solapamiento de fechas para el mismo vehículo", () => {
//     //     const suv = new MockSuv(100, "AAA");
//     //     const existente = new MockReserva(suv, cliente, new Date(2025, 5, 10), new Date(2025, 5, 15));
//     //     const solicitada = new MockReserva(suv, cliente, new Date(2025, 5, 16), new Date(2025, 5, 20));

//     //     expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(true);
//     // });
    
//     // test("considera solapamiento en el borde (fechas inclusivas) — inicio solicitado en fin existente", () => {
//     //     const suv = new MockSuv(100, "AAA");
//     //     const existente = new MockReserva(suv, cliente, new Date(2025, 5, 10), new Date(2025, 5, 15));
//     //     const solicitada = new MockReserva(suv, cliente, new Date(2025, 5, 15), new Date(2025, 5, 20));
//     //     // Los bordes inclusivos cuentan como solapamiento -> no hay disponibilidad
//     //     expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(false);
//     // });
// });