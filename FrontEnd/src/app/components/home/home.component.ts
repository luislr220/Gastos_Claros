import { Component } from '@angular/core';
import { RegistrarGastoComponent } from "../registrar-gasto/registrar-gasto.component";
import { ListadoDeGastosComponent } from "../listado-de-gastos/listado-de-gastos.component";

@Component({
  selector: 'app-home',
  imports: [RegistrarGastoComponent, ListadoDeGastosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
