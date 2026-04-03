import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GastoRegistro } from '../../../models/Gasto';
import { GastosService } from '../../../services/gastos.service';

@Component({
  selector: 'app-registrar-gasto',
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-gasto.component.html',
  styleUrl: './registrar-gasto.component.css',
})
export class RegistrarGastoComponent {
  registroGasto: FormGroup;
  nombre: FormControl;
  monto: FormControl;

  constructor(private readonly gastosService: GastosService) {
    this.nombre = new FormControl('');
    this.monto = new FormControl(0);

    this.registroGasto = new FormGroup({
      nombre: this.nombre,
      monto: this.monto,
    });
  }

  handleSubmit() {
    if (this.registroGasto.valid) {
      const data: GastoRegistro = this.registroGasto.value;

      this.gastosService.postGasto(data).subscribe({
        next: (response: any) => {
          console.log(response);
          this.registroGasto.reset();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
