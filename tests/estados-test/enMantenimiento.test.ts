import { Disponible } from "../../src/estados/disponible";
import Vehiculo from "../../src/vehiculo";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { Estado } from "../../src/estados/estado";
import { EnAlquiler } from "../../src/estados/enAlquiler";
import { EnMantenimiento } from "../../src/estados/enMantenimiento";
import { NecesitaLimpieza } from "../../src/estados/necesitaLimpieza";


describe("Test de Estado EnMantenimiento con mock de Vehiculo", ()=>{

    let estado:Estado;
    let vehiculoMock:MockProxy<Vehiculo>;

    beforeEach(()=>{
        estado=new EnMantenimiento();
        vehiculoMock=mockDeep <Vehiculo>();
    })

    afterEach(()=>{
        jest.clearAllMocks();
    })

    it("Debe cambiar de EnMantenimiento a Disponible al finalizar el mantenimiento",()=>{
        estado.finalizarMantenimiento(vehiculoMock);
        expect(vehiculoMock.setEstado).toHaveBeenCalledWith(expect.any(Disponible));
        expect(vehiculoMock.setEstado).toHaveBeenCalledTimes(1);
    })

    it("Debe lanzar error al intentar alquilar un vehiculo que esta en mantenimiento", ()=>{
        expect(() => estado.alquilar(vehiculoMock)).toThrow("No se puede alquilar: el vehículo está en mantenimiento");
        expect(vehiculoMock.setEstado).not.toHaveBeenCalled();
    })

    it("Debe lanzar error al intentar enviar a mantenimiento un vehiculo que ya esta en mantenimiento", ()=>{
        expect(() => estado.enviarMantenimiento(vehiculoMock)).toThrow("El vehículo ya está en mantenimiento");
        expect(vehiculoMock.setEstado).not.toHaveBeenCalled();
    })

    it("Debe lanzar un error al intentar devolver un vehiculo que esta en mantenimiento", ()=>{
        expect(() => estado.devolver(vehiculoMock)).toThrow("No se puede devolver: el vehículo no está alquilado");
        expect(vehiculoMock.setEstado).not.toHaveBeenCalled();
    })

    it("Debe lanzar un error al intentar limpiar un vehiculo que esta en mantenimiento", ()=>{
        expect(() => estado.limpiar(vehiculoMock)).toThrow("No se puede limpiar: el vehiculo está en mantenimiento");
        expect(vehiculoMock.setEstado).not.toHaveBeenCalled();
    })  
});