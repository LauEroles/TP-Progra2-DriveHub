# DriveHub - Sistema de Gestión de Alquiler de Vehículos

Sistema de gestión para empresa de alquiler de vehículos desarrollado en TypeScript, implementando patrones de diseño State, Strategy, Facade, Template Method y principios de POO.

## Tabla de Contenidos

- Descripción
- Características
- Arquitectura y Patrones
- Estructura del Proyecto
- Instalación
- Uso
- Testing
- Diagramas
- Tecnologías

---

## Descripción

*DriveHub* es un sistema completo para la gestión de alquiler de vehículos que permite:
- Gestionar diferentes tipos de vehículos (Compacto, Sedan, SUV)
- Administrar reservas con verificación de disponibilidad
- Controlar estados de vehículos mediante el patrón State
- Calcular tarifas según temporada y tipo de vehículo mediante el patrón Strategy
- Registrar mantenimientos y actualizar kilometraje

---

## Características

### Gestión de Vehículos
- Tres tipos de vehículos con tarifas diferenciadas
- Control de kilometraje
- Historial de mantenimientos
- Estados dinámicos del vehículo

### Estados del Vehículo (Patrón State)
- *Disponible*: Vehículo listo para alquilar
- *En Alquiler*: Vehículo actualmente alquilado
- *Necesita Limpieza*: Requiere limpieza antes de nuevo alquiler
- *En Mantenimiento*: Vehículo en servicio técnico

### Sistema de Reservas
- Verificación automática de disponibilidad por fechas
- Validación de conflictos de reservas
- Asociación de clientes y vehículos

### Cálculo de Tarifas
Tarifas variables según:
- *Tipo de vehículo*: Compacto, Sedan, SUV
- *Temporada*: Alta, Media, Baja
- *Kilometraje*: Cargo adicional por km excedido

---

## Patrones

### Patrones de Diseño Implementados

#### 1. *State* 
Gestiona los estados del vehículo de forma dinámica:
Disponible ──alquilar()──> EnAlquiler
EnAlquiler ──devolver()──> NecesitaLimpieza
NecesitaLimpieza ──limpiar()──> Disponible
Disponible ──enviarMantenimiento()──> EnMantenimiento
EnMantenimiento ──finalizarMantenimiento()──> Disponible

#### 2. *Strategy*
Diferentes estrategias de cálculo de tarifas según temporada:
- TempAlta: Temporada alta (verano, fin de año)
- TempMedia: Temporada media (otoño, primavera)
- TempBaja: Temporada baja (resto del año)

#### 3. *Template Method*
Clase abstracta Vehiculo define la estructura base:
- Método abstracto: calcCargoVariable()
- Implementaciones concretas: Compacto, Sedan, SUV

#### 4. *Gestores (ABM Pattern)*
Interfaz ABM para operaciones CRUD:
- GestorVehiculo
- GestorReserva
- GestorMantenimiento
- GestorKilometraje

### Principios SOLID Aplicados

- Single Responsibility: Cada clase tiene una responsabilidad única
- Open/Closed: Estados extensibles sin modificar código existente
- Liskov Substitution: Subtipos de Vehiculo son intercambiables
- Interface Segregation: Interfaces específicas (ABM, Estado, Temporada)
- Dependency Inversion: Dependencias a abstracciones (interfaces)

### Patrones de Diseño

- State Pattern
- Strategy Pattern
- Template Method
- Facade (SistemaEmpresa)

---

## Estructura del Proyecto

TP-Programacion2-DriveHub/


├── 📂 src/                          # Código fuente del proyecto
│   ├── 📄 abm.ts                    # Interface ABM (Alta, Baja, Modificación)
│   ├── 📄 cliente.ts                # Clase Cliente
│   ├── 📄 constantes.ts             # Constantes de tarifas y configuración
│   ├── 📄 mantenimientoVehiculo.ts  # Clase MantenimientoVehiculo
│   ├── 📄 reserva.ts                # Clase Reserva
│   ├── 📄 sistemaEmpresa.ts         # Clase principal del sistema
│   │
│   ├── 📂 estados/                  # Patrón State para estados del vehículo
│   │   ├── 📄 estado.ts             # Interface Estado
│   │   ├── 📄 disponible.ts         # Estado Disponible
│   │   ├── 📄 enAlquiler.ts         # Estado En Alquiler
│   │   ├── 📄 enMantenimiento.ts    # Estado En Mantenimiento
│   │   └── 📄 necesitaLimpieza.ts   # Estado Necesita Limpieza
│   │
│   ├── 📂 gestores/                 # Gestores del sistema
│   │   ├── 📄 gestor_reserva.ts     # Gestor de reservas
│   │   ├── 📄 gestor_vehiculo.ts    # Gestor de vehículos
│   │   ├── 📄 gestorKilometraje.ts  # Gestor de kilometraje
│   │   ├── 📄 gestorMantenimiento.ts# Gestor de mantenimiento
│   │   └── 📄 gestorReportes.ts     # Gestor de reportes y estadísticas
│   │
│   ├── 📂 temporadas/               # Patrón Strategy para temporadas
│   │   ├── 📄 temporada.ts          # Interface Temporada
│   │   ├── 📄 tempAlta.ts           # Temporada Alta (+20%)
│   │   ├── 📄 tempMedia.ts          # Temporada Media (sin cambios)
│   │   └── 📄 tempBaja.ts           # Temporada Baja (-10%)
│   │
│   └── 📂 vehiculos/                # Clases de vehículos
│       ├── 📄 vehiculo.ts           # Clase abstracta Vehiculo
│       ├── 📄 compacto.ts           # Clase Compacto
│       ├── 📄 sedan.ts              # Clase Sedan
│       └── 📄 suv.ts                # Clase SUV
│
├── 📂 tests/                        # Tests unitarios con Jest
│   ├── 📄 cliente.test.ts
│   ├── 📄 mantenimientoVehiculo.test.ts
│   ├── 📄 reserva.test.ts
│   ├── 📄 sistemaEmpresa.test.ts
│   │
│   ├── 📂 estados-test/             # Tests de estados
│   │   ├── 📄 estado.test.ts
│   │   ├── 📄 disponible.test.ts
│   │   ├── 📄 enAlquiler.test.ts
│   │   ├── 📄 enMantenimiento.test.ts
│   │   └── 📄 necesitaLimpieza.test.ts
│   │
│   ├── 📂 gestores-test/            # Tests de gestores
│   │   ├── 📄 gestor_reserva.test.ts
│   │   ├── 📄 gestor_vehiculo.test.ts
│   │   ├── 📄 gestorKilometraje.test.ts
│   │   ├── 📄 gestorMantenimiento.test.ts
│   │   └── 📄 gestorReportes.test.ts
│   │
│   ├── 📂 temporadas-test/          # Tests de temporadas
│   │   ├── 📄 tempAlta.test.ts
│   │   ├── 📄 tempMedia.test.ts
│   │   └── 📄 tempBaja.test.ts
│   │
│   └── 📂 vehiculos-test/           # Tests de vehículos
│       ├── 📄 vehiculo.test.ts
│       ├── 📄 compacto.test.ts
│       ├── 📄 sedan.test.ts
│       └── 📄 suv.test.ts
│
├── 📂 diagramas/                    # Diagramas UML
│   ├── 📂 clases/
│   │   └── 📄 clases.puml
│   └── 📂 sequencia/
│       ├── 📄 sequencia_1.puml
│       ├── 📄 sequencia_2.puml
│       └── 📄 sequencia_3.puml
|
|
├── 📄 README.md
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 tsconfig.json
├── 📄 jest.config.js
├── 📄 ConsignaTp.pdf
├── 📄 ConsignaTp2.pdf



##Tests

Los tests utilizan *Jest* con *jest-mock-extended* para mocking:

## Diagramas

El proyecto incluye diagramas UML en formato PlantUML ubicados en /Diagramas/:

### Diagrama de Clases
Muestra la estructura completa del sistema con relaciones entre clases.


### Diagramas de Secuencia
1. *Secuencia 1*: Flujo de creación de reserva
![Solicitud de Reservas](sequencia_1.puml)

2. *Secuencia 2*: Flujo de alquiler de vehículo
![Cálculo de Tarifas](sequencia_2.puml)

3. *Secuencia 3*: Transiciones del patrón State
![Gestión de Estados de Vehículos](sequencia_3.puml)

Para visualizar los diagramas, instalar la extensión PlantUML en VSCode.
[00:01, 13/11/2025] Lau: Tarifas del Sistema

### Vehículos

| Tipo       | Tarifa Base/día | Cargo Fijo/día | Cargo Variable | Límite KM |
|------------|----------------|-----------------|----------------|-----------|
| *Compacto* |      $30       |                 |   $0.15/km     |   100 km  |
| *Sedan*    |      $50       |                 |   $0.20/km     |           |
| *SUV*      |      $80       |        $15      |   $0.25/km     |   500 km  |

### Temporadas

| Temporada | Multiplicador |                Meses                 |
|-----------|---------------|--------------------------------------|
| *Alta*    |     1.5x      |   Diciembre, Enero, Febrero, Julio   |
| *Media*   |     1.2x      |       Marzo, Abril, Noviembre        |
| *Baja*    |     1.0x      |   Mayo, Junio, Agosto, Sept, Octubre |

---
Autores de equipo:

- Armani, Valentino
- Eroles, Laura
- Garcia, Verónica
- Kessler, Maelissa


# Configuración del entorno de desarrollo para Programacion 2

# Instalando todo sobre la máquina host

## Instalar NodeJs

1. Ingresar a [NodeJs - Descargas](https://nodejs.org/en/download/) y seleccionar según la plataforma en la que nos encontremos el instalador que mejor se adapte a nuestro sistema operativo.

👉 En el caso de Windows, seleccionar los instaladores que se encuentran en la pestaña "Prebuilt Installer"

![Instalador de Windows](config_env/win_1.png)

👉 En el caso de MacOs o Linux, seleccionar la pestaña "Package Manager" y seleccionar "NVM" en el último combo. Luego copiar y ejecutar en una terminal los comandos que se muestran.

![Instalador de Linux o MacOs](config_env/lin_1.png)

⚠️ **En todos los casos seleccionar alguna versión estable (LTS)**


## Directorio de trabajo

Una vez instalado node, debemos crear el directorio en el cual vamos a desarrollar.
Crear un directorio, que será el directorio del proyecto a utilizar y dentro del mismo descomprimir el archivo 📦 *bootstrap.zip*.

## Instalar las dependencias

Desde una terminal, ingresar al directorio de trabajo creado y ejecutar el siguiente comando: 

```bash
# comando que permite instalar los paquetes especificados en el archivo package.json
user@host:~$ npm i
```

## Compilar el proyecto

Desde una terminal, ingresar al directorio de trabajo creado y ejecutar el siguiente comando: 

```bash
# comando que permite compilar la solución.
user@host:~$ npm run build
```
