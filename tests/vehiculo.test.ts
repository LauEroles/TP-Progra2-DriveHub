
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
	let vehiculo: Vehiculo;
    let mantenimiento: MockProxy<MantenimientoVehiculo>;
    let estadoMock:MockProxy<Estado>;

    beforeEach (()=>{
        estadoMock= mockDeep<Estado>();
        const estado=new Disponible();
        vehiculo= new Suv(200,"LM234", estado);
        vehiculo.setEstado(estadoMock);


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



    it("Deberia delegar alquilar() al estado", ()=> {
        vehiculo.alquilar();
        expect(estadoMock.alquilar).toHaveBeenCalledWith(vehiculo);
        expect(estadoMock.alquilar).toHaveBeenCalledTimes(1);
    });

    it("Deberia delegar devolver() al estado", ()=> {
        vehiculo.devolver();
        expect(estadoMock.devolver).toHaveBeenCalledWith(vehiculo);
        expect(estadoMock.devolver).toHaveBeenCalledTimes(1);
    });

    it("Deberia delegar enviarAMantenimiento() al estado", ()=> {
        vehiculo.enviarMantenimiento();
        expect(estadoMock.enviarMantenimiento).toHaveBeenCalledWith(vehiculo);
        expect(estadoMock.enviarMantenimiento).toHaveBeenCalledTimes(1);
    });
    
    it("Deberia delegar finalizarMantenimiento() al estado", ()=> {
        vehiculo.finalizarMantenimiento();
        expect(estadoMock.finalizarMantenimiento).toHaveBeenCalledWith(vehiculo);
        expect(estadoMock.finalizarMantenimiento).toHaveBeenCalledTimes(1);
    }); 

    it("Deberia delegar limpiar() al estado", ()=> {
        vehiculo.limpiar();
        expect(estadoMock.limpiar).toHaveBeenCalledWith(vehiculo);
        expect(estadoMock.limpiar).toHaveBeenCalledTimes(1);
    });

});