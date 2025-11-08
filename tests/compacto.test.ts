import Compacto from "../src/compacto";
import Reserva from "../src/reserva";
import Cliente from "../src/cliente";
import Vehiculo from "../src/vehiculo";

jest.mock("../src/reserva");
jest.mock("../src/cliente");

describe("Compacto.calcularTarifa", () => {

    const compacto: Vehiculo = new Compacto(1000, "AAA");


    test("calcula correctamente la tarifa", () => {
        const cliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;
        const reserva = new Reserva(compacto, cliente, new Date(2025, 5, 12), new Date(2025, 5, 13)) as jest.Mocked<Reserva>;

        reserva.getKmsRecorridos.mockReturnValue(100);

        let tarifa: number = compacto.calcularTarifa(reserva);

        expect(tarifa).toBe(30);
    });


    test("calcula correctamente la tarifa con cargo variable", () => {
        const cliente = new Cliente("Pepe", 1) as jest.Mocked<Cliente>;
        const reserva = new Reserva(compacto, cliente, new Date(2025, 5, 12), new Date(2025, 5, 13)) as jest.Mocked<Reserva>;

        reserva.getKmsRecorridos.mockReturnValue(200);

        let tarifa: number = compacto.calcularTarifa(reserva);

        expect(tarifa).toBe(45);
    });
});