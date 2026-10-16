// src/images.ts

const IMAGES: Record<string, string> = {};

/**
 * Registra los recursos de una carpeta iterando una sola vez sobre los nombres de archivo.
 */
function registerFolder(folder: string, files: string[]) {
  files.forEach((file) => {
    try {
      // Carga dinámica estática compatible con Webpack / Turbopack
      const img = require(`../images/${folder}/${file}`);
      IMAGES[`${folder}/${file}`] = img.default || img;
    } catch (e) {
      console.warn(`[@marcosdemarte/portafolio] No se pudo cargar la imagen: ${folder}/${file}`);
    }
  });
}

// Cada nombre de archivo se declara UNA sola vez aquí:
registerFolder("bicicletaselectricas", [
  "bicicletaselectricas1.jpg",
  "bicicletaselectricas2.jpg",
  "bicicletaselectricas3.jpg",
  "bicicletaselectricas4.jpg",
  "bicicletaselectricas5.jpg",
  "bicicletaselectricas6.jpg",
  "bicicletaselectricas7.jpg",
  "bicicletaselectricas8.jpg",
]);

registerFolder("elcazadorgym", [
  "elcazadorgym1.jpg",
  "elcazadorgym2.jpg",
  "elcazadorgym3.jpg",
  "elcazadorgym4.jpg",
  "elcazadorgym5.jpg",
  "elcazadorgym6.jpg",
]);

registerFolder("juego-jurasico", [
  "juego-jurasico1.jpg",
]);

registerFolder("marcos-brandolin-portafolio", [
  "marcosbrandolin-portafolio.jpg",
]);

registerFolder("picnic", [
  "picnic.jpg",
]);

registerFolder("powerbit", [
  "powerbit1.jpg",
  "powerbit2.jpg",
  "powerbit3.jpg",
  "powerbit4.jpg",
  "powerbit5.jpg",
]);

registerFolder("tiendabrando", [
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
]);

registerFolder("umbra", [
  "umbra.jpg",
  "umbra1.jpg",
]);

/** Devuelve la URL final (procesada por el bundler) de una imagen empaquetada. */
export function getPortafolioImageSrc(carpeta: string, archivo: string): string {
  const key = `${carpeta}/${archivo}`;
  const src = IMAGES[key];
  if (!src) {
    console.warn(`[@marcosdemarte/portafolio] Imagen no encontrada: ${key}`);
    return "";
  }
  return src;
}