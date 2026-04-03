import { Component } from '@angular/core';
import { RegistrarGastoComponent } from '../registrar-gasto/registrar-gasto.component';
import { ListadoDeGastosComponent } from '../listado-de-gastos/listado-de-gastos.component';
import { GastoPorCategoriaComponent } from '../gasto-por-categoria/gasto-por-categoria.component';

@Component({
  selector: 'app-home',
  imports: [
    RegistrarGastoComponent,
    ListadoDeGastosComponent,
    GastoPorCategoriaComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
