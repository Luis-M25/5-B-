import { generarRecomendaciones } from "./services/recomendacion.service";

async function main() {
  const usuarioId = 1; // ID del usuario para el que deseas generar recomendaciones
  try {
    const recomendacion = await generarRecomendaciones(usuarioId);

    console.log("Recomendación generada:\n", JSON.stringify(recomendacion, null, 2));
  } catch (error) {
    console.error("Error al generar la recomendación:", error);
  }
}

main();
