# 🍺 Asistente de Gestión de Bodega Cervecera

Una aplicación completa para visualizar y consultar el estado de los tanques de cerveza en una bodega, utilizando IA para asistir en las consultas y una base de datos PostgreSQL para almacenamiento persistente.

## 🚀 Características

- ⚡ **Frontend moderno**: React + TypeScript + Vite
- 🗄️ **Base de datos**: PostgreSQL serverless de Netlify
- 🤖 **Asistente IA**: Google Gemini para consultas inteligentes
- 📱 **Responsive**: Diseño adaptativo para todos los dispositivos
- 🔄 **Tiempo real**: Datos actualizados desde la base de datos
- 🚀 **Deploy automático**: Configurado para Netlify

## 🛠️ Tecnologías

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Netlify Functions
- **Base de datos**: PostgreSQL (Netlify DB Beta)
- **IA**: Google Gemini API
- **Deploy**: Netlify

## 📋 Requisitos previos

- Node.js 18+
- Cuenta de Netlify
- API key de Google Gemini

## 🏃‍♂️ Desarrollo local

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**

   ```bash
   cp env.example .env
   ```

   Edita `.env` con tus credenciales:

   ```
   DATABASE_URL=tu_url_de_postgresql
   API_KEY=tu_api_key_de_gemini
   ```

3. **Ejecutar la aplicación:**
   ```bash
   npm run dev
   ```

## 🚀 Deploy en Netlify

Para instrucciones completas de deployment, consulta [DEPLOYMENT.md](./DEPLOYMENT.md)

### Resumen rápido:

1. **Push a GitHub** y conecta tu repositorio a Netlify
2. **Configura la base de datos** PostgreSQL en Netlify
3. **Añade variables de entorno** en el dashboard de Netlify
4. **Deploy automático** desde tu branch principal

## 🔧 Solución de problemas

### Error de build: @rollup/rollup-linux-x64-gnu

Si encuentras un error de build relacionado con `@rollup/rollup-linux-x64-gnu` en Netlify, este es un problema conocido con Rollup 4.x y plataformas Linux. La aplicación ya está configurada para manejar esto:

**Síntomas:**

```
Error: Cannot find module '@rollup/rollup-linux-x64-gnu'
```

**Solución implementada:**

- Configuración de Vite que excluye dependencias platform-specific
- Configuración de Netlify que maneja dependencias opcionales
- Exclusión de binarios platform-specific en el build

**Si el problema persiste:**

1. Verifica que estés usando Node.js 18+ en Netlify
2. Asegúrate de que las variables de entorno estén configuradas
3. Revisa los logs de build en Netlify para más detalles

## 📊 API Endpoints

Una vez desplegado, tendrás acceso a:

- `GET /.netlify/functions/tanks` - Obtener todos los tanques
- `POST /.netlify/functions/tanks` - Crear nuevo tanque
- `PUT /.netlify/functions/tanks` - Actualizar tanque
- `DELETE /.netlify/functions/tanks?id=ID` - Eliminar tanque

## 🤖 Funcionalidades del Asistente IA

El asistente puede ayudarte con:

- Consultas sobre el estado de tanques específicos
- Análisis de capacidad y volumen
- Información sobre tipos de cerveza
- Estado de fermentación y maduración
- Recomendaciones operativas

## 🗂️ Estructura del proyecto

```
├── components/           # Componentes React
│   ├── TankGrid.tsx     # Grid de tanques con datos reales
│   ├── ChatAssistant.tsx # Chat con IA
│   └── ...
├── services/            # Servicios de API
│   ├── tankService.ts   # Cliente API para tanques
│   └── geminiService.ts # Servicio de IA
├── netlify/
│   └── functions/       # Funciones serverless
│       ├── db.ts        # Utilidades de base de datos
│       └── tanks.ts     # API de tanques
├── netlify.toml         # Configuración de Netlify
└── DEPLOYMENT.md        # Guía de deployment
```

## 🔧 Scripts disponibles

- `npm run dev` - Desarrollo local
- `npm run build` - Build de producción
- `npm run preview` - Preview del build

## 📝 Licencia

Proyecto desarrollado como demostración de integración entre React, PostgreSQL, Netlify Functions y Google Gemini AI.
