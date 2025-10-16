
import Suv from "../src/suv"
import sedan from "../src/sedan"
import compacto from "../src/compacto"
import Reserva from "../src/reserva"
import MantenimientoVehiculo from "../src/mantenimientoVehiculo"


describe("Test de la clase Suv", () => {

    let instance: Suv;
    let mockReserva: jest.Mocked<Partial<Reserva>>;
    let mantenimientoVehiculo:MantenimientoVehiculo;

    beforeEach (()=>{
        instance= new Suv(200,"LM234");
        //esto esta cochino asi, esta generando acople lo see, tengo que refactorizar luego
        mantenimientoVehiculo= new MantenimientoVehiculo(12000,new Date('2025-10-15'));

        mockReserva={
            getKmFinal: jest.fn().mockReturnValue(800),
            getVehiculo: jest.fn().mockReturnValue(instance),
            getFechaInicio: jest.fn().mockeReturnValue(new Date('2025-10-16')),
            getFechaFin: jest.fn().mockeReturnValue(new Date ('2025-10-17'))
        }as jest.Mocked<Partial<Reserva>>;


    });

    afterEach (()=>{});

    it("Verifica el metodo calcularTarifa"),() =>{

        const testMantenimiento=instance.agregarManteniminentoVehiculo(mantenimientoVehiculo);

    }

});