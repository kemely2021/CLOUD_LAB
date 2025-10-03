# Aplicación Blog con Docker

Este proyecto implementa una aplicación **CRUD básica de publicaciones** con tres contenedores que interactúan entre sí:

- **Frontend**: interfaz en React + Tailwind.  
- **Backend**: API REST en Node.js (Express).  
- **Base de Datos**: PostgreSQL con inicialización automática.  

---

## 📦 Contenedores y su configuración

### 1️⃣ Frontend
- Ubicado en `frontend/`  
- Contiene un `Dockerfile` que construye una app React.  
- Expone el puerto **3000**.  
- Se conecta al **backend** vía `http://backend:5000/api/posts`.

### 2️⃣ Backend
- Ubicado en `backend/`  
- Implementado en Node.js con Express.  
- Define un API con operaciones `GET` y `POST` para manejar publicaciones.  
- Expone el puerto **5000**.  
- Se conecta al contenedor **db** usando las credenciales de PostgreSQL definidas en `docker-compose.yml`.

### 3️⃣ Base de Datos
- Ubicado en `db/`  
- Usa PostgreSQL y un `Dockerfile` para personalizar la configuración.  
- Ejecuta un script `init.sql` al arrancar, que crea la base de datos y la tabla `posts`.  
- Expone el puerto **5432**.

---

## 🔗 Interacción entre contenedores

El flujo de la aplicación es el siguiente:

1. El **usuario** accede al **frontend** en `http://localhost:3000`.  
2. El **frontend (React)** envía peticiones `fetch` al **backend (Express)**.  
3. El **backend** procesa las solicitudes y consulta la **base de datos PostgreSQL**.  
4. Los resultados se devuelven al **frontend**, que los muestra dinámicamente.  

---

## 📂 Estructura del proyecto
```
BlogApp/
│── docker-compose.yml
│
│── frontend/
│ ├── Dockerfile
│ ├── package.json
│ └── src/
│ ├── App.js
│ ├── index.js
│ ├── components/
│ │ ├── PostForm.js
│ │ └── PostList.js
│ └── styles/
│ └── app.css
│
│── backend/
│ ├── Dockerfile
│ ├── package.json
│ └── src/
│ ├── server.js
│ ├── routes/
│ │ └── posts.js
│ └── db.js
│
│── db/
│ ├── Dockerfile
│ └── init.sql
```
---

## ▶️ Ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/kemely2021/BlogApp.git
   cd BlogApp
   ```

2. Levantar la aplicación:
   ```bash
   docker compose up -d --build
   ```

3. Acceder desde el navegador:
   - **Frontend** → [http://localhost:3000](http://localhost:3000)  
   - **Backend** → [http://localhost:5000/api/posts](http://localhost:5000/api/posts)  
   - **Base de datos (opcional)** → `localhost:5432` (con DBeaver, PgAdmin u otro cliente).
---

<p float="left">
  <img src="https://github.com/kemely2021/CLOUD_LAB/blob/main/IMAGENES/blog.png?raw=true" width="300" />
  <img src="https://github.com/kemely2021/CLOUD_LAB/blob/main/IMAGENES/blog1.png?raw=true" width="300" />
</p>