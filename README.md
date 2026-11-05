# Blog académico — Gestión de Proyectos · Grupo 6

Primera versión de un blog académico construido con **React + Vite**. El contenido inicial está organizado a partir del archivo `Taller Gestion de Proyectos grupo 6.docx`.

## Qué incluye

- Portada editorial y navegación adaptable a computador, tableta y celular.
- Sección de roles: Product Owner, Scrum Master y Equipo de Desarrollo.
- Sección de conceptos: Sprint, Product Backlog, Sprint Backlog e Incremento.
- Sección independiente para Daily Scrum.
- Información académica del Grupo 6.
- Búsqueda de roles y conceptos.
- Tarjetas desplegables para consultar las definiciones completas.
- Alternancia entre tema claro y oscuro.
- Área preparada para incorporar nuevas actividades del curso.

## Requisitos

- Node.js **20.19 o superior** (o una versión 22.12 o superior).
- npm, que se instala junto con Node.js.

Comprueba que estén instalados:

```bash
node -v
npm -v
```

## Ejecutar en tu computador

1. Descarga y extrae el ZIP.
2. Abre la carpeta `blog-gestion-proyectos` en Visual Studio Code.
3. Abre una terminal dentro de esa carpeta.
4. Instala las dependencias:

```bash
npm install
```

5. Inicia el servidor local:

```bash
npm run dev
```

6. Abre en el navegador la dirección que muestre Vite, normalmente:

```text
http://localhost:5173
```

Para detener el servidor, vuelve a la terminal y presiona `Ctrl + C`.

## Comprobar la versión de producción

Antes de publicar, ejecuta:

```bash
npm run build
```

Vite generará la carpeta `dist`. Puedes revisar esa versión localmente con:

```bash
npm run preview
```

## Publicar en Vercel usando GitHub

### A. Subir el proyecto a GitHub

1. Crea un repositorio nuevo en [GitHub](https://github.com/new), por ejemplo `blog-gestion-proyectos-grupo-6`.
2. Deja el repositorio vacío (no agregues README, licencia ni `.gitignore`, porque ya vienen en este proyecto).
3. Abre una terminal dentro de la carpeta del proyecto extraído y ejecuta:

```bash
git init
git add .
git commit -m "Primera version del blog de Gestion de Proyectos"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/blog-gestion-proyectos-grupo-6.git
git push -u origin main
```

4. Sustituye `TU-USUARIO` por tu usuario real de GitHub. Si el repositorio tiene otro nombre, ajusta también la URL.

### B. Importar el repositorio en Vercel

1. Entra a [Vercel](https://vercel.com/) e inicia sesión.
2. Selecciona **Add New → Project** (o **New Project**).
3. Conecta GitHub si Vercel te lo solicita.
4. Busca el repositorio `blog-gestion-proyectos-grupo-6` y selecciona **Import**.
5. Revisa la configuración del proyecto:
   - Framework Preset: **Vite**.
   - Build Command: `npm run build`.
   - Output Directory: `dist`.
   - Install Command: `npm install`.
6. Haz clic en **Deploy**.
7. Cuando termine la compilación, Vercel mostrará la URL pública del blog.

El archivo `vercel.json` incluido deja indicados el framework, el comando de compilación y la carpeta de salida. Vercel normalmente también detecta la configuración de Vite automáticamente.

## Publicar cambios posteriores

Cuando agregues actividades o modifiques el diseño:

```bash
git add .
git commit -m "Actualiza contenido del blog"
git push
```

Si el repositorio sigue conectado a Vercel, el nuevo `push` iniciará una implementación automáticamente.

## Dónde ampliar el contenido

El contenido principal está centralizado en `src/App.jsx`:

- El arreglo `roles` contiene los tres roles iniciales.
- El arreglo `concepts` contiene los conceptos del taller.
- El arreglo `sections` controla la navegación principal.
- Los componentes `HomePage`, `RolesPage`, `ConceptsPage`, `DailyPage` y `GroupPage` organizan las vistas.

Para una actividad nueva, se puede crear una nueva sección y agregarla a `sections`, además de su componente de página. Los estilos generales están en `src/styles.css`.

## Estructura del proyecto

```text
blog-gestion-proyectos/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    └── styles.css
```

## Nota sobre el contenido

Los roles y las definiciones de Sprint, Product Backlog, Sprint Backlog, Incremento y Daily Scrum se basan en el taller entregado. La introducción y los textos de navegación son elementos editoriales para presentar el material como blog. No se añadieron referencias bibliográficas externas que no estuvieran incluidas en el documento base.
