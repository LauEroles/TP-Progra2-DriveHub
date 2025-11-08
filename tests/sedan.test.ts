
import Sedan from "../src/sedan";
import Reserva from "../src/reserva";

jest.mock("../src/reserva");

describe("Clase Sedan con mock de Reserva y días", () => {
  let sedan: Sedan;
  let reservaMock: jest.Mocked<Reserva>;

  beforeEach(() => {
    jest.clearAllMocks();
    sedan = new Sedan(5000, "XYZ789");
    
    reservaMock = {
      getKmsRecorridos: jest.fn(),
      getFechaInicio: jest.fn(),
      getFechaFin: jest.fn(),
      getCliente: jest.fn(),
      getDias: jest.fn(), 
    } as unknown as jest.Mocked<Reserva>;
  });

  test("calcula correctamente la tarifa para 1 día y 500 km", () => {
    reservaMock.getKmsRecorridos.mockReturnValue(500);
    reservaMock.getDias.mockReturnValue(1); // reserva de 1 día

    const total = sedan.calcularTarifa(reservaMock);

    // TARIFA_BASE_SEDAN = 50 * 1 día + 500 km * 0.2 = 50 + 100 = 150
    expect(total).toBe(150);   
  });

  test("calcula correctamente la tarifa para 3 días y 600 km", () => {
    reservaMock.getKmsRecorridos.mockReturnValue(600);
    reservaMock.getDias.mockReturnValue(3); // reserva de 3 días

    const total = sedan.calcularTarifa(reservaMock);

    // TARIFA_BASE_SEDAN = 50 * 3 días = 150
    // cargo variable = 600 km * 0.2 = 120
    // Total = 150 + 120 = 270
    expect(total).toBe(270);
  });

  test("calcula correctamente la tarifa sin cargo variable", () => {
    reservaMock.getKmsRecorridos.mockReturnValue(0);
    reservaMock.getDias.mockReturnValue(2); // reserva de 2 días

    const total = sedan.calcularTarifa(reservaMock);

    // TARIFA_BASE_SEDAN = 50 * 2 días = 100, no hay cargo variable
    expect(total).toBe(100);
  });
});
