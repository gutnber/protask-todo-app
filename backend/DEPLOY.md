# ProTask Backend - Deploy Guide

## 🚀 Deploy a Inforge

### 1. Preparar archivos

```bash
# Asegúrate de tener estos archivos en la carpeta backend/
backend/
├── server.js          ✅ (API completa)
├── package.json       ✅ (Dependencias)
├── .env               ⚠️ (Crear desde .env.example)
└── README.md          ✅ (Documentación)
```

### 2. Crear `.env`

```bash
cp .env.example .env
```

Edita `.env`:
```env
PORT=3000
API_KEY=genera-una-api-key-segura-aqui
FRONTEND_URL=https://protask-todo-appgit-7256-39785.web.app
NODE_ENV=production
```

**Generar API Key segura:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Subir a Inforge

**Opción A - Git:**
```bash
cd backend
git init
git add .
git commit -m "ProTask Backend v1.0"
git remote add inforge https://git.inforge.app/tu-usuario/protask-backend.git
git push -u inforge main
```

**Opción B - ZIP:**
1. Comprime la carpeta `backend/` (sin node_modules)
2. Sube a Inforge vía dashboard
3. Configura variables de entorno en el panel

### 4. Obtener URL del API

Después del deploy, Inforge te dará una URL como:
```
https://protask-api-xxx.inforge.app
```

### 5. Conectar Frontend

Edita `frontend/index.html` líneas 221-222:

```javascript
// ANTES:
const API_URL = 'https://api.inforge.gutnber.com/tasks';
const API_KEY = 'YOUR_INFORGE_API_KEY';

// DESPUÉS:
const API_URL = 'https://TU-URL-DE-INFORGE/api/tasks';
const API_KEY = 'TU-API-KEY-REAL';
```

### 6. Redeploy Frontend

```bash
git add frontend/index.html
git commit -m "Connect to Inforge backend"
git push origin main
```

Luego en Firebase Studio: **Sync & Publish**

---

## 📋 Checklist Pre-Deploy

- [ ] `server.js` tiene el código correcto
- [ ] `package.json` tiene todas las dependencias
- [ ] `.env` está configurado con valores reales
- [ ] API_KEY es segura (32+ caracteres random)
- [ ] FRONTEND_URL apunta a tu dominio Firebase

## 🔧 Variables de Entorno Requeridas

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `PORT` | `3000` | Puerto del servidor |
| `API_KEY` | `xxx...` | Clave secreta para autenticación |
| `FRONTEND_URL` | `https://...web.app` | Tu frontend Firebase |
| `NODE_ENV` | `production` | Modo producción |

## 🧪 Test después del deploy

```bash
# Health check
curl https://TU-URL-INFORGE/health

# Debe responder:
# {"status":"ok","timestamp":"...","service":"ProTask API"}
```

## 🆘 Troubleshooting

**Error: "Cannot find module"**
→ Asegúrate de hacer `npm install` antes del deploy

**Error: "Port already in use"**
→ Inforge asigna el puerto automáticamente, usa `process.env.PORT`

**Error: CORS**
→ Verifica que `FRONTEND_URL` en `.env` coincida exactamente con tu URL de Firebase

**¿Problemas?** Contacta a Genee 🤖
