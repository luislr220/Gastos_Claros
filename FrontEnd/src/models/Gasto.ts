export interface Gasto {
  id: string;
  nombre: string;
  monto: number;
  categoria: string;
  fecha: Date;
}

export interface GastoRegistro {
  nombre: string;
  monto: number;
}
