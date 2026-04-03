import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gasto, GastoRegistro } from '../models/Gasto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  readonly API_URL = 'http://localhost:4000/api/gastos';

  gastos!: Gasto[];

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
}
