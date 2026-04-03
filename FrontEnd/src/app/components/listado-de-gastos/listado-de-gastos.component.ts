import { Component, OnInit } from '@angular/core';
import { Gasto } from '../../../models/Gasto';
import { GastosService } from '../../../services/gastos.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-de-gastos',
  imports: [DatePipe, FormsModule],
  templateUrl: './listado-de-gastos.component.html',
  styleUrl: './listado-de-gastos.component.css',
})
export class ListadoDeGastosComponent implements OnInit {
  listarGastos: Gasto[] = [];
  totalGastadoGeneral: number = 0;
  modalAbierto: boolean = false;
  modalAbiertoEliminar: boolean = false;
  idAEliminar: string = '';
  gastoAEditar: Gasto | any;
  gastoOriginal: Gasto | any;

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
        alert(e.error.error);
      },
    });
  }

  actualizarGasto(id: string) {
    const idGasto = id;
    const cambios: any = {};

    Object.keys(this.gastoAEditar).forEach((key) => {
      if (this.gastoAEditar[key] !== this.gastoOriginal[key]) {
        cambios[key] = this.gastoAEditar[key];
      }
    });

    if (Object.keys(cambios).length === 0) {
      alert('No hay cambios que guardar');
      return;
    }

    this.gastosService.actualizarGasto(idGasto, cambios).subscribe({
      next: (response) => {
        alert(response.mensaje);
        this.gastosService.actualizarListas();
      },
      error: (e) => {
        alert(e.error.error);
      },
    });
  }

  /* LOGICA DE MODALES */

  abrirModal(gastoEdit: Gasto) {
    this.gastoAEditar = { ...gastoEdit };
    this.gastoOriginal = { ...gastoEdit };
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  confirmarActualizar(id: string) {
    this.actualizarGasto(id);
    this.cerrarModal();
  }

  abrirModalEliminar(id: string) {
    this.modalAbiertoEliminar = true;
    this.idAEliminar = id;
  }

  cerrarModalEliminar() {
    this.modalAbiertoEliminar = false;
    this.idAEliminar = '';
  }

  confirmarEliminar() {
    this.eliminarGasto(this.idAEliminar);
    this.cerrarModalEliminar();
  }
}
