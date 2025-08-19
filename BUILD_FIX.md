# 🔧 Solución para Error de Build: @rollup/rollup-linux-x64-gnu

## 📋 Descripción del Problema

El error de build relacionado con `@rollup/rollup-linux-x64-gnu` es un problema conocido que ocurre cuando se intenta hacer build de aplicaciones Vite/Rollup en entornos Linux (como Netlify) con Rollup 4.x.

**Error típico:**

```
Error: Cannot find module '@rollup/rollup-linux-x64-gnu'
```

## 🔍 Causa Raíz

Rollup 4.x incluye binarios platform-specific como dependencias opcionales:

- `@rollup/rollup-darwin-x64` (macOS Intel)
- `@rollup/rollup-darwin-arm64` (macOS Apple Silicon)
- `@rollup/rollup-linux-x64-gnu` (Linux x64)
- `@rollup/rollup-win32-x64-msvc` (Windows x64)

Cuando se hace build en Netlify (Linux), el sistema intenta resolver estas dependencias pero puede fallar debido a:

- Problemas de resolución de módulos
- Dependencias opcionales no instaladas correctamente
- Conflictos entre diferentes versiones de Node.js

## ✅ Solución Implementada

### 1. Configuración de Vite (`vite.config.ts`)

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        // Excluir binarios platform-specific de Rollup
        /^@rollup\/rollup-.*/,
      ],
      onwarn(warning, warn) {
        // Suprimir warnings sobre módulos externos
        if (
          warning.code === "UNRESOLVED_IMPORT" &&
          warning.message?.includes("@rollup/rollup-")
        ) {
          return;
        }
        warn(warning);
      },
    },
    target: "esnext",
    minify: "esbuild",
  },
  optimizeDeps: {
    exclude: ["@rollup/rollup-linux-x64-gnu"],
  },
});
```

### 2. Configuración de Netlify (`netlify.toml`)

```toml
[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--no-optional"
  ROLLUP_SKIP_NODEJS_RESOLUTION = "true"
```

### 3. Script de Build Limpio (`scripts/build.sh`)

```bash
#!/bin/bash
# Script que maneja dependencias platform-specific
npm install --no-optional
npm run build
```

### 4. Gitignore Actualizado

```
# Platform-specific dependencies
@rollup/rollup-*
# Build cache
.vite
```

## 🚀 Cómo Usar la Solución

### Desarrollo Local

```bash
npm run build          # Build normal
npm run build:clean   # Build con limpieza y reinstalación
```

### Deploy en Netlify

1. La configuración se aplica automáticamente
2. Las variables de entorno están configuradas en `netlify.toml`
3. El build excluye automáticamente dependencias problemáticas

## 🔍 Verificación

Para verificar que la solución funciona:

1. **Build local exitoso:**

   ```bash
   npm run build
   # Debe completarse sin errores
   ```

2. **Build en Netlify:**
   - Revisar logs de build en el dashboard de Netlify
   - Verificar que no hay errores de `@rollup/rollup-linux-x64-gnu`
   - Confirmar que la aplicación se despliega correctamente

## 🛠️ Solución Alternativa (si persiste el problema)

Si el problema persiste, se puede intentar:

1. **Forzar versión específica de Rollup:**

   ```bash
   npm install rollup@4.46.3 --save-dev
   ```

2. **Limpiar cache de npm:**

   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Usar Node.js 18 específicamente:**
   ```bash
   nvm use 18
   npm install
   npm run build
   ```

## 📚 Referencias

- [Rollup 4.x Changelog](https://github.com/rollup/rollup/blob/master/CHANGELOG.md)
- [Vite Build Configuration](https://vitejs.dev/config/build-options.html)
- [Netlify Build Environment](https://docs.netlify.com/configure-builds/environment-variables/)

## ✅ Estado de la Solución

- ✅ **Configuración de Vite implementada**
- ✅ **Configuración de Netlify actualizada**
- ✅ **Script de build limpio creado**
- ✅ **Gitignore actualizado**
- ✅ **Documentación completa**
- ✅ **Pruebas locales exitosas**

La solución está lista para deployment en Netlify y debería resolver el error de build relacionado con `@rollup/rollup-linux-x64-gnu`.
