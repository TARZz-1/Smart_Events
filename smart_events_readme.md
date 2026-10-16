# Smart Events

**Smart Events** es una aplicación web full-stack desarrollada para la gestión eficiente de eventos e inscripciones. El sistema permite la administración de usuarios, la creación de actividades y el registro de participantes, destacando por su robusta validación y normalización de datos en el servidor.

## Tecnologías Utilizadas

* **Frontend & API:** [Nuxt 3](https://nuxt.com/) (Vue.js framework)

* **Lenguaje:** TypeScript

* **ORM:** [Prisma](https://www.prisma.io/)

* **Base de Datos:** MySQL / MariaDB *(o especificar PostgreSQL si es el caso)*

##  Requisitos Previos

Asegúrate de tener instalados los siguientes programas antes de comenzar:

* [Node.js](https://nodejs.org/es/) (v18 o superior recomendado)

* Gestor de paquetes: `npm`, `yarn` o `pnpm`

* Un motor de base de datos SQL ejecutándose localmente o un clúster en la nube.

## Instalación y Ejecución Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local:

**1. Clonar el repositorio**

```
git clone <URL_DE_TU_REPOSITORIO>
cd smart-events

```

**2. Instalar dependencias**

```
npm install

```

**3. Configurar variables de entorno**
Crea un archivo llamado `.env` en la raíz del proyecto. Puedes usar el archivo `.env.example` como referencia (si existe). Debes definir tu cadena de conexión a la base de datos:

```
# Reemplaza 'usuario', 'password', 'localhost', 'puerto' y 'nombre_bd' con tus credenciales
DATABASE_URL="mysql://usuario:password@localhost:3306/nombre_bd"

```

**4. Sincronizar la Base de Datos con Prisma**
Este comando leerá el archivo `schema.prisma`, creará las tablas necesarias en tu base de datos y generará el cliente tipado de Prisma:

```
npx prisma db push
npx prisma generate

```

**5. Ejecutar el servidor de desarrollo**

```
npm run dev

```

La aplicación estará disponible en `http://localhost:3000`.

## Modelo de Datos (Prisma)

El núcleo de la gestión de datos se basa en las siguientes entidades principales configuradas en el `schema.prisma`:

* **`Usuario`**: Almacena los perfiles del sistema (nombres, correos, etc.).

* **`Evento`**: Contiene la información de las actividades (título, fecha, descripción, capacidad).

* **`Inscrito`**: Entidad relacional que vincula a un Usuario con un Evento, registrando el estado de su participación.

## Endpoints Principales (API)

El backend de la aplicación, manejado a través de las rutas de la API de Nuxt (`/server/api/`), incluye validación exhaustiva y normalización de los datos de entrada:

* `POST /api/eventos` - Crea un nuevo evento validando las fechas y la estructura de la información.

* `POST /api/inscripciones` - Registra a un usuario en un evento, asegurando que se cumplan las reglas de negocio (ej. evitar inscripciones duplicadas).