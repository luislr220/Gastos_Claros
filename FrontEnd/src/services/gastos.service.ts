import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gasto, GastoPorCategoria, GastoRegistro } from '../models/Gasto';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  readonly API_URL = 'http://localhost:4000/api/gastos';

  gastos!: Gasto[];
  gastoPorCategoria: GastoPorCategoria = {};

  private readonly _refrescarListas = new Subject<void>();

  constructor(private readonly http: HttpClient) {}

  getGastos() {
    return this.http.get<Gasto[]>(`${this.API_URL}/listar-gastos`);
  }

  postGasto(nuevoGasto: GastoRegistro): Observable<GastoRegistro> {
    return this.http.post<GastoRegistro>(
      `${this.API_URL}/registrar-gasto`,
      nuevoGasto,
    );
  }

  getTotalGasto() {
    return this.http.get<any>(`${this.API_URL}/total-gastado`);
  }

  getGastoPorCategoria() {
    return this.http.get<GastoPorCategoria>(
      `${this.API_URL}/gasto-por-categoria`,
    );
  }

  deleteGasto(id: string) {
    return this.http.delete<any>(`${this.API_URL}/eliminar-gasto/${id}`);
  }

  actualizarGasto(id: string, data: { nombre?: string; monto?: number }) {
    return this.http.patch<any>(`${this.API_URL}/actualizar-gasto/${id}`, data);
  }

  get RefrescarListas() {
    return this._refrescarListas;
  }

  actualizarListas() {
    this._refrescarListas.next();
  }
}
