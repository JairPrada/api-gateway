# API Gateway

Punto de entrada unico para todas las peticiones del frontend hacia los microservicios del sistema bancario.

## Informacion del Proyecto

| Propiedad | Valor |
|-----------|-------|
| Nombre | api-gateway |
| Puerto | 5000 |
| Prefijo | `/api-gateway/v1` |
| Framework | NestJS 11 |

## Documentacion

### Documentacion de Arquitectura General

Para entender la arquitectura completa del sistema, flujos de datos y como se conectan los servicios, consultar:

- [Arquitectura del Sistema (GitHub)](https://github.com/JairPrada/frontend-bank/blob/main/ARCHITECTURE.md)

### Documentacion Swagger (OpenAPI)

Este servicio expone documentacion interactiva de la API con Swagger. Una vez el servicio este corriendo, acceder a:

- **Swagger UI:** http://localhost:5000/api

### Documentacion Tecnica del Proyecto

Para documentacion detallada sobre modulos, endpoints y patrones de diseno, consultar el archivo [DOCS.md](./DOCS.md).

### Historias de Usuario

Para consultar las historias de usuario que describen las funcionalidades implementadas, ver [user-stories/README.md](./user-stories/README.md).

## Requisitos Previos

- Node.js 20.x o superior
- npm 10.x o superior
- Archivo de variables de entorno `.env`

## Configuracion de Variables de Entorno

Las variables de entorno fueron enviadas por correo electronico en el archivo `.env.api-gateway`.

1. Copiar el archivo recibido a la raiz del proyecto:
   ```bash
   cp /ruta/del/archivo/.env.api-gateway ./.env
   ```

2. Verificar que el archivo `.env` existe en la raiz del proyecto `api-gateway/`

Las variables incluyen:
- Configuracion de conexion a MongoDB Atlas
- Credenciales de Grafana Cloud para observabilidad
- Configuracion de JWT y CORS

**Nota:** No se requiere Docker. La base de datos MongoDB esta alojada en MongoDB Atlas y las metricas se envian a Grafana Cloud.

## Instalacion

```bash
npm install
```

## Ejecucion

### Orden de ejecucion de servicios

Para ejecutar el sistema completo, seguir este orden:

1. **Primero:** Microservicio Product (puerto 4000)
2. **Segundo:** API Gateway (puerto 5000)
3. **Tercero:** Frontend Bank (puerto 3000)

### Comandos

```bash
# Modo desarrollo (con hot reload)
npm run start:dev

# Modo produccion
npm run build
npm run start:prod
```

El servicio estara disponible en `http://localhost:5000`.

### Verificar que el servicio esta corriendo

```bash
curl http://localhost:5000/health
```

## Testing

```bash
# Tests unitarios
npm run test

# Tests con coverage
npm run test:cov

# Tests e2e
npm run test:e2e
```

## Scripts Disponibles

| Script | Descripcion |
|--------|-------------|
| `npm run start:dev` | Inicia en modo desarrollo con hot reload |
| `npm run start:prod` | Inicia en modo produccion |
| `npm run build` | Compila el proyecto |
| `npm run test` | Ejecuta tests unitarios |
| `npm run test:cov` | Ejecuta tests con reporte de coverage |
| `npm run lint` | Ejecuta el linter |

## Endpoints de Health Check

| Endpoint | Descripcion |
|----------|-------------|
| `/health` | Estado general del servicio |
| `/health/liveness` | Verificacion de vida |
| `/health/readiness` | Verificacion de preparacion |
| `/metrics` | Metricas Prometheus |

## Estructura del Proyecto

```
api-gateway/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── common/
│   │   ├── correlation-id/
│   │   └── observability/
│   └── modules/
│       ├── applications/
│       ├── auth/
│       ├── otp/
│       ├── products/
│       └── users/
└── test/
```
