# 🏥 | MedApp: Backend de la Plataforma

Este es el backend de MedApp, la aplicación diseñada para optimizar la gestión de historiales médicos y citas en clínicas. Su objetivo es proporcionar una API robusta y eficiente para que el frontend pueda manejar datos de pacientes y turnos de manera fluida y segura.

---

## 📋 | Funcionalidades de la API

* **Gestión de pacientes**: Endpoints para la creación, consulta, edición y eliminación de historiales.
* **Organización de citas**: Puntos de acceso para programar, actualizar y visualizar citas.
* **Recetas y documentos**: Gestión de datos para la generación de documentos médicos.
* **Autenticación y seguridad**: Manejo de autenticación para proteger el acceso a los datos.

---

## 🛠️ | Tecnologías utilizadas

* **Backend**: Node.js, Express.js.
* **Base de datos**: MySQL2.
* **ORM**: Sequelize para la gestión de modelos y datos.
* **Dependencias**: Nodemon para desarrollo, Cors para la comunicación con el frontend, dotenv para variables de entorno.

---

## Estructura del proyecto

* **Organización modular**: El código está estructurado en módulos (controladores, modelos, rutas) para un desarrollo limpio y escalable.
* **Configuración centralizada**: Uso de un archivo `.env` para gestionar las variables de entorno de la base de datos y la API.

---

## Instalación y Uso

1.  **Clona este repositorio**.
    ```bash
    git clone <URL_DEL_REPOSITORIO_BACKEND>
    ```

2.  **Navega al directorio del proyecto**.
    ```bash
    cd <directorio_del_proyecto>
    ```

3.  **Instala las dependencias**.
    ```bash
    npm install
    ```

4.  **Configura las variables de entorno**.
    Crea un archivo `.env` y agrega las credenciales de tu base de datos:
    ```ini
    DB_HOST=localhost
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_DATABASE=nombre_de_la_base_de_datos
    ```

5.  **Inicia el servidor de desarrollo**.
    ```bash
    npm run dev
    ```

---

## Contribuciones

¡Toda colaboración es bienvenida! Si tienes ideas para mejorar la API, no dudes en escribirme.

---

## Contacto

Si tienes preguntas o deseas más información sobre el proyecto, puedes contactarme a través de mi **LinkedIn**.

---

## ⚡ | Accede

El **frontend** de esta aplicación se encuentra en el siguiente repositorio:
* **[MedApp: Plataforma de Gestión Médica](https://github.com/tedelcopp/MedApp-FrontEnd---Project)**
