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

## Requisitos del proyecto consumidor

- Next.js (App Router) >= 14, React >= 18, `next-intl` >= 3.
- `transpilePackages: ["@marcosdemarte/portafolio"]` en `next.config`
  (el paquete se distribuye como fuente TypeScript, no pre-compilado; este
  flag tambien es lo que le dice a Next que procese los imports de imagen
  del paquete, igual que si fueran parte de tu propio `src`).

```ts
// next.config.ts
const nextConfig: NextConfig = {
  transpilePackages: ["@marcosdemarte/portafolio"],
};
```

## Instalacion

Este paquete **no se publica en npm**, se instala directo desde el repo de
GitHub (privado) fijando un tag de version:

```bash
npm install github:marcosdemarte/portafolio#v1.0.0
```

Necesitas acceso de lectura al repo (`gh auth login` o credenciales git
configuradas) para poder instalarlo, tanto en tu maquina como en cualquier
entorno de build/deploy (ej. Vercel necesita un GitHub token con acceso al
repo configurado como variable de entorno para poder instalar esta
dependencia durante el build).

## 1. CSS

Copia `css/portafolio.css` de este repo a tu proyecto (ej.
`src/app/portafolio.css`) e importalo una vez donde importes tus otros
globales:

```ts
import "./portafolio.css";
```

Este CSS trae el look default funcionando, usando solo clases `pf-*` (no
depende de Tailwind ni pisa clases tuyas como `.margen1` o `.titulo`).

Para usar **otro** CSS (mismo set de clases `pf-*`, look distinto), pasale
la ruta al componente con `cssHref`. Se inyecta ademas del CSS default, asi
que solo necesitas sobreescribir lo que quieras cambiar:

```tsx
<Portafolio cssHref="/portafolio-tema-oscuro.css" />
```

## 2. Traducciones

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

## 3. Uso

```tsx
import { Portafolio } from "@marcosdemarte/portafolio";

<Portafolio namespace="portafolio" />;
```

Props (todas opcionales):

| Prop | Default | Descripcion |
| --- | --- | --- |
| `namespace` | `"portafolio"` | Namespace de next-intl con las claves del portafolio |
| `cssHref` | - | Hoja de estilos alternativa (mismas clases `pf-*`) |
| `sectionId` | `"portafolio"` | id del `<section>` para anclas de navegacion |
| `excludeKeys` | `["2"]` | Keys del catalogo interno a excluir (hay un duplicado interno con key `"2"`) |

## Actualizar

Cambia el tag en el `package.json` del proyecto consumidor y reinstala:

```json
"@marcosdemarte/portafolio": "github:marcosdemarte/portafolio#v1.1.0"
```

```bash
npm install
```

## Publicar una nueva version (mantenedor)

```bash
git commit -am "..."
git tag -a v1.1.0 -m "v1.1.0"
git push && git push --tags
```

Despues, actualiza el tag en el `package.json` de cada proyecto consumidor
(powerbits.net y marcosbrandolin.vercel.app) y corre `npm install` en cada
uno.
