import { Component } from '@angular/core';
import { SaudacaoPipe } from '../saudacao-pipe';
import { TreinosStore } from '../treinos/treinos-store';

@Component({
  selector: 'app-dashboard',
  imports: [SaudacaoPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  dataDeHoje: string = new Date().toLocaleDateString('pt-PT');
  name: string = 'Raquel Machado ❤️';
  treinos: any[] = [];
  totalTreinos: number = 0;
  ultimoTreino: any = null;

  // 🔥 VARIÁVEIS CORRETAS
  estatisticasVisiveis: boolean = false;
  estatisticas: any = null;

  constructor(private treinosStore: TreinosStore) {}

  ngOnInit() {
    this.treinos = this.treinosStore.getTreinos();
    this.totalTreinos = this.treinos.length;

    if (this.treinos.length > 0) {
      this.ultimoTreino = this.treinos[this.treinos.length - 1];
    }
  }

  // 🔥 MÉTODO CORRETO PARA MOSTRAR/ESCONDER ESTATÍSTICAS
  mostrarEstatisticas() {
    this.estatisticas = this.calcularEstatisticas();
    this.estatisticasVisiveis = !this.estatisticasVisiveis;
  }

  // 🔥 MÉTODO QUE CALCULA AS ESTATÍSTICAS
  calcularEstatisticas() {
    return this.treinos.reduce(
      (acc, treino) => {
        acc.maxPeso = Math.max(acc.maxPeso, treino.peso);
        acc.minPeso = Math.min(acc.minPeso, treino.peso);
        acc.maxReps = Math.max(acc.maxReps, treino.repeticoes);
        acc.minReps = Math.min(acc.minReps, treino.repeticoes);

        return acc;
      },
      {
        maxPeso: -Infinity,
        minPeso: Infinity,
        maxReps: -Infinity,
        minReps: Infinity,
      },
    );
  }
}
