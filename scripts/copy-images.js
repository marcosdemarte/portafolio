const fs = require("fs");
const path = path || require("path");

const projectRoot = process.env.INIT_CWD || path.resolve(__dirname, "../../..");
const targetDir = path.join(projectRoot, "public", "imagenes", "portafolio");
const sourceDir = path.join(__dirname, "..", "images");

if (fs.existsSync(sourceDir)) {
    try {
        // 1. Limpia y borra la carpeta destino por completo para evitar basura vieja
        if (fs.existsSync(targetDir)) {
            fs.rmSync(targetDir, { recursive: true, force: true });
        }

        // 2. Crea la carpeta de cero y copia todo limpio desde el paquete
        fs.mkdirSync(targetDir, { recursive: true });
        fs.cpSync(sourceDir, targetDir, { recursive: true });

        console.log("[@marcosdemarte/portafolio] Imágenes sincronizadas exitosamente en /public/imagenes/portafolio");
    } catch (err) {
        console.error("[@marcosdemarte/portafolio] Error al sincronizar imágenes:", err);
    }
}