import { Component, OnInit } from '@angular/core';
import { Gasto } from '../../../models/Gasto';
import { GastosService } from '../../../services/gastos.service';

@Component({
  selector: 'app-listado-de-gastos',
  imports: [],
  templateUrl: './listado-de-gastos.component.html',
  styleUrl: './listado-de-gastos.component.css',
})
export class ListadoDeGastosComponent implements OnInit {
  listarGastos: Gasto[] = [];

  constructor(private readonly gastosService: GastosService) {}

  ngOnInit() {
    console.log('COMPONENTE DE LISTADO DE GASTOS');
    this.cargarGastos();
  }

  cargarGastos() {
    this.gastosService.getGastos().subscribe({
      next: (data) => {
        this.listarGastos = data;
        console.log('Gastos listados: ', this.listarGastos);
      },
      error: (error) => {
        console.log('Ocurrio un error: ', error);
      },
    });
  }
}
