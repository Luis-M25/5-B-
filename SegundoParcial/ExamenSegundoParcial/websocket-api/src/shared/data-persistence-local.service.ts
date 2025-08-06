import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DataPersistenceServiceLocal {
  private data: any;
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(__dirname, '../../../data.json');
    this.loadData();
  }

  private loadData(): void {
    try {
      const rawData = fs.readFileSync(this.dataPath, 'utf8');
      this.data = JSON.parse(rawData);
    } catch (error) {
      console.error('Error cargando datos:', error);
      this.data = {
        formasPago: [],
        clientes: [],
        ventas: []
      };
    }
  }

  async getAllFormasPago(): Promise<any[]> {
    return this.data.formasPago || [];
  }

  async getAllClientes(): Promise<any[]> {
    return this.data.clientes || [];
  }

  async createVenta(ventaData: any): Promise<any> {
    const venta = {
      ...ventaData,
      id: `venta_${Date.now()}`,
      fechaCreacion: new Date(),
      estado: 'completada'
    };
    
    if (!this.data.ventas) {
      this.data.ventas = [];
    }
    
    this.data.ventas.push(venta);
    this.saveData();
    return venta;
  }

  private saveData(): void {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error('Error guardando datos:', error);
    }
  }
}
