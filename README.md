# **🏥 | MedApp: Plataforma de Gestión Médica**

**MedApp** es una aplicación diseñada para asistir en la gestión de registros de pacientes y la organización de turnos en clínicas y consultorios. La plataforma se centra en proporcionar una herramienta que facilite los procesos administrativos cotidianos del profesional de la salud. Para ello, incorpora una interfaz clara y estructurada, orientada a las necesidades operativas de la consulta profesional.

---

## **✨ | Características**

- **📋 Gestión de pacientes:** Crea, actualiza y elimina perfiles de pacientes de forma eficiente, manteniendo un registro médico organizado y accesible.
- **📅 Organización de turnos médicos:** Programa, visualiza y gestiona todos los turnos médicos con facilidad.
- **🌗 Modo oscuro/claro:** Alterna entre el Modo Oscuro y el Modo Claro para una visualización cómoda y personalizable, ajustándose a cualquier condición de luz y preferencia visual.
- **📊 Panel de administración:** Navega con fluidez a través de las secciones clave: Inicio, Pacientes, Turnos y Configuración.
- **💾 Persistencia de datos:** Toda la información queda permanentemente registrada en la base de datos, asegurando la integridad, disponibilidad y trazabilidad de los datos.
- **📱 Diseño responsive:** Accede y utiliza la aplicación desde cualquier dispositivo (móvil, tablet o escritorio), garantizando una experiencia visual y funcional en cualquier tamaño de pantalla.
  
---

## 🛠️ | **Tecnologías utilizadas**
* **Lenguaje**: JavaScript ➤ Node.js.
* **Framework**: Express.js.
* **Base de datos:** [PostgreSQL](https://www.postgresql.org/) ➤ Hospedada en [Neon](https://neon.tech/).
* **Alojamiento**: Hospedado en [Render](https://render.com/).
* - **FrontEnd:** [tedelcopp/MedApp-FrontEnd---Project](https://github.com/tedelcopp/MedApp-FrontEnd---Project) ➤ Hospedado en [Vercel](https://vercel.com/).

---

## 🏗️ | **Arquitectura del Proyecto**

Para lograr una estructura modular, escalable y fácil de mantener, este backend está construido con una **arquitectura de tres capas**, organizando el código de manera clara y eficiente.

* **Capa de Rutas (Routes):** Se encarga de manejar las solicitudes HTTP y dirige cada endpoint a su controlador correspondiente.
* **Capa de Controladores (Controllers):** Procesa la lógica de negocio, realiza validaciones y gestiona la comunicación con la capa de servicios.
* **Capa de Servicios (Services):** Interactúa directamente con la base de datos, asegurando que el acceso a datos sea flexible y escalable.

---

## ⚙️ | **Instalación y Uso**

1.  **Clona este repositorio**.
    ```bash
    git clone [<URL_DEL_REPOSITORIO_BACKEND>](https://github.com/tedelcopp/MedApp-BackEnd---Project.git)
    ```

2.  **Navega al directorio del proyecto**.
    ```bash
    cd MedApp-BackEnd---Project
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
## 🌐 | **API Pública**

Podés acceder a traves de https://medapp-backend-project.onrender.com

Si todo funciona bien, podras ver el mensaje de confirmación en pantalla:  

  ```bash
"MedApp Backend | Servidor en funcionamiento | Buenos Aires, Argentina."
 ```
---

---
## 🚀 | **Acceso**

Podés ver la aplicación desplegada en: https://themedapp.vercel.app

---

## 🔑 | **Credencial de usuario maestro**
  ```bash
- MASTER_USER=medapp@gmail.com
- MASTER_PASS=admin1234
 ```
---

## 🤝 | **Contribuciones**

Toda colaboración de mejora es bienvenida. Si tenes ideas para mejorar el código actual, no dudes en escribirme.

---

## 📬 | **Contacto**

Podés contactarme a través de mi [LinkedIn](https://www.linkedin.com/in/edelcopp/) o por correo electrónico a [tomas.edelcopp@gmail.com](mailto:tomas.edelcopp@gmail.com).
