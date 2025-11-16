import { Disponible } from "../../src/estados/disponible";
import Vehiculo from "../../src/vehiculos/vehiculo";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { Estado } from "../../src/estados/estado";
import { EnAlquiler } from "../../src/estados/enAlquiler";
import { EnMantenimiento } from "../../src/estados/enMantenimiento";
import { NecesitaLimpieza } from "../../src/estados/necesitaLimpieza";


describe ("Test de Estado Disponible con mock de Vehiculo", ()=>{
  
    let estado:Disponible;
    let vehiculoMock:MockProxy<Vehiculo>;



    beforeEach(()=>{
        estado=new Disponible();
        vehiculoMock= mockDeep <Vehiculo>();
    })

    afterEach(()=>{
        jest.clearAllMocks();   
    })

    it("Debe cambiar de Disponible a EnAlquiler al momento de alquilar",()=>{
        estado.alquilar(vehiculoMock);
        expect(vehiculoMock.setEstado).toHaveBeenCalledWith(expect.any(EnAlquiler));
        expect(vehiculoMock.setEstado).toHaveBeenCalledTimes(1);
    })

    it("Debe cambiar de Disponible a EnMantenimiento al momento de enviar a mantenimiento",()=>{
        estado.enviarMantenimiento(vehiculoMock);
        expect(vehiculoMock.setEstado).toHaveBeenCalledWith(expect.any(EnMantenimiento));
        expect(vehiculoMock.setEstado).toHaveBeenCalledTimes(1);

    })

    it("Debe cambiar de Disponible a NecesitaLimpieza al momento de limpiar",()=>{
        estado.limpiar(vehiculoMock);
        expect(vehiculoMock.setEstado).toHaveBeenCalledWith(expect.any(NecesitaLimpieza));
        expect(vehiculoMock.setEstado).toHaveBeenCalledTimes(1);

    })

    it("Debe lanzar error al devolver un vehiculo disponible",()=>{
        expect(() => estado.devolver(vehiculoMock)).toThrow("El vehiculo ya se encuentra disponible");
        expect(vehiculoMock.setEstado).not.toHaveBeenCalled();
    })

    it("Debe devolver false al preguntar si el vehiculo esta en alquiler",()=>{
        expect(estado.estaEnAlquiler()).toBe(false);
    })

})