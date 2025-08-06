import { IPreferencias } from "../interfaces/IPreferencias";

export function obtenerPreferencias(usuarioId: number): Promise<IPreferencias> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ usuarioId, gustos: ["aventura", "playa"] });
    }, 1000);
  });
}