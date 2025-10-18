import Sedan from "../src/sedan";
import Reserva from "../src/reserva";

jest.mock("../src/reserva");

describe("Clase Sedan con mock de Reserva", () => {
  let sedan: Sedan;
  let reservaMock: jest.Mocked<Reserva>;

  beforeEach(() => {
    jest.clearAllMocks();
    sedan = new Sedan(5000, "XYZ789");
    
    // Creamos el mock con la propiedad kmFinal (no el método)
    reservaMock = {
      kmFinal: 5500,
      getFechaInicio: jest.fn(),
      getFechaFin: jest.fn(),
      getCliente: jest.fn(),
    } as unknown as jest.Mocked<Reserva>;
  });

  test("calcula correctamente la tarifa para Sedan", () => {
    const total = sedan.calcularTarifa(reservaMock);
    expect(total).toBe(150);   
  });
});
