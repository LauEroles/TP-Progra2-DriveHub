import Vehiculo from "./vehiculo";
import Reserva from "./reserva";

/**
 * Clase encargada de generar estadísticas y reportes sobre el funcionamiento del sistema.
 * Incluye reportes de alquileres, rentabilidad y ocupación de la flota.
 * Todos sus métodos son estáticos, por lo que no requiere instanciar la clase.  
 */

export default class GestorEstadisticas {
 /**
     * Filtra una lista de reservas según un intervalo de fechas.
     * @param {Reserva[]} reservas Lista completa de reservas sin procesar.
     * @param {Date} fechaInicio Fecha inicio del intervalo a analizar.
     * @param {Date} fechaFin Fecha fin del intervalo a analizar.
     * @returns {Reserva[]} Lista de reservas procesadas que coinciden con el intervalo.
     */

    private filtrarReservasPorFecha(reservas: Reserva[], fechaInicio: Date, fechaFin: Date): Reserva[] {
    return reservas.filter(r => {
        const inicio = r.getFechaInicio();
        const fin = r.getFechaFin();

        return inicio <= fechaFin && fin >= fechaInicio;
    });
}


    /**
     * Genera el ranking de vehículos más y menos alquilados en un período.
     * Muestra los resultados por consola.
     * @param {Reserva[]} historial Historial completo de reservas.
     * @param {Date} fechaInicio Fecha inicial del período a analizar.
     * @param {Date} fechaFin Fecha final del período a analizar.
     */

    public  getRankingAlquileres(historial: Reserva[], fechaInicio: Date, fechaFin: Date): void {

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


  /**
     * Calcula la rentabilidad de cada vehículo del sistema.
     * Considera ingresos por reservas y costos de mantenimiento.
     * Muestra por consola el vehículo más y menos rentable.
     * @param {Vehiculo[]} vehiculos Lista de vehículos registrados en el sistema.
     * @param {Reserva[]} historial Historial completo de reservas.
     */
        
    public getRentabilidad(vehiculos: Vehiculo[], historial: Reserva[]): void {
    
    const rentabilidades: { [matricula: string]: number } = {};

    for (const vehiculo of vehiculos) {
        const matricula = vehiculo.getMatricula();

        const ingresos = historial
            .filter(r => r.getVehiculo().getMatricula() === matricula)
            .reduce((sum, r) => sum + r.calcularTotal(), 0);

        const costosMantenimiento = vehiculo.getCostoTotalMantenimiento();
        rentabilidades[matricula] = ingresos - costosMantenimiento;
    
    }

    const ranking = Object.entries(rentabilidades).sort((a, b) => b[1] - a[1]);

    if (ranking.length === 0) {
        console.log("No hay vehículos registrados para calcular rentabilidad.");
        return;
    }

    console.log("Reporte: Rentabilidad por Vehículo (Histórica)");
    console.log(`Mayor Rentabilidad: ${ranking[0][0]} ($${ranking[0][1]})`);
    console.log(`Menor Rentabilidad: ${ranking[ranking.length - 1][0]} ($${ranking[ranking.length - 1][1]})`);
}


  /**
     * Calcula el porcentaje de ocupación de la flota en Alquiler.
     * @param {Vehiculo[]} vehiculos Lista total de vehículos del sistema.
     * @returns {number} Porcentaje de flota ocupada.
     */


    public ocupacionFlota(vehiculos: Vehiculo[]): number {
        const total = vehiculos.length;
        if (total === 0) return 0;

        const ocupados = vehiculos.filter(
            v => v.getEstado().estaEnAlquiler()
        ).length;

        return ((ocupados / total) * 100);
    }

    }

    