import { mockDeep, MockProxy} from 'jest-mock-extended'
import GestorVehiculo from "../src/gestor_vehiculo"
import GestorReserva from "../src/gestor_reserva"
import Vehiculo from "../src/vehiculo"


describe("Test clase gestor_vehiculo", () => {
    let gestorVehiculo: GestorVehiculo;
    let mockGestorReserva: MockProxy<GestorReserva>;
    let mockVehiculo: MockProxy<Vehiculo>;

    beforeEach(()=>{
        gestorVehiculo= new GestorVehiculo();
        mockGestorReserva= mockDeep<GestorReserva>();
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

    it("Verifica el método eliminar", ()=>{
        const listaVehiculos: Array<Vehiculo>=[mockVehiculo];
        gestorVehiculo.eliminar<Vehiculo>(mockVehiculo, listaVehiculos);

        expect(listaVehiculos).toHaveLength(0);
    });

    it("Verifica el método cambiarEstado", ()=>{
        const listaVehiculos: Array<Vehiculo>=[mockVehiculo];
        const reservaMock= jest.fn();
        const reservasMock: Array<any>=[];

        mockVehiculo.getMatricula.mockReturnValue("ABC123");
        mockVehiculo.getEstado.mockReturnValue(0); // Estado.DISPONIBLE
        mockGestorReserva.hayDisponibilidad.mockReturnValue(true);
        gestorVehiculo.cambiarEstado(mockVehiculo, 1, listaVehiculos, mockGestorReserva, reservaMock as any, reservasMock); // Estado.EN_ALQUILER

        expect(mockVehiculo.setEstado).toHaveBeenCalledWith(1); // Estado.EN_ALQUILER
    }); 



});