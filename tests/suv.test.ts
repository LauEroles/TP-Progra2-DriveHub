import Suv from "../src/suv";
import Reserva from "../src/reserva";

jest.mock("../src/reserva");

describe("Clase Suv con mock de Reserva y días", () => {
  let suv: Suv;
  let reservaMock: jest.Mocked<Reserva>;

  beforeEach(() => {
    jest.clearAllMocks(); 
    suv = new Suv(1000, "ABC123");
    reservaMock = {
      getKmsRecorridos: jest.fn(),
      getFechaInicio: jest.fn(),
      getFechaFin: jest.fn(),
      getCliente: jest.fn(),
      getDias: jest.fn(), 
    } as unknown as jest.Mocked<Reserva>; 
  });

  test("calcula correctamente la tarifa sin superar 500 km y 1 día", () => {
    reservaMock.getKmsRecorridos.mockReturnValue(400);
    reservaMock.getDias.mockReturnValue(1); // 1 día de reserva

    const total = suv.calcularTarifa(reservaMock);

    // TARIFA_BASE_SUV = 80 * 1 día = 80
    // Cargo fijo adicional = 15 * 1 día = 15
    // No supera 500 km → cargo variable = 0
    // Total = 80 + 15 = 95
    expect(total).toBe(95);
  });

  test("calcula correctamente la tarifa superando 500 km y 1 día", () => {
    reservaMock.getKmsRecorridos.mockReturnValue(600);
    reservaMock.getDias.mockReturnValue(1); // 1 día de reserva

    const total = suv.calcularTarifa(reservaMock);

    // TARIFA_BASE_SUV = 80 * 1 día = 80
    // Cargo fijo adicional = 15 * 1 día = 15
    // Cargo variable = 600 km * 0.25 = 150
    // Total = 80 + 15 + 150 = 245
    expect(total).toBe(245);
  });

  test("calcula correctamente la tarifa para 3 días y 600 km", () => {
    reservaMock.getKmsRecorridos.mockReturnValue(600);
    reservaMock.getDias.mockReturnValue(3); // 3 días de reserva

    const total = suv.calcularTarifa(reservaMock);

    // TARIFA_BASE_SUV = 80 * 3 días = 240
    // Cargo fijo adicional = 15 * 3 días = 45
    // Cargo variable = 600 km * 0.25 = 150
    // Total = 240 + 45 + 150 = 435
    expect(total).toBe(435);
  });
});
