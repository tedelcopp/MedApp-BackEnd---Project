# MedApp Backend

Este es el backend de **MedApp**, una aplicación diseñada para la gestión de pacientes y turnos médicos.

## 🚀 Tecnologías Utilizadas

- **Node.js** con **Express.js**
- **MongoDB** con **Mongoose**
- **JWT** para autenticación
- **bcrypt** para encriptación de contraseñas
- **dotenv** para manejo de variables de entorno

## 📌 Instalación

1. Clonar el repositorio:

   ```sh
   git clone https://github.com/tedelcopp/MedApp-BackEnd---Project.git
   ```

2. Instalar dependencias:

   ```sh
   cd MedApp-BackEnd---Project
   npm install
   ```

3. Configurar variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y agrega lo siguiente:

   ```env
   PORT=5000
   MONGO_URI=tu_url_de_mongodb
   JWT_SECRET=tu_secreto_para_jwt
   ```

4. Iniciar el servidor:
   ```sh
   npm start
   ```

## 🔗 Endpoints Principales

### Autenticación

- `POST /api/auth/register` → Registro de usuario
- `POST /api/auth/login` → Inicio de sesión

### Pacientes

- `GET /api/patients` → Obtener todos los pacientes
- `POST /api/patients` → Crear un nuevo paciente

### Turnos

- `GET /api/appointments` → Obtener todos los turnos
- `POST /api/appointments` → Crear un nuevo turno

## ✅ Mejoras Futuras

- Implementar pruebas automatizadas
- Documentación con Swagger
- Mejor manejo de errores
- Seguridad mejorada
