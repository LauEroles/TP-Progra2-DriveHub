import Sedan from "../src/sedan";
import Reserva from "../src/reserva";

jest.mock("../src/reserva");

describe("Clase Sedan con mock de Reserva", () => {
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
    } as unknown as jest.Mocked<Reserva>;
  });

  test("calcula correctamente la tarifa para Sedan", () => {
    reservaMock.getKmsRecorridos.mockReturnValue(500);
    const total = sedan.calcularTarifa(reservaMock);
    expect(total).toBe(150);   
  });
});
