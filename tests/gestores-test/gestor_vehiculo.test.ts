import { mockDeep, MockProxy} from 'jest-mock-extended'
import GestorVehiculo from '../../src/gestores/gestor_vehiculo';
import GestorReserva from "../../src/gestores/gestor_reserva"
import Vehiculo from "../../src/vehiculos/vehiculo"

describe("Test clase gestor_vehiculo", () => {
    let gestorVehiculo: GestorVehiculo;
    let mockVehiculo: MockProxy<Vehiculo>;

    beforeEach(()=>{
        gestorVehiculo= new GestorVehiculo()
        mockVehiculo= mockDeep<Vehiculo>();
        
    });


    afterEach(()=>{
        jest.clearAllMocks();
    });

    it("Verifica el metodo buscarVehiculo", ()=>{
        const listaVehiculos: Array<Vehiculo>=[mockVehiculo];
        mockVehiculo.getMatricula.mockReturnValue("ABC123");
        const vehiculoEncontrado= (gestorVehiculo as any).buscarVehiculo(mockVehiculo, listaVehiculos);

        expect(vehiculoEncontrado).toBe(mockVehiculo);
    });

    it("Verifica el método agregar", ()=>{
        const listaVehiculos: Array<Vehiculo>=[];
        gestorVehiculo.agregar<Vehiculo>(mockVehiculo, listaVehiculos);

        expect(listaVehiculos).toHaveLength(1);
        expect(listaVehiculos[0]).toBe(mockVehiculo);
    });

    it("Debe lanzar error al intentar agregar un vehículo que ya existe", ()=>{
        const listaVehiculos: Array<Vehiculo>=[];
        mockVehiculo.getMatricula.mockReturnValue("ABC123");
        
        gestorVehiculo.agregar<Vehiculo>(mockVehiculo, listaVehiculos);
        
        expect(() => {
            gestorVehiculo.agregar<Vehiculo>(mockVehiculo, listaVehiculos);
        }).toThrow("El vehiculo que quiere agregar ya existe en el sistema");
        
        expect(listaVehiculos).toHaveLength(1);
    });


    it("Verifica el método eliminar", ()=>{
        const listaVehiculos: Array<Vehiculo>=[mockVehiculo];
        gestorVehiculo.eliminar<Vehiculo>(mockVehiculo, listaVehiculos);

        expect(listaVehiculos).toHaveLength(0);
    });

    it("Debe lanzar error al intentar eliminar un vehículo que no existe", ()=>{
        const listaVehiculos: Array<Vehiculo>=[];
        mockVehiculo.getMatricula.mockReturnValue("XYZ999");
        
        expect(() => {
            gestorVehiculo.eliminar<Vehiculo>(mockVehiculo, listaVehiculos);
        }).toThrow("No puede eliminar un vehiculo que no se encuentra en la lista de vehiculos de la empresa");
        
        expect(listaVehiculos).toHaveLength(0);
    });


});