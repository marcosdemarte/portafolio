export type PortafolioTranslate = (key: string) => string;

export interface PortafolioItem {
  titulo: string;
  url: string;
  descripcion: string;
  demo?: {
    url?: string;
    descripcion: string;
  };
  imagenes: {
    carpeta: string;
    portada: string;
    galeria: string[];
    videos?: string[];
  };
  fechaIgnaguracion: string;
  version: string;
}

/**
 * Datos de los proyectos del portafolio. Los textos (titulo/descripcion) se
 * resuelven via `t`, que debe apuntar al namespace de i18n que expone las
 * claves `title`, `date`, `version` y `projects.<key>.title` / `.description`
 * (ver README para el shape completo esperado).
 */
export function getPortafolioProjects(
  t: PortafolioTranslate,
): Record<string, PortafolioItem> {
  return {
    "1": {
      titulo: t("projects.umbra.title"),
      url: "https://youtu.be/_T65x-3Bv38",
      descripcion: t("projects.bicicletaselectricas.description"),
      imagenes: {
        carpeta: "umbra",
        portada: "umbra1.jpg",
        galeria: ["umbra.jpg", "umbra1.jpg"],
        videos: ["https://youtu.be/_T65x-3Bv38"],
      },
      fechaIgnaguracion: "08/08/2008",
      version: "1.0",
    },
    "2": {
      titulo: t("projects.animacion3d.title"),
      url: "https://www.bicicletaselectricas.com.ar/",
      descripcion: t("projects.bicicletaselectricas.description"),
      imagenes: {
        carpeta: "bicicletaselectricas",
        portada: "bicicletaselectricas2.jpg",
        galeria: ["bicicletaselectricas2.jpg"],
      },
      fechaIgnaguracion: "08/10/2025",
      version: "1.0",
    },
    "3": {
      titulo: t("projects.tiendabrando.title"),
      url: "https://www.tiendabrando.com.ar/",
      descripcion: t("projects.tiendabrando.description"),
      imagenes: {
        carpeta: "tiendabrando",
        portada: "tiendabrando4.jpg",
        galeria: [
          "tiendabrando1.jpg",
          "tiendabrando2.jpg",
          "tiendabrando3.jpg",
          "tiendabrando4.jpg",
          "tiendabrando5.jpg",
          "tiendabrando6.jpg",
          "tiendabrando7.jpg",
          "tiendabrando8.jpg",
          "tiendabrando9.jpg",
          "tiendabrando10.jpg",
        ],
      },
      fechaIgnaguracion: "05/11/2025",
      version: "2.01",
    },
    "4": {
      titulo: t("projects.powerbit.title"),
      url: "https://powerbit.com.ar/",
      descripcion: t("projects.powerbit.description"),
      imagenes: {
        carpeta: "powerbit",
        portada: "powerbit1.jpg",
        galeria: [
          "powerbit1.jpg",
          "powerbit2.jpg",
          "powerbit3.jpg",
          "powerbit4.jpg",
          "powerbit5.jpg",
        ],
        videos: ["https://www.youtube.com/shorts/39PgS02EHYw"],
      },
      fechaIgnaguracion: "15/12/2023",
      version: "2.3",
    },
    "5": {
      titulo: t("projects.elcazadorgym.title"),
      url: "https://www.elcazadorgym.com.ar/fitnesscontrol/",
      demo: {
        descripcion: `<p class="pf-bold">${t("projects.elcazadorgym.subtitle")}:</p><div class="pf-leading-tight">${t("projects.elcazadorgym.dni")}: 11222333 <br> ${t("projects.elcazadorgym.password")}: at4sk6</div>`,
      },
      descripcion: t("projects.elcazadorgym.description"),
      imagenes: {
        carpeta: "elcazadorgym",
        portada: "elcazadorgym1.jpg",
        galeria: [
          "elcazadorgym1.jpg",
          "elcazadorgym2.jpg",
          "elcazadorgym3.jpg",
          "elcazadorgym4.jpg",
          "elcazadorgym5.jpg",
          "elcazadorgym6.jpg",
        ],
      },
      fechaIgnaguracion: "26/03/2026",
      version: "1.14",
    },
    "6": {
      titulo: t("projects.marcosbrandolinportafolio.title"),
      url: "https://marcosbrandolin.vercel.app/",
      descripcion: t("projects.marcosbrandolinportafolio.description"),
      imagenes: {
        carpeta: "marcos-brandolin-portafolio",
        portada: "marcosbrandolin-portafolio.jpg",
        galeria: ["marcosbrandolin-portafolio.jpg"],
      },
      fechaIgnaguracion: "29/03/2026",
      version: "1.1",
    },
    "7": {
      titulo: t("projects.juegounirverso.title"),
      url: "https://juego-jurasico.vercel.app/",
      descripcion: t("projects.juegounirverso.description"),
      imagenes: {
        carpeta: "juego-jurasico",
        portada: "juego-jurasico1.jpg",
        galeria: ["juego-jurasico1.jpg"],
      },
      fechaIgnaguracion: "17/12/2025",
      version: "1.2",
    },
    "8": {
      titulo: t("projects.bicicletaselectricas.title"),
      url: "https://www.bicicletaselectricas.com.ar/",
      descripcion: t("projects.bicicletaselectricas.description"),
      imagenes: {
        carpeta: "bicicletaselectricas",
        portada: "bicicletaselectricas2.jpg",
        galeria: [
          "bicicletaselectricas2.jpg",
          "bicicletaselectricas3.jpg",
          "bicicletaselectricas4.jpg",
          "bicicletaselectricas5.jpg",
          "bicicletaselectricas6.jpg",
          "bicicletaselectricas7.jpg",
          "bicicletaselectricas8.jpg",
        ],
      },
      fechaIgnaguracion: "08/10/2025",
      version: "1.0",
    },
    "9": {
      titulo: t("projects.picnic.title"),
      url: "https://www.instagram.com/reel/DWB8mOMEfYT/",
      descripcion: t("projects.picnic.description"),
      imagenes: {
        carpeta: "picnic",
        portada: "picnic.jpg",
        galeria: ["picnic.jpg"],
        videos: ["https://www.youtube.com/shorts/KSsm89AMlBc"],
      },
      fechaIgnaguracion: "18/03/2026",
      version: "1.0",
    },
  };
}
