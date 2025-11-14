import { Disponible } from "../../src/estados/disponible";
import Vehiculo from "../../src/vehiculo";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { Estado } from "../../src/estados/estado";
import { EnAlquiler } from "../../src/estados/enAlquiler";
import { EnMantenimiento } from "../../src/estados/enMantenimiento";
import { NecesitaLimpieza } from "../../src/estados/necesitaLimpieza";


describe("Test de Estado NecesitaLimpieza con mock de Vehiculo", ()=>{

    let estado:Estado;
    let vehiculoMock:MockProxy<Vehiculo>;

    beforeEach(()=>{
        estado=new NecesitaLimpieza();
        vehiculoMock=mockDeep <Vehiculo>();
    })

    afterEach(()=>{
        jest.clearAllMocks();
    })

    it("Debe lanzar error al momento de alquilar un vehiculo que necesita limpieza",()=>{
        expect(() => estado.alquilar(vehiculoMock)).toThrow("No se puede alquilar: el vehículo necesita limpieza");
        expect(vehiculoMock.setEstado).not.toHaveBeenCalled();
    })

    it("Debe lanzar error al intentar enviar a mantenimiento a un vehiculo que necesita limpieza",()=>{
        expect(() => estado.enviarMantenimiento(vehiculoMock)).toThrow("El vehiculo necesita limpieza");
        expect(vehiculoMock.setEstado).not.toHaveBeenCalled();
    })
    
    it("Debe cambiar de NecesitaLimpieza a Disponible al momento de limpiar",()=>{
        estado.limpiar(vehiculoMock);
        expect(vehiculoMock.setEstado).toHaveBeenCalledWith(expect.any(Disponible));
        expect(vehiculoMock.setEstado).toHaveBeenCalledTimes(1);
    })
    

});