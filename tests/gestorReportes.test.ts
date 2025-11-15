import GestorEstadisticas from "../src/gestorReportes";
import Compacto from "../src/compacto";
import { Disponible } from "../src/estados/disponible";
import { EnAlquiler } from "../src/estados/enAlquiler";
import { Estado } from "../src/estados/estado";
import Vehiculo from "../src/vehiculo";
import Reserva from "../src/reserva";
import Cliente from "../src/cliente";

describe("GestorEstadisticas Ocupación flota", () => {

  const estadoDisponible: Estado = new Disponible();
  const estadoAlquiler: Estado = new EnAlquiler();
  const gestor = new GestorEstadisticas();

  const v1: Vehiculo = new Compacto(1000, "AAA111", estadoAlquiler);
  const v2: Vehiculo = new Compacto(1000, "BBB222", estadoDisponible);
  const v3: Vehiculo = new Compacto(1000, "CCC333", estadoAlquiler);

  test("retorna 0 si no hay vehículos", () => {
    const resultado = gestor.ocupacionFlota([]);
    expect(resultado).toBe(0);
  });

  test("calcula correctamente la ocupación", () => {
    const resultado = gestor.ocupacionFlota([v1, v2, v3]);
    expect(resultado).toBe(66.66666666666666);
  });

  test("retorna 100 si todos están en alquiler", () => {
    const resultado = gestor.ocupacionFlota([v1, v3]);
    expect(resultado).toBe(100);
  });

  test("retorna 0% si ninguno está en alquiler", () => {
    const resultado = gestor.ocupacionFlota([v2]);
    expect(resultado).toBe(0);
  });
});


describe("GestorEstadisticas Ranking estadísticas", () => {

  const estado = new Disponible();
  const cliente = new Cliente("Juan", 123);
  const gestor = new GestorEstadisticas();


  const v1: Vehiculo = new Compacto(1000, "AAA111", estado);
  const v2: Vehiculo = new Compacto(1000, "BBB222", estado);

  const r1 = new Reserva(v1, cliente, new Date("2024-01-01"), new Date("2024-01-10"));
  const r2 = new Reserva(v1, cliente, new Date("2024-01-02"), new Date("2024-01-03"));
  const r3 = new Reserva(v2, cliente, new Date("2024-01-05"), new Date("2024-01-06"));


    test("no existen reservas en el periodo seleccionado", () => {

        gestor.getRankingAlquileres([r1,r2,r3], new Date("2025-01-01"), new Date("2025-02-02"))

        expect(console.log).toHaveBeenCalledWith("No hay reservas completadas en ese período.")
    });

  test("detecta correctamente el más y menos alquilado", () => {

    gestor.getRankingAlquileres(
      [r1, r2, r3],
      new Date("2024-01-01"),
      new Date("2024-01-31")
    );
    expect(console.log).toHaveBeenCalledWith("Vehículo Más Alquilado: AAA111 (2 alquileres)");
    expect(console.log).toHaveBeenCalledWith("Vehículo Menos Alquilado: BBB222 (1 alquileres)");
  });
});

describe("GestorEstadisticas Rentabilidad", () => {

  console.log = jest.fn();

  const estado = new Disponible();
  const cliente = new Cliente("Juan", 123);
  const gestor = new GestorEstadisticas();

  const v1: Vehiculo = new Compacto(1000, "AAA111", estado);
  const v2: Vehiculo = new Compacto(1000, "BBB222", estado);
  const v3: Vehiculo = new Compacto(1000, "CCC222", estado)

  v1.getCostoTotalMantenimiento = () => 50;
  v2.getCostoTotalMantenimiento = () => 20;
  v3.getCostoTotalMantenimiento = () => 100;

  const r1 = new Reserva(v1, cliente, new Date(), new Date());
  r1.calcularTotal = () => 200;

  const r2 = new Reserva(v1, cliente, new Date(), new Date());
  r2.calcularTotal = () => 300;

  const r3 = new Reserva(v2, cliente, new Date(), new Date());
  r3.calcularTotal = () => 150;

  const r4 = new Reserva(v3, cliente, new Date(), new Date());
  r4.calcularTotal = () => 150;

    test("No hay vehículos registrados", () => {

        gestor.getRentabilidad([], []);

        expect(console.log).toHaveBeenCalledWith("No hay vehículos registrados para calcular rentabilidad.")

    })

  test("calcula correctamente mayor y menor rentabilidad", () => {

    gestor.getRentabilidad([v1, v2, v3], [r1, r2, r3, r4]);

    expect(console.log).toHaveBeenCalledWith("Reporte: Rentabilidad por Vehículo (Histórica)");
    expect(console.log).toHaveBeenCalledWith("Mayor Rentabilidad: AAA111 ($450)");
    expect(console.log).toHaveBeenCalledWith("Menor Rentabilidad: CCC222 ($50)");
  });
});