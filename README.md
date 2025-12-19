# bit. Self Studio - Sistema de Reservas

Aplicación web para agendar citas en el estudio de auto-fotografía bit. Self Studio.

## Tecnologías

- **Next.js 16** - Framework React con App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Prisma** - ORM para base de datos
- **Tailwind CSS v4** - Estilos
- **PostgreSQL** - Base de datos

## Configuración Inicial

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar base de datos

Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/bit_self_studio?schema=public"
```

Reemplaza `usuario`, `password`, `localhost`, `5432` y `bit_self_studio` con tus credenciales de PostgreSQL.

### 3. Configurar Prisma

```bash
# Crear la base de datos y aplicar el schema
pnpm db:push

# O usar migraciones (recomendado para producción)
pnpm db:migrate

# Poblar la base de datos con datos iniciales
pnpm db:seed
```

### 4. Iniciar el servidor de desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta el linter
- `pnpm db:push` - Aplica el schema a la base de datos sin migraciones
- `pnpm db:migrate` - Crea y aplica migraciones
- `pnpm db:seed` - Pobla la base de datos con datos iniciales
- `pnpm db:studio` - Abre Prisma Studio (interfaz visual para la BD)

## Estructura del Proyecto

```
bit-self-studio/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── appointments/  # Endpoints para citas
│   │   ├── sessions/      # Endpoints para tipos de sesión
│   │   └── availability/  # Endpoints para disponibilidad
│   ├── servicios/         # Página de servicios y precios
│   ├── reservar/          # Página de reserva con calendario
│   ├── confirmar/         # Página de confirmación
│   └── confirmacion-exitosa/ # Página de confirmación exitosa
├── components/            # Componentes reutilizables
│   ├── Header.tsx         # Header con navegación
│   └── Footer.tsx         # Footer
├── lib/                   # Utilidades
│   └── prisma.ts         # Cliente de Prisma
└── prisma/               # Configuración de Prisma
    ├── schema.prisma     # Schema de la base de datos
    └── seed.ts           # Script de seed
```

## Modelos de Base de Datos

### SessionType
Tipos de sesión disponibles:
- **Sesión Express** - 30 minutos - $80 USD
- **Sesión Clásica** - 60 minutos - $140 USD
- **Sesión Premium** - 90 minutos - $200 USD

### Appointment
Citas/reservas de los clientes con información de contacto y estado.

## API Endpoints

### Sesiones
- `GET /api/sessions` - Obtiene todos los tipos de sesión
- `GET /api/sessions/[id]` - Obtiene un tipo de sesión específico

### Disponibilidad
- `GET /api/availability?date=YYYY-MM-DD&duration=30` - Obtiene horarios disponibles para una fecha

### Citas
- `POST /api/appointments` - Crea una nueva cita
- `GET /api/appointments/[id]` - Obtiene una cita específica

## Características

- ✅ Sistema de reservas con calendario interactivo
- ✅ Selección de tipos de sesión y precios
- ✅ Verificación de disponibilidad en tiempo real
- ✅ Confirmación de citas con información del cliente
- ✅ Diseño responsive y moderno
- ✅ Soporte para modo oscuro (preparado)

## Próximos Pasos

- [ ] Implementar autenticación de usuarios
- [ ] Panel de administración para gestionar citas
- [ ] Notificaciones por email
- [ ] Integración con calendario (Google Calendar, iCal)
- [ ] Sistema de pagos
- [ ] Galería de fotos
- [ ] Página de portafolio

## Licencia

Privado - bit. Self Studio
