Smart Events 

Smart Events es una aplicación web full-stack desarrollada en Nuxt 3 para la gestión eficiente de eventos e inscripciones. El sistema permite la administración de usuarios, la creación de actividades y el registro de participantes, destacando por su robusta validación y normalización de datos en el servidor mediante Prisma ORM.

Tecnologías Utilizadas

Framework / Frontend & API: Nuxt 3 (Vue.js)

Lenguaje: TypeScript

ORM: Prisma

Base de Datos: MySQL / MariaDB

Requisitos Previos

Asegúrate de tener instalados los siguientes programas antes de comenzar:

Node.js (v18 o superior recomendado)

Gestor de paquetes: npm (o yarn / pnpm)

Un motor de base de datos SQL (MySQL o MariaDB) ejecutándose localmente.

Instalación y Ejecución Local

Sigue estos pasos para levantar el entorno de desarrollo:

1. Clonar el repositorio

git clone <URL_DE_TU_REPOSITORIO>
cd Smart_Events


2. Instalar dependencias

npm install


3. Configurar variables de entorno
Crea un archivo llamado .env en la raíz del proyecto. Define tu cadena de conexión a la base de datos:

# Reemplaza 'usuario', 'password', 'localhost' y 'smartevents' con tus credenciales reales
DATABASE_URL="mysql://usuario:password@localhost:3306/smartevents"


4. Sincronizar la Base de Datos con Prisma
Estos comandos leerán el archivo schema.prisma, crearán las tablas en tu base de datos y generarán el cliente tipado:

npx prisma db push
npx prisma generate


5. Ejecutar el servidor de desarrollo

npm run dev


La aplicación estará disponible en http://localhost:3000.

Modelo de Datos

El núcleo de la gestión de datos se basa en las siguientes entidades principales configuradas en el esquema de Prisma:

Usuario: Almacena los perfiles del sistema.

Evento: Contiene la información de las actividades (título, fecha, descripción, capacidad).

Inscrito: Entidad relacional que vincula a un Usuario con un Evento, registrando su participación.

🔌 Endpoints Principales (API)

El backend de la aplicación, manejado a través de las rutas de servidor de Nuxt, incluye validación exhaustiva de los datos de entrada:

POST /api/eventos - Crea un nuevo evento validando la estructura de la información.

POST /api/inscripciones - Registra a un usuario en un evento, validando reglas de negocio.

Evaluación N°3

Desarrollador: Ignacio Morales

