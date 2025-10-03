export default class MantenimientoVehiculo{
   private costoMantenimiento: number;
   private fecha: Date;

  constructor(costoMantenimiento: number, fecha: Date) {
    if (costoMantenimiento <= 0) {
    throw new Error("El costo de mantenimiento debe ser mayor a 0");
    }
    this.costoMantenimiento = costoMantenimiento;
    this.fecha = fecha;
}

public getCostoMantenimiento():number{
    return this.costoMantenimiento;
}

public setCostoMantenimiento(cMantenimiento:number):void{
    this.costoMantenimiento=cMantenimiento;
}

public getFecha(): Date{
    return this.fecha;
}

public setFecha(fecha:Date):void{
    this.fecha=fecha;
}
// si hace falta mostrar el manteniemiento realizado
public mostrarDetalle(): string {
    return `Mantenimiento realizado el ${this.fecha} con costo $${this.costoMantenimiento}`;
  }
}

