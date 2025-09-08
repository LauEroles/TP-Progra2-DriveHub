export default class Compacto extends Vehiculo {
    
    constructor() {
        super();
        this.tarifaBase = 30;
        this.cargoVariable = 0.15;
        this.kmMax = 100;
    }

    calcularTarifa(): number {
        //ajustar segun arreglos kilometraje?
        let total: number = this.tarifaBase;
        let kmsRecorridos: number = this.kmFinal - this.kmInicial;
        if (kmsRecorridos > this.kmMax) {
            let excedente: number = kmsRecorridos - this.kmMax;
            total += excedente * this.cargoVariable;
        } 
        return total;
    }
}