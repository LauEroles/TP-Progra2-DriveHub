import Vehiculo from "./vehiculo";
import Reserva from "./reserva";
import { Estado } from "./estados/estado";
import MantenimientoVehiculo from "./mantenimientoVehiculo";

export default class GestorEstadisticas {

    private static filtrarReservasPorFecha(reservas: Reserva[], fechaInicio: Date, fechaFin: Date): Reserva[] {
        return reservas.filter(r => 
            r.getFechaFin() >= fechaInicio && r.getFechaFin() <= fechaFin
        );
    }
    public static getRankingAlquileres(historial: Reserva[], fechaInicio: Date, fechaFin: Date): void {
        const reservasPeriodo = this.filtrarReservasPorFecha(historial, fechaInicio, fechaFin);
        
        if (reservasPeriodo.length === 0) {
            console.log("No hay reservas completadas en ese período.");
            return;
        }

        const conteo: Map<string, number> = new Map();
        for (const reserva of reservasPeriodo) {
            const matricula = reserva.getVehiculo().getMatricula();
            conteo.set(matricula, (conteo.get(matricula) || 0) + 1);
        }

        const ranking = Array.from(conteo.entries()).sort((a, b) => b[1] - a[1]); // Lo pase a array porque no encontré para ordenar el map.
        console.log("Reporte: Vehículo más y menos alquilado");  
        console.log(`Vehículo Más Alquilado: ${ranking[0][0]} (${ranking[0][1]} alquileres)`);
        console.log(`Vehículo Menos Alquilado: ${ranking[ranking.length - 1][0]} (${ranking[ranking.length - 1][1]} alquileres)`);
    }

        
    public static getRentabilidad(vehiculos: Vehiculo[], historial: Reserva[]): void {
    
    const rentabilidades: { [matricula: string]: number } = {};

    for (const vehiculo of vehiculos) {
        const matricula = vehiculo.getMatricula();

        const ingresos = historial
            .filter(r => r.getVehiculo().getMatricula() === matricula)
            .reduce((sum, r) => sum + r.calcularTotal(), 0);

        const costosMantenimiento = vehiculo.getCostoTotalMantenimiento();

    
    }
    const ranking = Object.entries(rentabilidades).sort((a, b) => b[1] - a[1]);
    console.log("Reporte: Rentabilidad por Vehículo (Histórica)");
    console.log(`Mayor Rentabilidad: ${ranking[0][0]} ($${ranking[0][1]})`);
    console.log(`Menor Rentabilidad: ${ranking[ranking.length - 1][0]} ($${ranking[ranking.length - 1][1]})`);
}
    }