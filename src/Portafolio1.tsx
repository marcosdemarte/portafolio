"use client";
import YouTube, { YouTubeProps } from "react-youtube";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getPortafolioProjects } from "./data";
import { getPortafolioImageSrc } from "./images";

export interface PortafolioProps {
  /**
   * Namespace de next-intl donde viven las claves del portafolio
   * (title, date, version, projects.*). Acepta namespaces anidados,
   * ej. "home.portfolio". Default: "portafolio".
   */
  namespace?: string;
  /**
   * Ruta a una hoja de estilos alternativa que reutiliza las mismas
   * clases `pf-*` que trae el CSS default. Si se pasa, se inyecta un
   * <link> adicional (no reemplaza el CSS default del proyecto).
   */
  cssHref?: string;
  /** id del <section>, para anclas de navegacion. Default: "portafolio". */
  sectionId?: string;
  /** Keys del catalogo interno a excluir (ej. duplicados). Default: ["2"]. */
  excludeKeys?: string[];
}

export const Portafolio = ({
  namespace = "portafolio",
  cssHref,
  sectionId = "portafolio",
  excludeKeys = ["2"],
}: PortafolioProps) => {
  // Función interna para satisfacer a getPortafolioProjects sin requerir next-intl externo
  const dummyTranslate = (key: string) => {
    const parts = key.split(".");
    return parts[parts.length - 1];
  };

  const portafolio = getPortafolioProjects(dummyTranslate);
  const [open, setOpen] = useState(false);
  const [galeria, setGaleria] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [esVideo, setesVideo] = useState<string>("image");

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
      src: getPortafolioImageSrc(item.imagenes.carpeta, imagen),
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
    <section className="pf-section" id={sectionId}>
      {cssHref && <link rel="stylesheet" href={cssHref} />}
      <div className="pf-container">
        <h1 className="pf-title">{t("title")}</h1>

        <div className="pf-list">
          {Object.entries(portafolio)
            .reverse()
            .filter(([key]) => !excludeKeys.includes(key))
            .map(([key, item]) => (
              <div key={key} className="pf-item">
                <div className="pf-item-text">
                  <h2 className="pf-item-title">
                    {item.titulo}
                    <a href={item.url} target="_blank" className="pf-item-link">
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
                        <a href={item.demo.url} target="_blank">
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
                    <span className="pf-item-meta-label">{t("date")}:</span>{" "}
                    <span>{item.fechaIgnaguracion}</span>
                  </p>
                  <p className="pf-item-meta">
                    <span className="pf-item-meta-label">{t("version")}:</span>{" "}
                    {item.version}
                  </p>
                </div>
                <div className="pf-item-media">
                  <img
                    src={getPortafolioImageSrc(
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
    </section>
  );
};
