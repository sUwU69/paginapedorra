# Trabajo + Estudio | Otto Krause

## Descripción del Proyecto

Plataforma web institucional diseñada para ayudar a estudiantes de la EEST N°1 Otto Krause a conseguir empleos relacionados con su especialización técnica. El sitio está inspirado en el diseño de argentina.gob.ar, manteniendo un estilo institucional, moderno y accesible.

## Objetivo Principal

Conectar estudiantes técnicos con oportunidades laborales compatibles con su formación y horario de estudio, facilitando:
- Búsqueda de empleos por especialización técnica
- Carga y envío de currículums
- Información sobre derechos laborales estudiantiles
- Consejos para entrevistas y armado de CV

## Características Implementadas

### Funcionalidades Core
- ✅ Sistema de búsqueda de empleos con filtros (rubro, jornada, ubicación)
- ✅ Carga de CVs en formato PDF
- ✅ Ofertas de empleo categorizadas por especialización
- ✅ Información completa sobre derechos laborales (pasantías, prácticas, trabajo en blanco)
- ✅ Formulario de contacto
- ✅ Navegación completa y responsiva

### Páginas Implementadas
1. **Inicio** - Hero con buscador, ofertas destacadas, categorías, testimonios
2. **Ofertas de empleo** - Listado filtrable con modal de detalles
3. **Subí tu CV** - Formulario completo con carga de PDF
4. **Rubros/Áreas** - Categorización por especialidades técnicas
5. **Derechos laborales** - Acordeón con información legal
6. **Contacto** - Formulario de consultas

## Stack Técnico

### Frontend
- **React** con TypeScript
- **Wouter** para routing
- **TanStack Query** para gestión de estado y cache
- **Shadcn UI** para componentes
- **Tailwind CSS** para estilos
- **Lucide React** para iconografía

### Backend
- **Express.js** con TypeScript
- **In-memory storage** para persistencia de datos
- **Zod** para validación de schemas

### Diseño
- Paleta de colores institucional (azules, blancos, grises)
- Tipografía: Open Sans (body), Encode Sans (headings)
- Diseño completamente responsivo
- Inspirado en argentina.gob.ar

## Estructura del Proyecto

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas de la aplicación
│   │   └── lib/           # Utilidades y configuración
├── server/                # Backend Express
│   ├── routes.ts         # Definición de rutas API
│   └── storage.ts        # Capa de persistencia
├── shared/               # Código compartido
│   └── schema.ts         # Schemas y tipos
└── design_guidelines.md  # Guía de diseño
```

## API Endpoints

### Jobs
- `GET /api/jobs` - Obtener todos los empleos (con filtros opcionales)
- `GET /api/jobs/:id` - Obtener un empleo específico
- `POST /api/jobs` - Crear nueva oferta de empleo

### CVs
- `GET /api/cvs` - Obtener todos los CVs
- `POST /api/cvs` - Subir nuevo CV

### Contacto
- `POST /api/contact` - Enviar mensaje de contacto

## Datos de Ejemplo

El sistema incluye 10 ofertas de empleo de ejemplo en diferentes especialidades:
- Programación (4 ofertas)
- Redes (2 ofertas)
- Soporte técnico (1 oferta)
- Diseño web (1 oferta)
- Electrónica (1 oferta)
- Mecánica (1 oferta)

## Próximas Fases (No implementadas)

1. **Portal para empresas** - Registro y publicación autónoma de ofertas
2. **Sistema de postulación** - Seguimiento de aplicaciones
3. **Blog laboral** - Artículos y consejos
4. **Accesibilidad mejorada** - Modo alto contraste, ajuste de texto
5. **Autenticación** - Login para estudiantes y empresas

## Notas de Desarrollo

- El diseño sigue estrictamente las guías de diseño universal establecidas
- Todos los componentes interactivos tienen `data-testid` para testing
- La aplicación es completamente funcional con datos en memoria
- El sistema de filtros funciona en tiempo real
- Los formularios tienen validación completa

## Créditos

© 2025 - Desarrollado por los estudiantes de 6to Informática de la EEST N°1 Otto Krause
