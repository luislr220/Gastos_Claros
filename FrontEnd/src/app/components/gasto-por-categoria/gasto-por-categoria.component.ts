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
  }

  gastoPorCategoria() {
    this.gastoService.getGastoPorCategoria().subscribe({
      next: (response: any) => {
        console.log('Gasto por categoria: ', response.data);
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
}
