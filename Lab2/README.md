# 🐳 Lab2 - Aplicación de Gestión de Usuarios con Docker

Este proyecto implementa una aplicación **CRUD básica de usuarios** con tres contenedores que interactúan entre sí:

- **Frontend**: interfaz en HTML + JavaScript.  
- **Backend**: API REST en Python (Flask).  
- **Base de Datos**: MySQL con inicialización automática.  

---

## 📦 Contenedores y su configuración

### 1️⃣ Frontend
- Ubicado en `frontend/`  
- Contiene un `Dockerfile` que construye una pequeña app web con Nginx.  
- Expone el puerto **8081** para no entrar en conflicto con otros servicios en el host.  
- Se conecta al **backend** vía `http://backend:5000`.

### 2️⃣ Backend
- Ubicado en `backend/`  
- Implementado en Python con Flask.  
- Define un API con operaciones `GET`, `POST` y `DELETE` para manejar usuarios.  
- Expone el puerto **5000**.  
- Se conecta al contenedor **db** usando las credenciales de MySQL definidas en `docker-compose.yml`.

### 3️⃣ Base de Datos
- Ubicado en `db/`  
- Usa MySQL y un `Dockerfile` para personalizar la configuración.  
- Ejecuta un script `init.sql` al arrancar, que crea la base de datos y la tabla `usuarios`.  
- Expone el puerto **3307** (externo) → **3306** (interno) para evitar conflictos con MySQL local.

---

## 🔗 Interacción entre contenedores

El flujo de la aplicación es el siguiente:

1. El **usuario** accede al **frontend** en `http://localhost:8081`.
2. El **frontend (JS)** envía peticiones `fetch` al **backend (Flask)**.
3. El **backend** procesa las solicitudes y consulta la **base de datos MySQL**.
4. Los resultados se devuelven al **frontend**, que los muestra dinámicamente.

## 📂 Estructura del proyecto

```
Lab2/
│── docker-compose.yml
│
│── frontend/
│   ├── Dockerfile
│   └── index.html
│
│── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app.py
│
│── db/
│   ├── Dockerfile
│   └── init.sql
```

---

## ▶️ Ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/kemely2021/CLOUD_LAB.git
   cd CLOUD_LAB/Lab2
   ```

2. Levantar la aplicación:
   ```bash
   docker compose up -d --build
   ```

3. Acceder desde el navegador:
   - **Frontend** → [http://localhost:8081](http://localhost:8081)  
   - **Backend** → [http://localhost:5000/usuarios](http://localhost:5000/usuarios)  
   - **Base de datos (opcional)** → `localhost:3307` (MySQL Workbench u otro cliente).
---
<p align="left">
  <img width="50%" height="50%" src="IMAGENES/datos.png">
</p>

## 📊 Diagrama de interacción

```mermaid
flowchart TD
  user([👤 Usuario]) --> |frontend|[🌐 Frontend (HTML+JS)]
  frontend --> |backend|[⚙️ Backend (Flask API)]
  backend --> |db|[🗄 MySQL DB]

```
---

## 📌 Notas importantes

- Los puertos externos fueron ajustados para evitar conflictos:
  - **Frontend**: `8081:80`
  - **Backend**: `5000:5000`
  - **DB**: `3307:3306`
- Todos los contenedores están en la misma red `lab2_default` creada por Docker Compose.
- La base de datos se inicializa automáticamente con `init.sql`.
---
