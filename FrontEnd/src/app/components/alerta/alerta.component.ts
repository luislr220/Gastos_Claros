import { Component, inject } from '@angular/core';
import { AlertaService } from '../../../services/alerta.service';

@Component({
  selector: 'app-alerta',
  imports: [],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css',
})
export class AlertaComponent {
  private readonly alertaService = inject(AlertaService);
  config = this.alertaService.alertaConfig;

  ocultar(id: number) {
    this.alertaService.ocultar(id);
  }
}
