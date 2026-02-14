# Configurar Deploy Automático

## Paso 1: Agregar el Secret en GitHub

1. Ve a tu repo: https://github.com/gutnber/protask-todo-app
2. Click en **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FIREBASE_TOKEN`
5. Value: El token que me pasaste
6. Click **Add secret**

## Paso 2: Listo!

Ahora cada vez que hagas:
```bash
git push origin main
```

El código se deployará automáticamente a Firebase! 🚀

## Verificar deploy

Ve a **Actions** en tu repo de GitHub para ver el estado de los deploys.
