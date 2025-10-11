import ABM from "./abm";
import Vehiculo from "./vehiculo"
import { Estado } from "./estado"
import Reserva from "./reserva"
import GestorReserva from "./gestor_reserva"

export class GestorVehiculo implements ABM{



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

    public cambiarEstado(v:Vehiculo, nuevoEstado: Estado, vehiculos: Array<Vehiculo>,gestorReserva:GestorReserva, reserva:Reserva, reservas:Array<Reserva> ):void{

        const vehiculoEncontrado=this.buscarVehiculo(v,vehiculos);

        if(!vehiculoEncontrado){
            throw new Error("No puede cambiar el estado a un vehiculo que no existe en su lista de vehiculos");
        }

        const estadoVehiculoActual=vehiculoEncontrado.getEstado();


        if(nuevoEstado === Estado.EN_ALQUILER){
            if(estadoVehiculoActual === Estado.DISPONIBLE && gestorReserva.hayDisponibilidad(reserva,reservas)===true){
                vehiculoEncontrado.setEstado(nuevoEstado);
            }
        }

       if(nuevoEstado === Estado.DISPONIBLE){
            const fechaActual=new Date();


            const reservaActiva=reservas.find(r => r.getVehiculo().getMatricula() === vehiculoEncontrado.getMatricula());

            if(estadoVehiculoActual === Estado.EN_ALQUILER && reservaActiva && fechaActual >=reserva.getFechaFin()){
                vehiculoEncontrado.setEstado(nuevoEstado);

            }else if(estadoVehiculoActual === Estado.EN_ALQUILER && fechaActual < reserva.getFechaFin()){
       
                throw new Error("No se puede cambiar a DISPONIBLE porque la fecha de alquiler aún no ha finalizado");
    
            }
        }

            if ((nuevoEstado === Estado.EN_MANTENIMIENTO || nuevoEstado === Estado.NECESITA_LIMPIEZA) && estadoVehiculoActual === Estado.DISPONIBLE) {
                vehiculoEncontrado.setEstado(nuevoEstado);

            }

    }

   
}