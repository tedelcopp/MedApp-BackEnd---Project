# **🏥 | MedApp: Plataforma de Gestión Médica**

**MedApp** es una aplicación para facilitar la gestión de historiales médicos y citas en clínicas y consultorios. Su objetivo es optimizar la organización y la experiencia de los profesionales de la salud mediante una interfaz intuitiva y funcionalidades personalizables.

---

## 📋 | Funcionalidades

* **Gestión de pacientes**: La API permite la creación, consulta, edición y eliminación de pacientes.
* **Organización de citas**: Puntos de acceso para programar, actualizar, visualizar y eliminar citas.
* **Autenticación y seguridad**: Manejo de autenticación para proteger el acceso a los datos.

---

## 🛠️ | Tecnologías utilizadas

* **Backend**: Node.js, Express.js.
* **Base de datos**: MySQL2.
* **ORM**: Sequelize para la gestión de modelos y datos.

---

## 🏗️ | Arquitectura del Proyecto

Para lograr una estructura modular, escalable y fácil de mantener, este backend está construido con una **arquitectura de tres capas**, organizando el código de manera clara y eficiente.

* **Capa de Rutas (Routes):** Se encarga de manejar las solicitudes HTTP y dirige cada endpoint a su controlador correspondiente.
* **Capa de Controladores (Controllers):** Procesa la lógica de negocio, realiza validaciones y gestiona la comunicación con la capa de servicios.
* **Capa de Servicios (Services):** Interactúa directamente con la base de datos, asegurando que el acceso a datos sea flexible y escalable.

---

## **Objetivo del proyecto**

Brindar una herramienta eficiente, moderna y fácil de usar para profesionales médicos.

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
    npm start
    ```

---
## **Acceso**

Podés ver la aplicación desplegada en: https://themedapp.vercel.app

---

## **Contribuciones**

Toda colaboración de mejora es bienvenida. Si tenes ideas para mejorar el código actual, no dudes en escribirme.

---

## **Contacto**

Podés contactarme a través de mi [LinkedIn](https://www.linkedin.com/in/edelcopp/) o por correo electrónico a [tomas.edelcopp@gmail.com](mailto:tomas.edelcopp@gmail.com).
