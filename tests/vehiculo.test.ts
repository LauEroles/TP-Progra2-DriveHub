
import Suv from "../src/suv"
import sedan from "../src/sedan"
import compacto from "../src/compacto"
import MantenimientoVehiculo from "../src/mantenimientoVehiculo"


describe("Test de la clase Vehiculo", () => {

	let instance: Suv;
    let mantenimiento: MantenimientoVehiculo;

    beforeEach (()=>{
        instance= new Suv(200,"LM234");
        //esto esta cochino asi, esta generando acople lo see, tengo que refactorizar luego
        mantenimiento= new MantenimientoVehiculo(120000, new Date('2025-10-16'));

    });

    afterEach (()=>{});

    it("Verifica el metodo agregar mantenimiento vehiculo de la clas Vehiculo"),() =>{

        const testMantenimiento=instance.agregarManteniminentoVehiculo(mantenimiento);

    }

});