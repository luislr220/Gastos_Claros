import { Component, OnInit } from '@angular/core';
import { GastosService } from '../../../services/gastos.service';
import { GastoPorCategoria } from '../../../models/Gasto';

@Component({
  selector: 'app-gasto-por-categoria',
  imports: [],
  templateUrl: './gasto-por-categoria.component.html',
  styleUrl: './gasto-por-categoria.component.css',
})
export class GastoPorCategoriaComponent implements OnInit {
  constructor(private readonly gastoService: GastosService) {}

  gastoCategoria: GastoPorCategoria = {};

  ngOnInit(): void {
    this.gastoPorCategoria();

    this.gastoService.RefrescarListas.subscribe(() => {
      this.gastoPorCategoria();
    });
  }

  gastoPorCategoria() {
    this.gastoService.getGastoPorCategoria().subscribe({
      next: (response: any) => {
        /* Aqui solo devolvi null ya que como maneja el mismo mensaje que listado de gastos en la misma vista 
          Seria redundante tener el mismo mensaje.
        */
        if (response.data === undefined) {
          return;
        }
        this.gastoCategoria = response.data;
      },
      error: (e: any) => {
        console.error('Error al obtener el gasto por categoria: ', e);
      },
    });
  }

  obtenerLlaves(objecto: GastoPorCategoria) {
    return Object.keys(objecto);
  }

  capitaizar(texto: string) {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }
}
