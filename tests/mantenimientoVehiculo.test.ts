
import MantenimientoVehiculo from "../src/mantenimientoVehiculo";

describe("MantenimientoVehiculo", () => {

  test("instancia correctamente y getters/setters funcionan", () => {
    const fecha = new Date("2025-10-12");
    const m = new MantenimientoVehiculo(2000, fecha);

    // Verificamos getters
    expect(m.getCostoMantenimiento()).toBe(2000);
    expect(m.getFecha()).toBe(fecha);

    // Verificamos setters
    m.setCostoMantenimiento(2500);
    expect(m.getCostoMantenimiento()).toBe(2500);

    const nuevaFecha = new Date("2025-10-15");
    m.setFecha(nuevaFecha);
    expect(m.getFecha()).toBe(nuevaFecha);

    // Verificamos mostrarDetalle
    expect(m.mostrarDetalle()).toBe(`Mantenimiento realizado el ${nuevaFecha} con costo $2500`);
  });

  test("lanza error si el costo es menor o igual a 0", () => {
    expect(() => new MantenimientoVehiculo(0, new Date())).toThrow("El costo de mantenimiento debe ser mayor a 0");
    expect(() => new MantenimientoVehiculo(-10, new Date())).toThrow();
  });

});
