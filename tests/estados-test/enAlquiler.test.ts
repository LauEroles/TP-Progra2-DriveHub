import { Disponible } from "../../src/estados/disponible";
import Vehiculo from "../../src/vehiculo";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { Estado } from "../../src/estados/estado";
import { EnAlquiler } from "../../src/estados/enAlquiler";
import { EnMantenimiento } from "../../src/estados/enMantenimiento";
import { NecesitaLimpieza } from "../../src/estados/necesitaLimpieza";



describe("Test de Estado EnAlquiler con mock de Vehiculo", ()=>{

    let estado:Estado;
    let vehiculoMock:MockProxy<Vehiculo>;

    beforeEach(()=>{
        estado=new EnAlquiler();
        vehiculoMock=mockDeep <Vehiculo>();
    })

    afterEach(()=>{
        jest.clearAllMocks();
    })

    it("Debe cambiar de EnAlquiler a NecesitaLimpieza al momento de devolver el vehiculo",()=>{
        estado.devolver(vehiculoMock);
        expect(vehiculoMock.setEstado).toHaveBeenCalledWith(expect.any(NecesitaLimpieza));
        expect(vehiculoMock.setEstado).toHaveBeenCalledTimes(1);
    })

    it("Debe lanzar error al intentar alquilar un vehiculo que ya esta en alquiler", ()=>{
        expect(() => estado.alquilar(vehiculoMock)).toThrow("El vehiculo ya se encuentra en alquiler");
        expect(vehiculoMock.setEstado).not.toHaveBeenCalled();
    })

    it("Debe lanzar error al intentar enviar a mantenimiento un vehiculo que esta en alquiler", ()=>{
        expect(() => estado.enviarMantenimiento(vehiculoMock)).toThrow("No se puede enviar a mantenimiento: el vehículo está en uso");
        expect(vehiculoMock.setEstado).not.toHaveBeenCalled();
    })

    it("Debe lanzar un error al intentar finlizar un mantenimiento en un vehiculo que esta en alquiler", ()=>{
        expect(() => estado.finalizarMantenimiento(vehiculoMock)).toThrow("El vehiculo no se encuentra en mantenimiento");
        expect(vehiculoMock.setEstado).not.toHaveBeenCalled();
    })

    it("Debe lanzar un error al intentar limpiar un vehiculo que esta en alquiler", ()=>{
        expect(() => estado.limpiar(vehiculoMock)).toThrow("No se puede limpiar: el vehículo está en uso");
        expect(vehiculoMock.setEstado).not.toHaveBeenCalled();
    })
    it("Debe devolver true al preguntar si el vehiculo esta en alquiler",()=>{
        expect(estado.estaEnAlquiler()).toBe(true);
    })

});