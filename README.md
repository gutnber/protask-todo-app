# ProTask - Full Stack Todo App

Aplicación de tareas full-stack lista para desplegar en **Firebase Studio (Antigravity)** + **Inforge Backend**.

## 📁 Estructura del Proyecto

```
todo-app/
├── frontend/          # Frontend estático (Firebase Hosting)
│   └── index.html     # SPA completa con HTML/CSS/JS
├── backend/           # Backend API (Node.js/Express)
│   ├── server.js      # API RESTful
│   ├── package.json   # Dependencias
│   └── .env.example   # Variables de entorno
└── docs/              # Documentación
```

## 🚀 Quick Start

### 1. Frontend (Firebase Studio)

```bash
# El frontend es un solo archivo HTML
# Súbelo directamente a Firebase Hosting o Firebase Studio

# Opción A: Firebase CLI
firebase init hosting
cp frontend/index.html public/
firebase deploy

# Opción B: Firebase Studio
# 1. Crea nuevo workspace
# 2. Importa desde GitHub o sube los archivos
# 3. Firebase Studio detecta automáticamente
```

### 2. Backend (Inforge)

```bash
cd backend
npm install

# Configura variables de entorno
cp .env.example .env
# Edita .env con tu API_KEY de Inforge

# Inicio desarrollo
npm run dev

# Producción
npm start
```

## 📡 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/tasks` | Listar todas las tareas |
| POST | `/api/tasks` | Crear nueva tarea |
| GET | `/api/tasks/:id` | Obtener tarea específica |
| PUT | `/api/tasks/:id` | Actualizar tarea |
| PATCH | `/api/tasks/:id/toggle` | Toggle completado |
| DELETE | `/api/tasks/:id` | Eliminar tarea |
| GET | `/api/stats` | Estadísticas |
| POST | `/api/tasks/bulk` | Operaciones en bulk |

## 🔐 Autenticación

Todas las rutas de API requieren header:
```
Authorization: Bearer YOUR_API_KEY
```

## 🎯 Características

### Frontend
- ✅ Diseño moderno con gradientes
- ✅ Responsive (mobile-first)
- ✅ Animaciones suaves
- ✅ Filtros (Todas/Pendientes/Completadas)
- ✅ Estadísticas en tiempo real
- ✅ LocalStorage (demo) / API (producción)

### Backend
- ✅ RESTful API completa
- ✅ Rate limiting (100 req/15min)
- ✅ Validación de datos (Joi)
- ✅ Seguridad (Helmet, CORS)
- ✅ Bulk operations
- ✅ Prioridades (low/medium/high)
- ✅ Fechas de vencimiento

## 🔧 Integración con Inforge

1. **Crear proyecto en Inforge:**
   - Nombre: `todo-app`
   - Tipo: `Node.js API`

2. **Configurar variables:**
   ```env
   PORT=3000
   API_KEY=tu-api-key-de-inforge
   FRONTEND_URL=https://tu-app.web.app
   ```

3. **Deploy:**
   ```bash
   git push inforge main
   # O subir ZIP vía dashboard
   ```

4. **Obtener URL del API:**
   - Ejemplo: `https://api.inforge.gutnber.com`

5. **Conectar Frontend:**
   - Editar `index.html` línea 251:
   ```javascript
   const API_URL = 'https://api.inforge.gutnber.com/tasks';
   const API_KEY = 'tu-api-key';
   ```

## 📊 Roadmap

- [ ] Autenticación de usuarios (JWT)
- [ ] Base de datos (PostgreSQL/MongoDB)
- [ ] WebSockets para tiempo real
- [ ] Notificaciones push
- [ ] App móvil (PWA)
- [ ] Tests automatizados
- [ ] CI/CD pipeline

## 🛠️ Tecnologías

**Frontend:**
- HTML5 semántico
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- LocalStorage API

**Backend:**
- Node.js 18+
- Express.js 4.x
- UUID para IDs
- Joi para validación
- Helmet para seguridad

**Deploy:**
- Firebase Studio (Frontend)
- Inforge (Backend)
- Firebase Hosting

## 📱 Screenshots

*(Agregar screenshots aquí)*

## 📝 Licencia

MIT - Libre para usar y modificar

## 🆘 Soporte

¿Problemas? Contacta a tu agente de desarrollo: **Genee** 🤖
