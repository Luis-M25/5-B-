export class CreateValoracionDto {
  nombreUsuario: string;
  emailUsuario?: string;
  calificacion: number; // 1-5
  comentario?: string;
  fechaVisita: Date;
  lugarTuristicoId: number;
  activo?: boolean;
}
