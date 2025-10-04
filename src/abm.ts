export default interface ABM {
    agregar<T>(item: T, lista: Array<T>): void;
    eliminar<T>(item: T, lista: Array<T>): void;
}