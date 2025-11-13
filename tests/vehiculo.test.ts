
import Suv from "../src/suv"
import Vehiculo from "../src/vehiculo"
import sedan from "../src/sedan"
import compacto from "../src/compacto"
import MantenimientoVehiculo from "../src/mantenimientoVehiculo"
import { Estado } from "../src/estados/estado"
import { EnAlquiler } from "../src/estados/enAlquiler"
import { EnMantenimiento } from "../src/estados/enMantenimiento"
import { NecesitaLimpieza } from "../src/estados/necesitaLimpieza"
import { Disponible } from "../src/estados/disponible"
import { mockDeep, MockProxy} from 'jest-mock-extended'


describe("Test de la clase Vehiculo", () => {
    let estado: Estado;
	let vehiculo: Vehiculo;
    let mantenimiento: MockProxy<MantenimientoVehiculo>;

    beforeEach (()=>{
        estado= new Disponible();
        vehiculo= new Suv(200,"LM234", estado);

        mantenimiento= mockDeep<MantenimientoVehiculo>();

        mantenimiento.getCostoMantenimiento.mockReturnValue(120000);
        mantenimiento.getFecha.mockReturnValue(new Date('2025-10-16'));

    });

    afterEach (()=>{
        jest.clearAllMocks();
    });
    
    it("Deberia obtener y estabelcer una matricula", () => {
        vehiculo.setMatricula("DEF456");
        expect(vehiculo.getMatricula()).toBe("DEF456");
    });

    it("Deberia obtener y establecer kilometraje", ()=> {
        vehiculo.setKm(350);
        expect(vehiculo.getKm()).toBe(350);
    });


    it("Deberia obtener y establecer tarifa base", ()=>{
        vehiculo.setTarifaBase(80);
        expect(vehiculo.getTarifaBase()).toBe(80);
    });


    it("Deberia obtener y establecer cargo variable", ()=> {
        vehiculo.setCargoVariable(150);
        expect(vehiculo.getCargoVariable()).toBe(150);
    });

    it("Deberia obtener y establecer cargo fijo", () => {
        vehiculo.setCargoFijo(15);
        expect(vehiculo.getCargoFijo()).toBe(15);
    });

    it("Deberia cambiar EnAlquiler al alquilar", ()=> {
        estado.alquilar(vehiculo);
        expect(vehiculo.getEstado()).toBeInstanceOf(EnAlquiler);
    });

    it("Deberia cambiar EnMantenimiento al enviar a Mantenimiento", () => {
        vehiculo.enviarMantenimiento(vehiculo);
        expect(vehiculo.getEstado()).toBeInstanceOf(EnMantenimiento);
    });

    it("Verifica el metodo agregar mantenimiento vehiculo de la clase Vehiculo", () => {
        vehiculo.agregarMantenimientoVehiculo(mantenimiento);

        expect(vehiculo['mantenimientos']).toHaveLength(1);
        expect(vehiculo['mantenimientos'][0]).toBe(mantenimiento);
    });

});