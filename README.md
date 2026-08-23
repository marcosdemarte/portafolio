# @marcosdemarte/portafolio

Componente de portafolio (grilla de proyectos + galeria con lightbox y
videos de YouTube) para reutilizar entre sitios Next.js. Pensado para
`powerbits.net` y `marcosbrandolin.vercel.app`.

- El componente y las **imagenes** viven en el paquete.
- El **CSS no viaja en el paquete**: se copia (`css/portafolio.css`) dentro
  de cada proyecto consumidor, que lo importa como un CSS mas propio.
- Los **textos** se resuelven con `next-intl` (`useTranslations`), con el
  namespace configurable para no chocar con las claves que ya tenga cada
  proyecto.

## Requisitos del proyecto consumidor

- Next.js (App Router) >= 14, React >= 18, `next-intl` >= 3.
- `transpilePackages: ["@marcosdemarte/portafolio"]` en `next.config`
  (el paquete se distribuye como fuente TypeScript, no pre-compilado).

```ts
// next.config.ts
const nextConfig: NextConfig = {
  transpilePackages: ["@marcosdemarte/portafolio"],
  // en deploys serverless (Vercel), asegura que las imagenes empaquetadas
  // se incluyan en el bundle del route handler que las sirve:
  outputFileTracingIncludes: {
    "/imagenes/portafolio/**": ["./node_modules/@marcosdemarte/portafolio/images/**"],
  },
};
```

## Instalacion

```bash
npm install @marcosdemarte/portafolio
```

## 1. Ruta que sirve las imagenes empaquetadas

Las imagenes no se copian a `public/`: se leen directo desde el paquete via
un Route Handler chico que vos agregas en tu proyecto (fuera de `[locale]`,
para que el middleware de next-intl no la intercepte):

```ts
// src/app/imagenes/portafolio/[...path]/route.ts
import { readPortafolioImage } from "@marcosdemarte/portafolio";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  const image = await readPortafolioImage(segments);
  if (!image) return new Response("Not found", { status: 404 });

  return new Response(image.buffer, {
    headers: {
      "Content-Type": image.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
```

## 2. CSS

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

## 3. Traducciones

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

## 4. Uso

```tsx
import { Portafolio } from "@marcosdemarte/portafolio";

<Portafolio namespace="portafolio" />;
```

Props (todas opcionales):

| Prop | Default | Descripcion |
| --- | --- | --- |
| `namespace` | `"portafolio"` | Namespace de next-intl con las claves del portafolio |
| `imageBasePath` | `"/imagenes/portafolio"` | Prefijo del route handler que sirve las imagenes |
| `cssHref` | - | Hoja de estilos alternativa (mismas clases `pf-*`) |
| `sectionId` | `"portafolio"` | id del `<section>` para anclas de navegacion |
| `excludeKeys` | `["2"]` | Keys del catalogo interno a excluir (hay un duplicado interno con key `"2"`) |

## Actualizar

```bash
npm install @marcosdemarte/portafolio@latest
```

## Publicar una nueva version (mantenedor)

```bash
npm version patch   # o minor/major
npm publish --access public
git push && git push --tags
```

(`--access public`: los paquetes con scope, como `@marcosdemarte/...`, son
privados por defecto en npm y requieren un plan pago para publicarse
privados. Igual que `@marcosdemarte/lista-de-tareas`, este paquete se
publica publico en el registry aunque el repo de GitHub sea privado.)
