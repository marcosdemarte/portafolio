const fs = require("fs");
const path = require("path");

const projectRoot = process.env.INIT_CWD || path.resolve(__dirname, "../../..");
const targetDir = path.join(projectRoot, "public", "imagenes", "portafolio");
const sourceDir = path.join(__dirname, "..", "images");

if (fs.existsSync(sourceDir)) {
    try {
        // 1. Limpia y borra la carpeta destino previa para evitar archivos obsoletos
        if (fs.existsSync(targetDir)) {
            fs.rmSync(targetDir, { recursive: true, force: true });
        }

        // 2. Crea la carpeta de cero y copia todo limpio
        fs.mkdirSync(targetDir, { recursive: true });
        fs.cpSync(sourceDir, targetDir, { recursive: true });

        console.log("[@marcosdemarte/portafolio] Imágenes sincronizadas exitosamente en /public/imagenes/portafolio");
    } catch (err) {
        console.error("[@marcosdemarte/portafolio] Error al sincronizar imágenes:", err);
    }
}