import { Injectable, signal } from '@angular/core';

interface Alerta {
  id: number;
  mensaje: string;
  tipo: 'error' | 'info' | 'exito';
}

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  private readonly estado = signal<Alerta[]>([]);

  alertaConfig = this.estado.asReadonly();

  mostrar(mensaje: string, tipo: 'error' | 'info' | 'exito' = 'info') {
    const id = Date.now();
    const nuevaAlerta: Alerta = { id, mensaje, tipo };

    this.estado.update((s) => [...s, nuevaAlerta]);

    setTimeout(() => this.ocultar(id), 3000);
  }

  ocultar(id: number) {
    this.estado.update((s) => s.filter((a) => a.id !== id));
  }

  constructor() {}
}
