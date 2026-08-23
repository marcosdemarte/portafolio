import img1 from "../images/bicicletaselectricas/bicicletaselectricas1.jpg";
import img2 from "../images/bicicletaselectricas/bicicletaselectricas2.jpg";
import img3 from "../images/bicicletaselectricas/bicicletaselectricas3.jpg";
import img4 from "../images/bicicletaselectricas/bicicletaselectricas4.jpg";
import img5 from "../images/bicicletaselectricas/bicicletaselectricas5.jpg";
import img6 from "../images/bicicletaselectricas/bicicletaselectricas6.jpg";
import img7 from "../images/bicicletaselectricas/bicicletaselectricas7.jpg";
import img8 from "../images/bicicletaselectricas/bicicletaselectricas8.jpg";
import img9 from "../images/elcazadorgym/elcazadorgym1.jpg";
import img10 from "../images/elcazadorgym/elcazadorgym2.jpg";
import img11 from "../images/elcazadorgym/elcazadorgym3.jpg";
import img12 from "../images/elcazadorgym/elcazadorgym4.jpg";
import img13 from "../images/elcazadorgym/elcazadorgym5.jpg";
import img14 from "../images/elcazadorgym/elcazadorgym6.jpg";
import img15 from "../images/juego-jurasico/1.png";
import img16 from "../images/juego-jurasico/2.png";
import img17 from "../images/juego-jurasico/juego-jurasico1.jpg";
import img18 from "../images/juego-jurasico/powerbit1.jpg";
import img19 from "../images/marcos-brandolin-portafolio/marcosbrandolin-portafolio.jpg";
import img20 from "../images/picnic/picnic.jpg";
import img21 from "../images/powerbit/powerbit1.jpg";
import img22 from "../images/powerbit/powerbit2.jpg";
import img23 from "../images/powerbit/powerbit3.jpg";
import img24 from "../images/powerbit/powerbit4.jpg";
import img25 from "../images/powerbit/powerbit5.jpg";
import img26 from "../images/tiendabrando/tiendabrando1.jpg";
import img27 from "../images/tiendabrando/tiendabrando10.jpg";
import img28 from "../images/tiendabrando/tiendabrando2.jpg";
import img29 from "../images/tiendabrando/tiendabrando3.jpg";
import img30 from "../images/tiendabrando/tiendabrando4.jpg";
import img31 from "../images/tiendabrando/tiendabrando5.jpg";
import img32 from "../images/tiendabrando/tiendabrando6.jpg";
import img33 from "../images/tiendabrando/tiendabrando7.jpg";
import img34 from "../images/tiendabrando/tiendabrando8.jpg";
import img35 from "../images/tiendabrando/tiendabrando9.jpg";
import img36 from "../images/umbra/umbra.jpg";
import img37 from "../images/umbra/umbra1.jpg";

function resolveSrc(mod: unknown): string {
  if (typeof mod === "string") return mod;
  if (mod && typeof mod === "object" && "src" in mod) {
    return (mod as { src: string }).src;
  }
  return "";
}

const rawImages: Record<string, unknown> = {
  "bicicletaselectricas/bicicletaselectricas1.jpg": img1,
  "bicicletaselectricas/bicicletaselectricas2.jpg": img2,
  "bicicletaselectricas/bicicletaselectricas3.jpg": img3,
  "bicicletaselectricas/bicicletaselectricas4.jpg": img4,
  "bicicletaselectricas/bicicletaselectricas5.jpg": img5,
  "bicicletaselectricas/bicicletaselectricas6.jpg": img6,
  "bicicletaselectricas/bicicletaselectricas7.jpg": img7,
  "bicicletaselectricas/bicicletaselectricas8.jpg": img8,
  "elcazadorgym/elcazadorgym1.jpg": img9,
  "elcazadorgym/elcazadorgym2.jpg": img10,
  "elcazadorgym/elcazadorgym3.jpg": img11,
  "elcazadorgym/elcazadorgym4.jpg": img12,
  "elcazadorgym/elcazadorgym5.jpg": img13,
  "elcazadorgym/elcazadorgym6.jpg": img14,
  "juego-jurasico/1.png": img15,
  "juego-jurasico/2.png": img16,
  "juego-jurasico/juego-jurasico1.jpg": img17,
  "juego-jurasico/powerbit1.jpg": img18,
  "marcos-brandolin-portafolio/marcosbrandolin-portafolio.jpg": img19,
  "picnic/picnic.jpg": img20,
  "powerbit/powerbit1.jpg": img21,
  "powerbit/powerbit2.jpg": img22,
  "powerbit/powerbit3.jpg": img23,
  "powerbit/powerbit4.jpg": img24,
  "powerbit/powerbit5.jpg": img25,
  "tiendabrando/tiendabrando1.jpg": img26,
  "tiendabrando/tiendabrando10.jpg": img27,
  "tiendabrando/tiendabrando2.jpg": img28,
  "tiendabrando/tiendabrando3.jpg": img29,
  "tiendabrando/tiendabrando4.jpg": img30,
  "tiendabrando/tiendabrando5.jpg": img31,
  "tiendabrando/tiendabrando6.jpg": img32,
  "tiendabrando/tiendabrando7.jpg": img33,
  "tiendabrando/tiendabrando8.jpg": img34,
  "tiendabrando/tiendabrando9.jpg": img35,
  "umbra/umbra.jpg": img36,
  "umbra/umbra1.jpg": img37,
};

const IMAGES: Record<string, string> = Object.fromEntries(
  Object.entries(rawImages).map(([key, mod]) => [key, resolveSrc(mod)]),
);

/** Devuelve la URL final (procesada por el bundler) de una imagen empaquetada. */
export function getPortafolioImageSrc(carpeta: string, archivo: string): string {
  const key = `${carpeta}/${archivo}`;
  const src = IMAGES[key];
  if (!src) {
    console.warn(`[@marcosdemarte/portafolio] imagen no encontrada: ${key}`);
    return "";
  }
  return src;
}
