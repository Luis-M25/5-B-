import * as fs from 'fs';
import * as path from 'path';
import { 
  Operador, 
  Surtidor, 
  TipoGasolina, 
  Precio, 
  FormaPago, 
  Cliente, 
  Venta,
  VentaFilter,
  SurtidorFilter,
  CalculoCosto,
  PaginatedResponse
} from './interfaces';

export class DataPersistenceService {
  private dataPath: string;
  private data: any;

  constructor(dataPath: string = path.join(__dirname, '..', 'data.json')) {
    this.dataPath = dataPath;
    this.loadData();
  }

  private loadData(): void {
    try {
      const rawData = fs.readFileSync(this.dataPath, 'utf8');
      this.data = JSON.parse(rawData);
    } catch (error) {
      console.error('Error cargando datos:', error);
      this.initializeEmptyData();
    }
  }

  private saveData(): void {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error('Error guardando datos:', error);
      throw new Error('No se pudieron guardar los datos');
    }
  }

  private initializeEmptyData(): void {
    this.data = {
      operadores: [],
      surtidores: [],
      tiposGasolina: [],
      precios: [],
      formasPago: [],
      clientes: [],
      ventas: [],
      configuracion: {}
    };
  }

  private generateId(prefix: string): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}_${timestamp}_${random}`;
  }

  // ========== OPERADORES ==========
  async getAllOperadores(): Promise<Operador[]> {
    return this.data.operadores || [];
  }

  async getOperadorById(id: string): Promise<Operador | null> {
    const operadores = await this.getAllOperadores();
    return operadores.find(op => op.id === id) || null;
  }

  async createOperador(operadorData: Omit<Operador, 'id'>): Promise<Operador> {
    const operador: Operador = {
      ...operadorData,
      id: this.generateId('op'),
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
    
    this.data.operadores.push(operador);
    this.saveData();
    return operador;
  }

  async updateOperador(id: string, updateData: Partial<Operador>): Promise<Operador | null> {
    const operadores = await this.getAllOperadores();
    const index = operadores.findIndex(op => op.id === id);
    
    if (index === -1) return null;
    
    this.data.operadores[index] = {
      ...this.data.operadores[index],
      ...updateData,
      fechaActualizacion: new Date()
    };
    
    this.saveData();
    return this.data.operadores[index];
  }

  async deleteOperador(id: string): Promise<boolean> {
    const operadores = await this.getAllOperadores();
    const index = operadores.findIndex(op => op.id === id);
    
    if (index === -1) return false;
    
    this.data.operadores.splice(index, 1);
    this.saveData();
    return true;
  }

  // ========== SURTIDORES ==========
  async getAllSurtidores(filter?: SurtidorFilter): Promise<Surtidor[]> {
    let surtidores = this.data.surtidores || [];
    
    if (filter) {
      if (filter.estado) {
        surtidores = surtidores.filter(s => s.estado === filter.estado);
      }
      if (filter.ubicacion) {
        surtidores = surtidores.filter(s => s.ubicacion?.toLowerCase().includes(filter.ubicacion!.toLowerCase()));
      }
      if (filter.tipoGasolina) {
        surtidores = surtidores.filter(s => s.tiposGasolinaDisponibles.includes(filter.tipoGasolina));
      }
    }
    
    return surtidores;
  }

  async getSurtidorById(id: string): Promise<Surtidor | null> {
    const surtidores = await this.getAllSurtidores();
    return surtidores.find(s => s.id === id) || null;
  }

  async createSurtidor(surtidorData: Omit<Surtidor, 'id'>): Promise<Surtidor> {
    const surtidor: Surtidor = {
      ...surtidorData,
      id: this.generateId('surt'),
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
    
    this.data.surtidores.push(surtidor);
    this.saveData();
    return surtidor;
  }

  async updateSurtidor(id: string, updateData: Partial<Surtidor>): Promise<Surtidor | null> {
    const surtidores = await this.getAllSurtidores();
    const index = surtidores.findIndex(s => s.id === id);
    
    if (index === -1) return null;
    
    this.data.surtidores[index] = {
      ...this.data.surtidores[index],
      ...updateData,
      fechaActualizacion: new Date()
    };
    
    this.saveData();
    return this.data.surtidores[index];
  }

  // ========== TIPOS DE GASOLINA ==========
  async getAllTiposGasolina(): Promise<TipoGasolina[]> {
    return this.data.tiposGasolina || [];
  }

  async getTipoGasolinaById(id: string): Promise<TipoGasolina | null> {
    const tipos = await this.getAllTiposGasolina();
    return tipos.find(t => t.id === id) || null;
  }

  async getTipoGasolinaByTipo(tipo: string): Promise<TipoGasolina | null> {
    const tipos = await this.getAllTiposGasolina();
    return tipos.find(t => t.tipo === tipo) || null;
  }

  // ========== PRECIOS ==========
  async getAllPrecios(): Promise<Precio[]> {
    return this.data.precios || [];
  }

  async getPrecioByTipoGasolina(tipoGasolina: string): Promise<Precio | null> {
    const precios = await this.getAllPrecios();
    return precios.find(p => p.tipoGasolina === tipoGasolina && p.activo) || null;
  }

  async updatePrecio(tipoGasolina: string, nuevoPrecio: number): Promise<Precio | null> {
    const precios = await this.getAllPrecios();
    const index = precios.findIndex(p => p.tipoGasolina === tipoGasolina && p.activo);
    
    if (index === -1) return null;
    
    this.data.precios[index] = {
      ...this.data.precios[index],
      precioLitro: nuevoPrecio,
      fechaActualizacion: new Date()
    };
    
    this.saveData();
    return this.data.precios[index];
  }

  // ========== FORMAS DE PAGO ==========
  async getAllFormasPago(): Promise<FormaPago[]> {
    return this.data.formasPago || [];
  }

  async getFormaPagoById(id: string): Promise<FormaPago | null> {
    const formas = await this.getAllFormasPago();
    return formas.find(f => f.id === id) || null;
  }

  async getFormaPagoByTipo(tipo: string): Promise<FormaPago | null> {
    const formas = await this.getAllFormasPago();
    return formas.find(f => f.tipo === tipo) || null;
  }

  // ========== CLIENTES ==========
  async getAllClientes(): Promise<Cliente[]> {
    return this.data.clientes || [];
  }

  async getClienteById(id: string): Promise<Cliente | null> {
    const clientes = await this.getAllClientes();
    return clientes.find(c => c.id === id) || null;
  }

  async getClienteByCedula(cedula: string): Promise<Cliente | null> {
    const clientes = await this.getAllClientes();
    return clientes.find(c => c.cedula === cedula) || null;
  }

  async createCliente(clienteData: Omit<Cliente, 'id'>): Promise<Cliente> {
    const cliente: Cliente = {
      ...clienteData,
      id: this.generateId('cli'),
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
    
    this.data.clientes.push(cliente);
    this.saveData();
    return cliente;
  }

  // ========== VENTAS ==========
  async getAllVentas(filter?: VentaFilter, page?: number, limit?: number): Promise<PaginatedResponse<Venta>> {
    let ventas = this.data.ventas || [];
    
    // Aplicar filtros
    if (filter) {
      if (filter.operadorId) ventas = ventas.filter(v => v.operadorId === filter.operadorId);
      if (filter.surtidorId) ventas = ventas.filter(v => v.surtidorId === filter.surtidorId);
      if (filter.clienteId) ventas = ventas.filter(v => v.clienteId === filter.clienteId);
      if (filter.tipoGasolina) ventas = ventas.filter(v => v.tipoGasolina === filter.tipoGasolina);
      if (filter.formaPago) ventas = ventas.filter(v => v.formaPago === filter.formaPago);
      if (filter.estado) ventas = ventas.filter(v => v.estado === filter.estado);
      if (filter.fechaDesde) ventas = ventas.filter(v => new Date(v.fechaVenta) >= filter.fechaDesde!);
      if (filter.fechaHasta) ventas = ventas.filter(v => new Date(v.fechaVenta) <= filter.fechaHasta!);
    }
    
    // Paginación
    const total = ventas.length;
    const currentPage = page || 1;
    const pageSize = limit || 10;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return {
      items: ventas.slice(startIndex, endIndex),
      total,
      page: currentPage,
      limit: pageSize,
      totalPages
    };
  }

  async getVentaById(id: string): Promise<Venta | null> {
    const ventas = this.data.ventas || [];
    return ventas.find(v => v.id === id) || null;
  }

  async createVenta(ventaData: Omit<Venta, 'id' | 'numeroRecibo' | 'fechaVenta' | 'estado'>): Promise<Venta> {
    const numeroRecibo = this.generateReceiptNumber();
    const venta: Venta = {
      ...ventaData,
      id: this.generateId('venta'),
      numeroRecibo,
      fechaVenta: new Date(),
      estado: 'pendiente',
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
    
    this.data.ventas.push(venta);
    this.saveData();
    return venta;
  }

  async updateVenta(id: string, updateData: Partial<Venta>): Promise<Venta | null> {
    const ventas = this.data.ventas || [];
    const index = ventas.findIndex(v => v.id === id);
    
    if (index === -1) return null;
    
    this.data.ventas[index] = {
      ...this.data.ventas[index],
      ...updateData,
      fechaActualizacion: new Date()
    };
    
    this.saveData();
    return this.data.ventas[index];
  }

  // ========== CÁLCULOS ==========
  async calcularCosto(tipoGasolina: string, litros: number): Promise<CalculoCosto | null> {
    const precio = await this.getPrecioByTipoGasolina(tipoGasolina);
    if (!precio) return null;
    
    const subtotal = litros * precio.precioLitro;
    const impuestos = subtotal * 0.13; // 13% de impuestos (ejemplo)
    const descuentos = 0; // Sin descuentos por defecto
    const total = subtotal + impuestos - descuentos;
    
    return {
      tipoGasolina,
      litros,
      precioLitro: precio.precioLitro,
      subtotal,
      impuestos,
      descuentos,
      total
    };
  }

  // ========== UTILIDADES ==========
  private generateReceiptNumber(): string {
    const year = new Date().getFullYear();
    const ventas = this.data.ventas || [];
    const lastNumber = ventas.length + 1;
    return `REC-${year}-${lastNumber.toString().padStart(6, '0')}`;
  }

  async getEstadisticas() {
    const ventas = this.data.ventas || [];
    const ventasHoy = ventas.filter(v => {
      const today = new Date();
      const ventaDate = new Date(v.fechaVenta);
      return ventaDate.toDateString() === today.toDateString();
    });
    
    const totalVentasHoy = ventasHoy.reduce((sum, v) => sum + v.montoTotal, 0);
    const totalLitrosHoy = ventasHoy.reduce((sum, v) => sum + v.litros, 0);
    
    return {
      ventasHoy: ventasHoy.length,
      totalVentasHoy,
      totalLitrosHoy,
      surtidoresDisponibles: (this.data.surtidores || []).filter(s => s.estado === 'disponible').length,
      surtidoresTotal: (this.data.surtidores || []).length,
      operadoresActivos: (this.data.operadores || []).filter(o => o.estado === 'activo').length,
      clientesRegistrados: (this.data.clientes || []).length
    };
  }
}
