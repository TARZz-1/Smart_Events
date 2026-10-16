# Smart Events 

**Smart Events** es un sistema web diseñado para la gestión de eventos e inscripciones. Permite la administración de usuarios y el registro de participantes mediante una API validada de forma robusta en el servidor.

##  Tecnologías Utilizadas

* **Framework:** Nuxt 3
* **ORM:** Prisma
* **Base de Datos:** MySQL / MariaDB
* **Lenguaje:** TypeScript

##  Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu entorno local antes de iniciar:
* Node.js (v18 o superior)
* npm, yarn o pnpm
* Servidor de base de datos MySQL o MariaDB en ejecución

##  Instalación y Configuración

Sigue estos pasos para levantar el entorno de desarrollo:

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd Smart_Events
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y agrega tu cadena de conexión a la base de datos:
   ```env
   DATABASE_URL="mysql://usuario:contraseña@localhost:3306/smartevents"
   ```

4. **Sincronizar la Base de Datos:**
   Aplica el esquema (`schema.prisma`) a tu base de datos y genera el cliente de Prisma:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

##  Estructura de Datos

El proyecto utiliza `globalThis` en `prisma.ts` para optimizar la conexión a la base de datos y maneja las siguientes entidades principales:
* **Usuario:** Almacena los perfiles del sistema.
* **Evento:** Detalla la información de cada actividad.
* **Inscrito:** Gestiona la relación y los registros entre los usuarios y los eventos.

##  Endpoints de la API

Las rutas del servidor procesan, validan y normalizan la información enviada:
* `POST /api/eventos` - Creación de nuevos eventos.
* `POST /api/inscripciones` - Procesamiento de registros de usuarios en eventos.
