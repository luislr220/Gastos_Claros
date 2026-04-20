import { Component, OnInit, ElementRef, viewChild } from '@angular/core';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { GastosService } from '../../../services/gastos.service';
import { GastoPorCategoria } from '../../../models/Gasto';
import { COLORES_POR_CATEGORIA } from '../../../utils/categoria.util';
import { AlertaService } from '../../../services/alerta.service';

Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-gasto-por-categoria',
  imports: [],
  templateUrl: './gasto-por-categoria.component.html',
  styleUrl: './gasto-por-categoria.component.css',
})
export class GastoPorCategoriaComponent implements OnInit {
  canvasRef = viewChild<ElementRef>('pieCanvas');

  chart: any;
  nombresGastos: any = [];
  precioGastos: any = [];

  constructor(
    private readonly gastoService: GastosService,
    private readonly alertaService: AlertaService,
  ) {}

  gastoCategoria: GastoPorCategoria = {};

  ngOnInit(): void {
    this.gastoPorCategoria();

    this.gastoService.RefrescarListas.subscribe(() => {
      this.gastoPorCategoria();
      this.crearChart();
    });
  }

  gastoPorCategoria() {
    this.gastoService.getGastoPorCategoria().subscribe({
      next: (response: any) => {
        console.log(response);
        /* Aqui solo devolvi null ya que como maneja el mismo mensaje que listado de gastos en la misma vista 
          Seria redundante tener el mismo mensaje.
        */
        if (response.data === undefined) {
          return;
        }
        this.gastoCategoria = response.data;
        this.nombresGastos = Object.keys(this.gastoCategoria);
        this.precioGastos = Object.values(this.gastoCategoria);

        this.crearChart();
      },
      error: (e: any) => {
        this.alertaService.mostrar(e.e.mensaje, "error")        
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

  crearChart() {
    const elemento = this.canvasRef();
    const etiquetas = this.nombresGastos;

    const coloresAsignados = etiquetas.map((colores: string) => {
      return (
        COLORES_POR_CATEGORIA[colores.toLowerCase()] ||
        COLORES_POR_CATEGORIA['default']
      );
    });

    if (!elemento) return;

    if (this.chart) {
      this.chart.destroy();
    }

    if (elemento) {
      this.chart = new Chart(elemento.nativeElement, {
        type: 'doughnut',
        data: {
          labels: etiquetas.map((n: string) => this.capitaizar(n)),
          datasets: [
            {
              label: 'Gastos',
              data: this.precioGastos,
              backgroundColor: coloresAsignados,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }
}
