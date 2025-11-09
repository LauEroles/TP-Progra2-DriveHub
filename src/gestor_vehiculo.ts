import ABM from "./abm";
import Vehiculo from "./vehiculo"
import { Estado } from "./estados/estado"
import Reserva from "./reserva"
import GestorReserva from "./gestor_reserva"

export default class GestorVehiculo implements ABM{



    private buscarVehiculo(vehiculo:Vehiculo, vehiculos: Array<Vehiculo>): Vehiculo | undefined {
        const vehiculoBuscado: Vehiculo | undefined = vehiculos.find(v => v.getMatricula() === vehiculo.getMatricula());
        return vehiculoBuscado;
    }


    public agregar<T>(item: T, lista: Array<T>): void{
        const vehiculoEncontrado= this.buscarVehiculo(item as Vehiculo, lista as Array<Vehiculo>);
       
        if(vehiculoEncontrado){
            throw new Error("El vehiculo que quiere agregar ya existe en el sistema");
        
        }else{
            lista.push(item);
        }
    }


    public eliminar<T>(item: T, lista: Array<T>): void{
        const vehiculoAEliminar= this.buscarVehiculo(item as Vehiculo, lista as Array<Vehiculo>);

        if(!vehiculoAEliminar){
            throw new Error("No puede eliminar un vehiculo que no se encuentra en la lista de vehiculos de la empresa");
    
        }else{
            const vehiculoItem=item as Vehiculo;
            const indice=(lista as Array<Vehiculo>).findIndex(v => v.getMatricula()=== vehiculoItem.getMatricula());
            if(indice>-1){
                lista.splice(indice,1);
            }
        }
        

    }

   
}