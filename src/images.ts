// src/images.ts

// Mapa de imágenes organizado por carpetas (equivalente a un JSON interno)
const MANIFESTO_IMAGENES: Record<string, string[]> = {
  "bicicletaselectricas": [
    "bicicletaselectricas1.jpg",
    "bicicletaselectricas2.jpg",
    "bicicletaselectricas3.jpg",
    "bicicletaselectricas4.jpg",
    "bicicletaselectricas5.jpg",
    "bicicletaselectricas6.jpg",
    "bicicletaselectricas7.jpg",
    "bicicletaselectricas8.jpg",
  ],
  "elcazadorgym": [
    "elcazadorgym1.jpg",
    "elcazadorgym2.jpg",
    "elcazadorgym3.jpg",
    "elcazadorgym4.jpg",
    "elcazadorgym5.jpg",
    "elcazadorgym6.jpg",
  ],
  "juego-jurasico": [
    "juego-jurasico1.jpg",
  ],
  "marcos-brandolin-portafolio": [
    "marcosbrandolin-portafolio.jpg",
  ],
  "picnic": [
    "picnic.jpg",
  ],
  "powerbit": [
    "powerbit1.jpg",
    "powerbit2.jpg",
    "powerbit3.jpg",
    "powerbit4.jpg",
    "powerbit5.jpg",
  ],
  "tiendabrando": [
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
  "umbra": [
    "umbra.jpg",
    "umbra1.jpg",
  ],
};

// Repositorio de recursos resueltos en tiempo de compilación
const IMAGES_CACHE: Record<string, string> = {};

// Carga automática y limpia basada en el manifiesto JSON interno
Object.entries(MANIFESTO_IMAGENES).forEach(([folder, files]) => {
  files.forEach((file) => {
    try {
      const img = require(`../images/${folder}/${file}`);
      IMAGES_CACHE[`${folder}/${file}`] = img.default || img;
    } catch (e) {
      console.warn(`[@marcosdemarte/portafolio] No se pudo cargar la imagen: ${folder}/${file}`);
    }
  });
});

/** Devuelve la URL final procesada por el bundler de una imagen empaquetada. */
export function getPortafolioImageSrc(carpeta: string, archivo: string): string {
  const key = `${carpeta}/${archivo}`;
  const src = IMAGES_CACHE[key];
  if (!src) {
    console.warn(`[@marcosdemarte/portafolio] Imagen no encontrada en caché: ${key}`);
    return "";
  }
  return src;
}