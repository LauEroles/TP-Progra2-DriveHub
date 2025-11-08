import Suv from "../src/suv";
import Reserva from "../src/reserva";

jest.mock("../src/reserva");

describe("Clase Suv con mock de Reserva", () => {
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
    } as unknown as jest.Mocked<Reserva>; 
  });

  test("calcula correctamente la tarifa sin superar 500 km", () => {
    reservaMock.getKmsRecorridos.mockReturnValue(400);
    const total = suv.calcularTarifa(reservaMock);
    expect(total).toBe(95); // 80 + 15
  });

  test("calcula correctamente la tarifa superando 500 km", () => {
    reservaMock.getKmsRecorridos.mockReturnValue(600);
    const total = suv.calcularTarifa(reservaMock);
    expect(total).toBe(245); // 80 + 15 + (600 * 0.25)
  });
});
