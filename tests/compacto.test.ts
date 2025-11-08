import Compacto from "../src/compacto";
import Reserva from "../src/reserva";
import Cliente from "../src/cliente";
import Vehiculo from "../src/vehiculo";

jest.mock("../src/reserva");
jest.mock("../src/cliente");

describe("Compacto.calcularTarifa con días de reserva", () => {

    const compacto: Vehiculo = new Compacto(1000, "AAA");

    test("calcula tarifa base multiplicada por los días (sin cargo variable)", () => {
        const cliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;
        const reserva = new Reserva(compacto, cliente, new Date(2025, 5, 12), new Date(2025, 5, 12)) as jest.Mocked<Reserva>;

        // La reserva dura 1 día
        reserva.getKmsRecorridos.mockReturnValue(50);
        reserva.getDias = jest.fn().mockReturnValue(1); // mock del nuevo método getDias()

        const tarifa: number = compacto.calcularTarifa(reserva);

        // TARIFA_BASE_COMPACTO = 30, 1 día → 30
        expect(tarifa).toBe(30);
    });

    test("calcula tarifa con cargo variable y 1 día de reserva", () => {
        const cliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;
        const reserva = new Reserva(compacto, cliente, new Date(2025, 5, 12), new Date(2025, 5, 12)) as jest.Mocked<Reserva>;

        reserva.getKmsRecorridos.mockReturnValue(200);
        reserva.getDias = jest.fn().mockReturnValue(1);

        const tarifa: number = compacto.calcularTarifa(reserva);

        // TARIFA_BASE_COMPACTO = 30, km extra sobre 150 → 200-150 = 50 * cargoVariable (0.3) = 15
        // Total = 30 + 15 = 45
        expect(tarifa).toBe(45);
    });

    test("calcula tarifa para varios días de reserva", () => {
        const cliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;
        const reserva = new Reserva(compacto, cliente, new Date(2025, 5, 12), new Date(2025, 5, 14)) as jest.Mocked<Reserva>;

        reserva.getKmsRecorridos.mockReturnValue(100);
        reserva.getDias = jest.fn().mockReturnValue(3); // 3 días de reserva

        const tarifa: number = compacto.calcularTarifa(reserva);

        // TARIFA_BASE_COMPACTO = 30 * 3 días = 90
        expect(tarifa).toBe(90);
    });

});
