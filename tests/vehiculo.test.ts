
import Suv from "../src/suv"
import Vehiculo from "../src/vehiculo"
import sedan from "../src/sedan"
import compacto from "../src/compacto"
import MantenimientoVehiculo from "../src/mantenimientoVehiculo"
import { Estado } from "../src/estado"
import { mockDeep, MockProxy} from 'jest-mock-extended'


describe("Test de la clase Vehiculo", () => {

	let vehiculo: Vehiculo;
    let mantenimiento: MockProxy<MantenimientoVehiculo>;

    beforeEach (()=>{
        vehiculo= new Suv(200,"LM234");

        mantenimiento= mockDeep<MantenimientoVehiculo>();

        mantenimiento.getCostoMantenimiento.mockReturnValue(120000);
        mantenimiento.getFecha.mockReturnValue(new Date('2025-10-16'));

    });

    afterEach (()=>{
        jest.clearAllMocks();
    });
    
    it("Deberia obtener y estabelcer una matricula", () => {
        //expect(vehiculo.getMatricula()).toBe("LM234");
        
        vehiculo.setMatricula("DEF456");
        expect(vehiculo.getMatricula()).toBe("DEF456");
        
    });

    it("Deberia obtener y establecer kilometraje", ()=> {
        //expect(vehiculo.getKm()).toBe(200);

        vehiculo.setKm(350);
        expect(vehiculo.getKm()).toBe(350);

    });


    it("Deberia obtener y establecer tarifa base", ()=>{
        //expect(vehiculo.getTarifaBase()).toBe(0);

        vehiculo.setTarifaBase(80);
        expect(vehiculo.getTarifaBase()).toBe(80);
    });


    it("Deberia obtener y establecer cargo variable", ()=> {
        //expect(vehiculo.getCargoVariable()).toBe(0);

        vehiculo.setCargoVariable(150);
        expect(vehiculo.getCargoVariable()).toBe(150);

    });

    it("Deberia obtener y establecer cargo fijo", () => {
        //expect(vehiculo.getCargoFijo()).toBe(0);

        vehiculo.setCargoFijo(15);
        expect(vehiculo.getCargoFijo()).toBe(15);

    });

    it("Deberia inicializarse con estado DISPONIBLE", ()=> {
        expect(vehiculo.getEstado()).toBe(Estado.DISPONIBLE);

    });

    it("Deberia obtener y establecer el estado", () => {
        vehiculo.setEstado(Estado.EN_ALQUILER);
        expect(vehiculo.getEstado()).toBe(Estado.EN_ALQUILER);

    });



    it("Verifica el metodo agregar mantenimiento vehiculo de la clase Vehiculo", () => {

        vehiculo.agregarManteniminentoVehiculo(mantenimiento);

        expect(vehiculo['mantenimientos']).toHaveLength(1);
        expect(vehiculo['mantenimientos'][0]).toBe(mantenimiento);

    });

});