/**
* Representa un mantenimiento realizado a un vehículo.
* Contiene información sobre el costo y la fecha del mantenimiento.
*/
export default class MantenimientoVehiculo {
    private costoMantenimiento: number;
    private fecha: Date;

    /**
    * Crea un nuevo mantenimiento con costo y fecha.
    * @param {number} costoMantenimiento Costo del mantenimiento (debe ser mayor a 0).
    * @param {Date} fecha Fecha en que se realizó el mantenimiento.
    * @throws {Error} Si el costo es menor o igual a 0.
    */
    constructor(costoMantenimiento: number, fecha: Date) {
        if (costoMantenimiento <= 0) {
            throw new Error("El costo de mantenimiento debe ser mayor a 0");
        }
        this.costoMantenimiento = costoMantenimiento;
        this.fecha = fecha;
    }

    /** @returns Costo del mantenimiento. */
    public getCostoMantenimiento():number{
        return this.costoMantenimiento;
    }

    /** @param cMantenimiento Nuevo costo del mantenimiento. */
    public setCostoMantenimiento(cMantenimiento:number):void{
        this.costoMantenimiento=cMantenimiento;
    }

    /** @returns Fecha en que se realizó el mantenimiento. */
    public getFecha(): Date{
        return this.fecha;
    }

    /** @param fecha Nueva fecha del mantenimiento. */
    public setFecha(fecha:Date):void{
        this.fecha=fecha;
    }
    
    /**
    * Muestra los detalles del mantenimiento realizado.
    * @returns {string} Texto descriptivo con la fecha y costo del mantenimiento.
    */
    public mostrarDetalle(): string {
        return `Mantenimiento realizado el ${this.fecha} con costo $${this.costoMantenimiento}`;
    }

}