
import Suv from "../../src/vehiculos/suv"
import Vehiculo from "../../src/vehiculos/vehiculo"
import sedan from "../../src/vehiculos/sedan"
import compacto from "../../src/vehiculos/compacto"
import MantenimientoVehiculo from "../../src/mantenimientoVehiculo"
import { Estado } from "../../src/estados/estado"
import { EnAlquiler } from "../../src/estados/enAlquiler"
import { EnMantenimiento } from "../../src/estados/enMantenimiento";
import { NecesitaLimpieza } from "../../src/estados/necesitaLimpieza";
import { Disponible } from "../../src/estados/disponible";
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

    it("Deberia obtener el estado actual", ()=> {
        const estadoActual= vehiculo.getEstado();
        expect(vehiculo.getEstado()).toBe(estadoMock);
    });

    it("Deberia cambiar el estado del vehiculo", ()=> {
        const nuevoEstado= new EnAlquiler();
        vehiculo.setEstado(nuevoEstado);
        expect(vehiculo.getEstado()).toBe(nuevoEstado);
});

describe("agregar mantenimiento al vehiculo correctamente", ()=> {
    it("Deberia agregar el mantenimiento al vehiculo", ()=> {
        vehiculo.agregarMantenimientoVehiculo(mantenimiento);
        expect(vehiculo.getCostoTotalMantenimiento()).toBe(120000);
    });
        
});

describe("Obtener costo total de mantenimiento", ()=> {
    it("Deberia devolver 0 cuando no hay mantenimientos", ()=> {
        expect(vehiculo.getCostoTotalMantenimiento()).toBe(0);
    });


    it("Deberia obtener el costo total de mantenimiento", ()=> {
        vehiculo.agregarMantenimientoVehiculo(mantenimiento);
        expect(vehiculo.getCostoTotalMantenimiento()).toBe(120000);
    });


    it("Deberia sumar el costo de multiples mantenimientos", ()=> {
        const mantenimiento2 = mockDeep<MantenimientoVehiculo>();
        mantenimiento2.getCostoMantenimiento.mockReturnValue(80000);
        
        vehiculo.agregarMantenimientoVehiculo(mantenimiento);
        vehiculo.agregarMantenimientoVehiculo(mantenimiento2);
        
        expect(vehiculo.getCostoTotalMantenimiento()).toBe(200000); // 120000 + 80000
    });
});

describe("Resetear kilometraje", ()=> {
    it("Deberia resetear el kilometraje", ()=> {
        vehiculo.resetearKm();
        expect(vehiculo.getKm()).toBe(0);
    });
});

describe("Requiere mantenimiento", ()=> {
    it("Deberia devolver true si el vehiculo supera los 10000km mantenimiento", ()=> {
        vehiculo.setKm(11000);
        expect(vehiculo.requiereMantenimiento()).toBe(true);
    });

    it("Deberia retornar true despues de las 5  devoluciones sin mantenimiento", ()=> {
        for (let i = 0; i < 5; i++) {
            vehiculo.devolver();
        }
        vehiculo.setKm(10000);
        expect(vehiculo.requiereMantenimiento()).toBe(true);
    });

    it("Deberia devolver true si el vehiculo supera 180 dias desde el ultimo mantenimiento", ()=> {
        const fechaAntigua=new Date();
        fechaAntigua.setDate(fechaAntigua.getDate() - 181);

        const mantenimiento=mockDeep<MantenimientoVehiculo>();
        mantenimiento.getFecha.mockReturnValue(fechaAntigua);
        vehiculo.agregarMantenimientoVehiculo(mantenimiento);

        expect(vehiculo.requiereMantenimiento()).toBe(true);
    });

});


});