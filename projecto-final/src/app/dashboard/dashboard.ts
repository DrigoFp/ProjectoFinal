import { Component } from '@angular/core';
import { SaudacaoPipe } from '../saudacao-pipe';
import { TreinosStore } from '../treinos/treinos-store';
import { KpiCardComponent } from '../shared/components/kpi-card/kpi-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [SaudacaoPipe, KpiCardComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  dataDeHoje: string = new Date().toLocaleDateString('pt-PT');
  name: string = 'Raquel Machado ❤️';

  treinos: any[] = [];
  totalTreinos: number = 0;
  ultimoTreino: any = null;

  estatisticasVisiveis: boolean = false;
  estatisticas: any = null;

  constructor(private treinosStore: TreinosStore) {}

  ngOnInit() {
    this.treinosStore.treinos$.subscribe((treinos) => {
      this.treinos = treinos;
      this.totalTreinos = treinos.length;
      this.ultimoTreino = treinos.length > 0 ? treinos[treinos.length - 1] : null;
    });
  }

  mostrarEstatisticas() {
    this.estatisticas = this.calcularEstatisticasPorTreino();
    this.estatisticasVisiveis = !this.estatisticasVisiveis;
  }

  calcularEstatisticasPorTreino() {
    const estatisticas: any = {};

    for (const treino of this.treinos) {
      const nomeTreino = treino.nome;

      if (!estatisticas[nomeTreino]) {
        estatisticas[nomeTreino] = {};
      }

      for (const ex of treino.exercicios) {
        const nomeExercicio = ex.nome;

        if (!estatisticas[nomeTreino][nomeExercicio]) {
          estatisticas[nomeTreino][nomeExercicio] = {
            maxPeso: ex.peso,
            maxReps: ex.repeticoes,
          };
        } else {
          estatisticas[nomeTreino][nomeExercicio].maxPeso = Math.max(
            estatisticas[nomeTreino][nomeExercicio].maxPeso,
            ex.peso,
          );

          estatisticas[nomeTreino][nomeExercicio].maxReps = Math.max(
            estatisticas[nomeTreino][nomeExercicio].maxReps,
            ex.repeticoes,
          );
        }
      }
    }

    return estatisticas;
  }
  getTreinoKeys(obj: any) {
    return Object.keys(obj);
  }

  getExercicioKeys(obj: any) {
    return Object.keys(obj);
  }

  get totalExercicios(): number {
    return this.treinos.reduce((acc, t) => acc + t.exercicios.length, 0);
  }

  get mediaExercicios(): number {
    return this.totalTreinos === 0 ? 0 : Math.round(this.totalExercicios / this.totalTreinos);
  }
}
