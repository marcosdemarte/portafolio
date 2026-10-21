"use client";
import YouTube, { YouTubeProps } from "react-youtube";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getPortafolioProjects, Idioma } from "./data";
import locales from "./locales.json";

/**
 * CSS del componente, incluido en el propio paquete (CSS puro, sin Tailwind
 * ni archivos externos). Todas las clases usan el prefijo `pf-` para no
 * chocar con las del proyecto que lo instala. Tema oscuro via `.dark`.
 */
const portafolioCss = `
  .pf-container {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
  }

  .pf-list {
    display: flex;
    flex-direction: column;
  }

  .pf-item {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.75rem;
    padding: 4rem 0;
    text-align: center;
    border-bottom: 1px solid #a0a0a0;
  }

  .dark .pf-item {
    border-bottom-color: #27272a;
  }

  .pf-item:first-child {
    padding-top: 0;
  }

  .pf-item:last-child {
    border-bottom: none;
  }

  .pf-item-text {
    order: 2;
  }

  .pf-item-media {
    order: 1;
  }

  @media (min-width: 1024px) {
    .pf-item {
      grid-template-columns: repeat(12, minmax(0, 1fr));
      padding: 5rem;
    }
    .pf-item-text {
      grid-column: span 6 / span 6;
      order: 1;
    }
    .pf-item-media {
      grid-column: span 6 / span 6;
      order: 2;
    }
  }

  .pf-item-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    color: #111827;
  }

  .dark .pf-item-title {
    color: #fff;
  }

  @media (min-width: 1024px) {
    .pf-item-title {
      font-size: 1.875rem;
    }
  }

  .pf-item-link {
    position: relative;
    top: -4px;
    font-size: 1rem;
    color: #274dd8;
    text-decoration-color: #274dd8;
  }

  .pf-item-link:hover {
    color: #1a35a0;
    text-decoration-color: #1a35a0;
  }

  .dark .pf-item-link {
    color: #6d8bf5;
    text-decoration-color: #6d8bf5;
  }

  .dark .pf-item-link:hover {
    color: #98aef8;
    text-decoration-color: #98aef8;
  }

  .pf-item-link-icon {
    margin-left: 0.25rem;
    font-size:1.4rem;
  }

  .pf-item-description {
    padding-top: 0.25rem;
    padding-bottom: 0.5rem;
  }

  .pf-item-demo {
    font-size: 0.875rem;
    padding-top: 0.5rem;
  }

  .pf-item-meta {
    margin: 0;
  }

  .pf-item-meta--first {
    padding-top: 0.5rem;
  }

  .pf-item-meta-label {
    font-weight: 700;
    display: block;
    color: #111827;
  }

  .dark .pf-item-meta-label {
    color: #fff;
  }

  @media (min-width: 768px) {
    .pf-item-meta-label {
      display: inline;
    }
  }

  .pf-item-image {
    display: block;
    width: 100%;
    object-fit: contain;
    cursor: pointer;
  }

  .pf-bold {
    font-weight: 700;
  }

  .pf-leading-tight {
    line-height: 1.25;
  }

  /* Lightbox */

  .pf-lightbox-image {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
  }

  .pf-lightbox-slide {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pf-lightbox-video {
    background: #000;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pf-lightbox-video-placeholder {
    background: #000;
    width: 100%;
    height: 100%;
  }

  .pf-lightbox-video-frame {
    width: 100%;
    height: 100%;
  }

  .pf-lightbox-counter {
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: auto;
    transform: none;
    z-index: 99999;
    color: #fff;
    font-size: 16px;
  }

  .pf-lightbox-counter--video {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }

  .pf-lightbox-close {
    position: fixed;
    top: 10px;
    right: 10px;
    left: auto;
    transform: none;
    z-index: 99999;
  }

  .pf-lightbox-close--video {
    top: 10px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
`;

export interface PortafolioProps {
  /** Idioma del portafolio: "es" | "en". Default: "es" */
  lenguaje?: Idioma;
  cssHref?: string;
  excludeKeys?: string[];
}

export const Portafolio = ({
  lenguaje = "es",
  cssHref,
  excludeKeys = ["2"],
}: PortafolioProps) => {
  const t = locales[lenguaje] || locales.es;
  const portafolio = getPortafolioProjects(lenguaje);

  const [open, setOpen] = useState(false);
  const [galeria, setGaleria] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [esVideo, setesVideo] = useState<string>("image");

  // Construye la ruta apuntando a public/imagenes/portafolio
  const getImageUrl = (carpeta: string, archivo: string) => {
    if (!carpeta || !archivo) return "";
    return `/imagenes/portafolio/${carpeta}/${archivo}`;
  };

  // Formateo exacto de fecha: es -> DD/MM/YYYY | en -> MM/DD/YYYY
  const formatearFecha = (fechaStr: string, lang: Idioma) => {
    if (!fechaStr) return "";
    const [dia, mes, anio] = fechaStr.split("/");
    if (lang === "en") {
      return `${mes}/${dia}/${anio}`;
    }
    return fechaStr;
  };

  function getYouTubeId(url: string) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const shortExp = /shorts\/([a-zA-Z0-9_-]{11})/;

    const match = url.match(regExp);
    const shortMatch = url.match(shortExp);

    if (shortMatch) return shortMatch[1];
    return match && match[7].length === 11 ? match[7] : null;
  }

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0 as 0 | 1,
      modestbranding: 1,
      rel: 0,
      controls: 1,
      fs: 1,
    },
  };

  const selectedGaleria = (key: string) => {
    const item = portafolio[key];

    const imagenesMapped = item.imagenes.galeria.map((imagen: string) => ({
      src: getImageUrl(item.imagenes.carpeta, imagen),
      type: "image" as const,
    }));

    const videosMapped = (item.imagenes.videos || []).map(
      (videoUrl: string) => ({
        src: videoUrl,
        type: "video" as const,
      }),
    );

    const combinados = [...imagenesMapped, ...videosMapped];

    setGaleria(combinados);
    setCurrentIndex(0);
    setOpen(true);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: portafolioCss }} />
      {cssHref && <link rel="stylesheet" href={cssHref} />}
      <div className="pf-container">
        <div className="pf-list">
          {Object.entries(portafolio)
            .reverse()
            .filter(([key]) => !excludeKeys.includes(key))
            .map(([key, item]) => (
              <div key={key} className="pf-item">
                <div className="pf-item-text">
                  <h2 className="pf-item-title">
                    {item.titulo}
                    <a
                      href={item.url}
                      target="_blank"
                      className="pf-item-link"
                      rel="noreferrer">
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        size="lg"
                        className="pf-item-link-icon"
                      />
                    </a>
                  </h2>
                  <div
                    className="pf-item-description"
                    dangerouslySetInnerHTML={{ __html: item.descripcion }}
                  />

                  {item.demo && (
                    <div className="pf-item-demo">
                      {item.demo.url && (
                        <a
                          href={item.demo.url}
                          target="_blank"
                          rel="noreferrer">
                          {item.demo.url}
                        </a>
                      )}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.demo.descripcion,
                        }}
                      />
                    </div>
                  )}
                  <p className="pf-item-meta pf-item-meta--first">
                    <span className="pf-item-meta-label">{t.date}:</span>{" "}
                    <span>
                      {formatearFecha(item.fechaIgnaguracion, lenguaje)}
                    </span>
                  </p>
                </div>
                <div className="pf-item-media">
                  <img
                    src={getImageUrl(
                      item.imagenes.carpeta,
                      item.imagenes.portada,
                    )}
                    alt={item.imagenes.galeria[0]}
                    className="pf-item-image"
                    onClick={() => {
                      selectedGaleria(key);
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={galeria}
        index={currentIndex}
        on={{
          view: ({ index }) => {
            setCurrentIndex(index);
            const slideActual = galeria[index];
            if (slideActual) {
              setesVideo(slideActual.type === "video" ? "video" : "image");
            }
          },
        }}
        toolbar={{
          buttons: [
            <div
              key="pf-lightbox-counter"
              className={
                esVideo === "video"
                  ? "pf-lightbox-counter pf-lightbox-counter--video"
                  : "pf-lightbox-counter"
              }>
              {currentIndex + 1} / {galeria.length}
            </div>,
            "close",
          ],
        }}
        render={{
          buttonClose: () => (
            <button
              key="pf-lightbox-close"
              type="button"
              onClick={() => setOpen(false)}
              className={
                esVideo === "video"
                  ? "yarl__button pf-lightbox-close pf-lightbox-close--video"
                  : "yarl__button pf-lightbox-close"
              }>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          ),
          slide: ({ slide }) => {
            const slideIndex = galeria.findIndex((s) => s.src === slide.src);
            const tipoSlide = slide.type as string;

            return (
              <div className="pf-lightbox-slide">
                {tipoSlide === "image" && (
                  <img src={slide.src} alt="" className="pf-lightbox-image" />
                )}

                {tipoSlide === "video" &&
                  (slideIndex === currentIndex ? (
                    <div className="pf-lightbox-video">
                      <YouTube
                        videoId={getYouTubeId(slide.src) ?? undefined}
                        opts={opts}
                        className="pf-lightbox-video-frame"
                      />
                    </div>
                  ) : (
                    <div className="pf-lightbox-video-placeholder" />
                  ))}
              </div>
            );
          },
        }}
        carousel={{
          finite: true,
          padding: "0px",
        }}
        plugins={[]}
      />
    </>
  );
};

{
  /*
  
  
            <p className="pf-item-meta">
                    <span className="pf-item-meta-label">{t.version}:</span>{" "}
                    {item.version}
                  </p>
                  
                  */
}
