import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gasto, GastoRegistro } from '../models/Gasto';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  readonly API_URL = 'http://localhost:4000/api/gastos';

  gastos!: Gasto[];

  private _refrescarListas = new Subject<void>();

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

  get RefrescarListas() {
    return this._refrescarListas;
  }

  actualizarListas() {
    this._refrescarListas.next();
  }
}
