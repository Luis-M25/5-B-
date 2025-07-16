import { Schema, model } from 'mongoose';

const lugarTuristicoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  ubicacion: {
    type: String,
    required: [true, 'La ubicación es obligatoria'],
    trim: true
  },
  clima: {
    type: String,
    required: [true, 'El clima es obligatorio'],
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export const LugarTuristicoModel = model('LugarTuristico', lugarTuristicoSchema);
