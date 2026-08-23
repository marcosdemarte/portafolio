# @marcosdemarte/portafolio

Componente de portafolio (grilla de proyectos + galeria con lightbox y
videos de YouTube) para reutilizar entre sitios Next.js. Pensado para
`powerbits.net` y `marcosbrandolin.vercel.app`.

- El componente y las **imagenes** viven en el paquete: las imagenes se
  importan como assets estaticos (`import foo from "./img.jpg"`), asi que
  Next.js las procesa, hashea y sirve el mismo, sin copiarlas a `public/`
  ni necesitar una ruta propia.
- El **CSS no viaja en el paquete**: se copia (`css/portafolio.css`) dentro
  de cada proyecto consumidor, que lo importa como un CSS mas propio.
- Los **textos** se resuelven con `next-intl` (`useTranslations`), con el
  namespace configurable para no chocar con las claves que ya tenga cada
  proyecto.
- Este paquete **no se publica en npm**: se instala directo desde este repo
  de GitHub (publico) fijando un tag de version.

---

## Instalar en un proyecto nuevo

1. **Instalar el paquete**, fijando el ultimo tag (ver [releases del
   repo](https://github.com/marcosdemarte/portafolio/tags)):

   ```bash
   npm install github:marcosdemarte/portafolio#v1.0.4
   ```

2. **Habilitar `transpilePackages`** en `next.config` (el paquete se
   distribuye como fuente TypeScript sin compilar; esto tambien hace que
   Next procese los imports de imagen del paquete):

   ```ts
   // next.config.ts
   const nextConfig: NextConfig = {
     transpilePackages: ["@marcosdemarte/portafolio"],
   };
   ```

3. **Copiar el CSS default** de este repo (`css/portafolio.css`) a tu
   proyecto (ej. `src/app/portafolio.css`) e importalo una vez, junto con
   tus otros globales:

   ```ts
   import "./portafolio.css";
   ```

4. **Agregar las traducciones** que el componente necesita, en el
   namespace de next-intl que prefieras (ver forma exacta en
   [Traducciones](#traducciones) mas abajo).

5. **Usar el componente**:

   ```tsx
   import { Portafolio } from "@marcosdemarte/portafolio";

   <Portafolio namespace="portafolio" />;
   ```

Al ser un repo publico, el paso 1 no necesita ningun token ni configuracion
especial, ni en tu maquina ni en el build de Vercel u otro entorno de
deploy.

## Actualizar el paquete en un proyecto que ya lo usa

1. Mira que tags existen: https://github.com/marcosdemarte/portafolio/tags
2. Cambia el tag en el `package.json` del proyecto:

   ```json
   "@marcosdemarte/portafolio": "github:marcosdemarte/portafolio#v1.1.0"
   ```

3. Reinstala:

   ```bash
   npm install
   ```

   Si el proyecto no detecta el cambio (npm a veces cachea el contenido de
   una dependencia git), borra la carpeta antes de instalar:

   ```bash
   rm -rf node_modules/@marcosdemarte/portafolio
   npm install
   ```

4. **Revisa el CHANGELOG del repo** (o el mensaje del commit/tag) por si la
   nueva version toco `css/portafolio.css` — en ese caso hay que volver a
   copiar el archivo actualizado a tu proyecto (paso 3 de instalacion), ya
   que el CSS no se actualiza solo al hacer `npm install` (no vive en el
   paquete).
5. Si estabas en desarrollo (`npm run dev`), reiniciá el servidor: Next no
   siempre re-detecta cambios dentro de una dependencia reinstalada en
   `node_modules` en caliente.

## Publicar un cambio del paquete (mantenedor)

1. Hacé los cambios en `src/` y/o `css/portafolio.css` dentro de este repo
   (`X:\Servidor\PortafolioPackage`).
2. Commiteá y taguea una nueva version (semver, sin saltar de mas):

   ```bash
   git add -A
   git commit -m "..."
   git tag -a v1.1.0 -m "v1.1.0: descripcion corta del cambio"
   git push
   git push origin v1.1.0
   ```

3. En **cada proyecto consumidor** (powerbits.net y
   marcosbrandolin.vercel.app), seguí los pasos de
   [Actualizar el paquete](#actualizar-el-paquete-en-un-proyecto-que-ya-lo-usa)
   para apuntar al tag nuevo — actualizar el repo del paquete solo no alcanza,
   cada proyecto tiene que reinstalar explicitamente.

---

## Traducciones

El componente espera un namespace de next-intl con esta forma (podes
llamarlo como quieras y pasarselo por prop `namespace`, incluso anidado
tipo `"home.portfolio"`):

```json
{
  "title": "Portfolio",
  "date": "Last updated",
  "version": "Version",
  "projects": {
    "tiendabrando": { "title": "...", "description": "..." },
    "powerbit": { "title": "...", "description": "..." },
    "elcazadorgym": { "title": "...", "description": "...", "subtitle": "...", "dni": "DNI", "password": "Password" },
    "juegounirverso": { "title": "...", "description": "..." },
    "bicicletaselectricas": { "title": "...", "description": "..." },
    "marcosbrandolinportafolio": { "title": "...", "description": "..." },
    "picnic": { "title": "...", "description": "..." },
    "umbra": { "title": "...", "description": "..." },
    "animacion3d": { "title": "...", "description": "..." }
  }
}
```

## CSS: tematizar

Este CSS trae el look default funcionando, usando solo clases `pf-*` (no
depende de Tailwind ni pisa clases tuyas como `.margen1` o `.titulo`).
Incluye tema oscuro via la convencion `.dark <selector>` (la misma que usa
`next-themes` con `attribute="class"` en powerbits.net): si tu proyecto
nunca agrega una clase `.dark` en un ancestro, el componente se queda en
tema claro siempre.

Para usar **otro** CSS (mismo set de clases `pf-*`, look distinto), pasale
la ruta al componente con `cssHref`. Se inyecta ademas del CSS default, asi
que solo necesitas sobreescribir lo que quieras cambiar:

```tsx
<Portafolio cssHref="/portafolio-tema-oscuro.css" />
```

## Props

Todas opcionales:

| Prop | Default | Descripcion |
| --- | --- | --- |
| `namespace` | `"portafolio"` | Namespace de next-intl con las claves del portafolio |
| `cssHref` | - | Hoja de estilos alternativa (mismas clases `pf-*`) |
| `sectionId` | `"portafolio"` | id del `<section>` para anclas de navegacion |
| `excludeKeys` | `["2"]` | Keys del catalogo interno a excluir (hay un duplicado interno con key `"2"`) |
