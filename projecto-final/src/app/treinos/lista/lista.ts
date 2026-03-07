import { Component, OnInit } from '@angular/core';
import { TreinosStore } from '../treinos-store';
import { Treino } from '../../shared/models/treino.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  templateUrl: './lista.html',
  styleUrl: './lista.css',
  imports: [RouterModule],
})
export class Lista implements OnInit {
  treinos: Treino[] = [];
  filtroTipo: string = '';

  constructor(public treinosStore: TreinosStore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.treinosStore.treinos$.subscribe((t) => {
      this.treinos = this.ordenarPorData(t);
    });
  }

  ordenarPorData(treinos: Treino[]): Treino[] {
    return [...treinos].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  }

  get tipos() {
    return this.treinosStore.tipos;
  }

  onFiltroChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.filtroTipo = select.value;
  }

  get treinosFiltrados(): Treino[] {
    if (!this.filtroTipo) return this.treinos;
    return this.treinos.filter((t) => t.tipo === this.filtroTipo);
  }

  get totalTreinos(): number {
    return this.treinos.length;
  }

  get totalExercicios(): number {
    return this.treinos.reduce((acc, t) => acc + t.exercicios.length, 0);
  }

  get ultimoTreino(): Treino | null {
    return this.treinos.length > 0 ? this.treinos[0] : null;
  }

  apagarTreino(id: number) {
    this.treinosStore.deleteTreino(id);
  }
  verDetalhe(id: number) {
  this.router.navigate(['/treinos', id]);
}

}
