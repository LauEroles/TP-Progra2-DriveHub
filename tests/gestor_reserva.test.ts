import GestorReserva from "../src/gestor_reserva";

type MockReserva = {
    getVehiculo: () => { getMatricula: () => string };
    getFechaInicio: () => Date;
    getFechaFin: () => Date;
};

function makeReserva(matricula: string, inicio: Date, fin: Date): MockReserva {
    return {
        getVehiculo: () => ({ getMatricula: () => matricula }),
        getFechaInicio: () => inicio,
        getFechaFin: () => fin,
    };
}

describe("GestorReserva.hayDisponibilidad", () => {
    const gestor = new GestorReserva();

    test("devuelve true cuando no hay reservas existentes", () => {
        const solicitada = makeReserva("AAA111", new Date(2025, 5, 10), new Date(2025, 5, 12));
        const reservas: MockReserva[] = [];
        expect(gestor.hayDisponibilidad(solicitada, reservas)).toBe(true);
    });

    test("devuelve false cuando hay solapamiento para el mismo vehículo", () => {
        const existente = makeReserva("AAA111", new Date(2025, 5, 10), new Date(2025, 5, 15));
        const solicitada = makeReserva("AAA111", new Date(2025, 5, 12), new Date(2025, 5, 13));
        expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(false);
    });

    test("devuelve true cuando hay solapamiento en fechas pero distinto vehículo", () => {
        const existente = makeReserva("BBB222", new Date(2025, 5, 10), new Date(2025, 5, 15));
        const solicitada = makeReserva("AAA111", new Date(2025, 5, 12), new Date(2025, 5, 14));
        expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(true);
    });

    test("considera solapamiento en el borde (fechas inclusivas) — inicio solicitado en fin existente", () => {
        const existente = makeReserva("CCC333", new Date(2025, 5, 10), new Date(2025, 5, 15));
        const solicitada = makeReserva("CCC333", new Date(2025, 5, 15), new Date(2025, 5, 20));
        // Según la implementación, los bordes inclusivos cuentan como solapamiento -> no hay disponibilidad
        expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(false);
    });

    test("devuelve true cuando no hay solapamiento (periodos separados)", () => {
        const existente = makeReserva("DDD444", new Date(2025, 5, 10), new Date(2025, 5, 15));
        const solicitada = makeReserva("DDD444", new Date(2025, 5, 16), new Date(2025, 5, 20));
        expect(gestor.hayDisponibilidad(solicitada, [existente])).toBe(true);
    });
});