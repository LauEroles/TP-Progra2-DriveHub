
import Suv from "../src/suv"
import sedan from "../src/sedan"
import compacto from "../src/compacto"
import Reserva from "../src/reserva"
import MantenimientoVehiculo from "../src/mantenimientoVehiculo"
import Cliente from "../src/cliente"
import {mockDeep, MockProxy} from "jest-mock-extended"

describe("Test de la clase Suv", () => {

    let instance: Suv;
    let mockReserva: MockProxy<Reserva>;
    let mockCliente: MockProxy<Cliente>;
    let mantenimientoVehiculo:MantenimientoVehiculo;

    beforeEach (()=>{
        instance= new Suv(200,"LM234");
        mantenimientoVehiculo= new MantenimientoVehiculo(12000,new Date('2025-10-15'));

        mockReserva = mockDeep <Reserva>();
        mockCliente = mockDeep <Cliente>();
        
        mockReserva.getKmFinal.mockReturnValue(800);
        mockReserva.getVehiculo.mockReturnValue(instance);
        mockReserva.getFechaInicio.mockReturnValue(new Date('2025-10-26'));
        mockReserva.getFechaFin.mockReturnValue(new Date('2025-10-17'));
        mockReserva.getCliente.mockReturnValue(mockCliente);

    });

    afterEach (()=>{
        jest.clearAllMocks();
    });

    it("Verifica el metodo calcularTarifa con mas de 500km",() =>{
      
        instance.setTarifaBase(80);
        instance.setCargoFijo(15);
      
        const tarifa= instance.calcularTarifa(mockReserva);

        expect(mockReserva.getKmFinal).toHaveBeenCalled();
        expect(tarifa).toBeGreaterThan(0);
    });

    it("Verifica el método calcularTarifa con menos de 500km", () =>{
        instance.setTarifaBase(80);
        instance.setCargoFijo(15);

        mockReserva.getKmFinal.mockReturnValue(600);

        const tarifa = instance.calcularTarifa(mockReserva);
        expect(tarifa).toBeGreaterThan(0);
    });

});