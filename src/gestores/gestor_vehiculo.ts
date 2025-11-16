import ABM from "../abm";
import Vehiculo from "../../src/vehiculos/vehiculo";
import { Estado } from "../estados/estado"
import Reserva from "../reserva"
import GestorReserva from "../gestores/gestor_reserva"

/**
* Gestor de vehículos que implementa operaciones de ABM.
* Permite agregar y eliminar vehículos de una lista, verificando duplicados
* y asegurando la consistencia del sistema.
*/
export default class GestorVehiculo implements ABM {

    /**
    * Busca un vehículo en una lista según su matrícula.
    * @param {Vehiculo} vehiculo Vehículo a buscar.
    * @param {Array<Vehiculo>} vehiculos Lista de vehículos donde buscar.
    * @returns {Vehiculo | undefined} El vehículo encontrado, o undefined si no existe.
    * @private
    */
    private buscarVehiculo(vehiculo: Vehiculo, vehiculos: Array<Vehiculo>): Vehiculo | undefined {
        const vehiculoBuscado: Vehiculo | undefined = vehiculos.find(v => v.getMatricula() === vehiculo.getMatricula());
        return vehiculoBuscado;
    }

    /**
    * Agrega un vehículo a la lista, verificando que no exista previamente.
    * @template T Tipo del ítem a agregar (debe ser Vehiculo).
    * @param {T} item Vehículo a agregar.
    * @param {Array<T>} lista Lista de vehículos donde se agregará.
    * @throws {Error} Si el vehículo ya existe en la lista.
    */
    public agregar<T>(item: T, lista: Array<T>): void {
        const vehiculoEncontrado = this.buscarVehiculo(item as Vehiculo, lista as Array<Vehiculo>);
        if (vehiculoEncontrado) {
            throw new Error("El vehiculo que quiere agregar ya existe en el sistema");
        } else {
            lista.push(item);
        }
    }

    /**
    * Elimina un vehículo de la lista, verificando que exista.
    * @template T Tipo del ítem a eliminar (debe ser Vehiculo).
    * @param {T} item Vehículo a eliminar.
    * @param {Array<T>} lista Lista de vehículos de donde se eliminará.
    * @throws {Error} Si el vehículo no se encuentra en la lista.
    */
    public eliminar<T>(item: T, lista: Array<T>): void {
        const vehiculoAEliminar = this.buscarVehiculo(item as Vehiculo, lista as Array<Vehiculo>);
        if (!vehiculoAEliminar) {
            throw new Error("No puede eliminar un vehiculo que no se encuentra en la lista de vehiculos de la empresa");
        } else {
            const vehiculoItem = item as Vehiculo;
            const indice = (lista as Array<Vehiculo>).findIndex(v => v.getMatricula() === vehiculoItem.getMatricula());
            if (indice>-1) {
                lista.splice(indice, 1);
            }
        }
    }
   
}