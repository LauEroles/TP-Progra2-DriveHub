import { Disponible } from "../../src/estados/disponible";
import Vehiculo from "../../src/vehiculo";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { EnAlquiler } from "../../src/estados/enAlquiler";
import { EnMantenimiento } from "../../src/estados/enMantenimiento";
import { NecesitaLimpieza } from "../../src/estados/necesitaLimpieza";
import { Estado } from "../../src/estados/estado";

describe("Test de estados disponibles con Vehiculo mockeado", () => {

    let estado:Disponible;
    let vehiculoMock:MockProxy<Vehiculo>;

    beforeEach (()=>{
        estado= new Disponible();
        vehiculoMock= mockDeep<Vehiculo>();
    });

    afterEach (()=>{
        jest.clearAllMocks();
    });

    it("Deberia cambiar de Disponible a EnAlquiler al alquilar", () => {
        estado.alquilar(vehiculoMock);
        expect(vehiculoMock.setEstado).toHaveBeenCalledWith(expect.any(EnAlquiler));
    });

    it("Deberia cambiar de Disponible a EnMantenimiento al enviar a mantenimiento", () => {
        estado.enviarMantenimiento(vehiculoMock);
        expect(vehiculoMock.setEstado).toHaveBeenCalledWith(expect.any(EnMantenimiento));
    });

    it("Deberia cambiar de Disponible a NecesitaLimpieza al limpiar", () => {
        estado.limpiar(vehiculoMock);
        expect(vehiculoMock.setEstado).toHaveBeenCalledWith(expect.any(NecesitaLimpieza));
    });

    it("Deberia lanzar error al devolver un vehiculo disponible", () => {
        expect(() => {
            estado.devolver(vehiculoMock);
        }).toThrow("El vehiculo ya se encuentra disponible");
    });
    
    it("Deberia lanzar error al finalizar mantenimiento de un vehiculo disponible", () => {
        expect(() => {
            estado.finalizarMantenimiento(vehiculoMock);
        }).toThrow("El vehiculo no se encuentra en mantenimiento");
    });
    

});