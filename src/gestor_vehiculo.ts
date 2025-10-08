import ABM from "./abm";
import Vehiculo from "./vehiculo"

export class GestorVehiculo implements ABM{

    agregar<Vehiculo>(vehiculo: Vehiculo, vehiculos: Array<Vehiculo>): void{
        //preguntar a Ale porque cuando trabajo con un Generics, cuando quiero implementar
        // la interfaz AMB en la clase Vehiculo( que es abstracta) no me permite recorrer los elementos
        //para compararlos por matricula con un getMatricula() ?
       let existe= vehiculos.some(v => v.getMatricula() === vehiculo.getMatricula());
       if(existe){
        throw new Error("Ya existe un vehiculo con esa matricula");
       }
       vehiculos.push(vehiculo);

    }


    eliminar<Vehiculo>(vehiculo: Vehiculo, vehiculos: Array<Vehiculo>): void{

    }

}