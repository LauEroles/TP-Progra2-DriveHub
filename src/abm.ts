export default interface ABM {
    /**
    * Agrega un ítem a una lista.
    * @template T Tipo del ítem y de los elementos de la lista.
    * @param {T} item Ítem a agregar.
    * @param {Array<T>} lista Lista donde se agregará el ítem.
    */
    agregar<T>(item: T, lista: Array<T>): void;
    /**
    * Elimina un ítem de una lista.
    * @template T Tipo del ítem y de los elementos de la lista.
    * @param {T} item Ítem a eliminar.
    * @param {Array<T>} lista Lista de donde se eliminará el ítem.
    */
    eliminar<T>(item: T, lista: Array<T>): void;
}