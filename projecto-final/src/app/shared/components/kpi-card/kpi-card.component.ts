import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.css'
})
export class KpiCardComponent {
  @Input() titulo!: string;
  @Input() valor!: string | number;
  @Input() icone?: string;
}
