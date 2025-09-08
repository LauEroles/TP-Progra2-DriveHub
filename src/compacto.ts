export default class Compacto extends Vehiculo {
    
    constructor() {
        super();
        this.tarifaBase = 30;
        this.cargoVariable = 0.15;
        this.km = 100;
    }

    calcularTarifa(): number {
        //ajustar segun arreglos kilometraje?
        let total: number = this.tarifaBase;
        let kms: number = this.kilometraje.kmFinal - this.kilometraje.kmInicial;
        if (kms > this.km) {
            for (let i = 0; i < kms; i++) {
                total += this.cargoVariable;
            }
        } 
        return total;
    }
}