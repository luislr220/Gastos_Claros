import { Component, OnInit } from '@angular/core';
import { Gasto } from '../../../models/Gasto';
import { GastosService } from '../../../services/gastos.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listado-de-gastos',
  imports: [DatePipe],
  templateUrl: './listado-de-gastos.component.html',
  styleUrl: './listado-de-gastos.component.css',
})
export class ListadoDeGastosComponent implements OnInit {
  listarGastos: Gasto[] = [];
  totalGastadoGeneral: number = 0;

  constructor(private readonly gastosService: GastosService) {}

  ngOnInit() {
    console.log('COMPONENTE DE LISTADO DE GASTOS');
    this.cargarGastos();
    this.totalGastado();

    this.gastosService.RefrescarListas.subscribe(() => {
      this.cargarGastos();
      this.totalGastado();
    });
  }

  cargarGastos() {
    this.gastosService.getGastos().subscribe({
      next: (data: any) => {
        this.listarGastos = data.data;
        console.log('Gastos listados: ', data.mensaje);
      },
      error: (error: any) => {
        console.log('Ocurrio un error: ', error);
      },
    });
  }

  capitaizar(texto: string) {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  totalGastado() {
    this.gastosService.getTotalGasto().subscribe({
      next: (response) => {
        console.log(response);
        this.totalGastadoGeneral = response.data.toFixed(2);
      },
      error: (e) => {
        console.error('Error al obtener el total gastado: ', e);
      },
    });
  }

  eliminarGasto(id: string) {
    console.log('Se ha eliminado el gasto con ID: ', id);
    this.gastosService.deleteGasto(id).subscribe({
      next: (response) => {
        alert(response.mensaje);
        this.gastosService.actualizarListas();
      },
      error: (e) => {
        alert(e.error);
      },
    });
  }
}
