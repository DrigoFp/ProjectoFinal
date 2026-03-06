import { Injectable } from '@angular/core';
import { Treino } from '../shared/models/treino.model';
import { nodeModuleNameResolver } from 'typescript';

type ActualizarExercicio = {
  id?: number;
  nome?: string;
  repeticoes?: number;
  peso?: number;
};

@Injectable({
  providedIn: 'root',
})
export class TreinosStore {
  // catalogo de tipos de treino que são fixos
  tipos = [
    {
      nome: 'Peito e Costas',
      exercicios: [
        '1- Pac Deck - SUPERSET',
        '2- Incline Press',
        '1- Nautilus Pullover - SUPERSERT',
        '2- The Close Grip Palms Up PullDown',
        '3- Deadlift',
      ],
    },
    {
      nome: 'Pernas',
      exercicios: [
        '1- Leg Extension - SUPERSET',
        '2- Leg Press',
        '3- Leg Curls',
        '4- Gemeos + Estáticos',
      ],
    },
    {
      nome: 'Ombros, Bicep e Tricep',
      exercicios: [
        '1- Ombros Lateral',
        '2- Ombros Posterior',
        '3- Bicep Straight Barbell Curl',
        '4- Tricep com barra - Superset',
        '5- Dips',
      ],
    },
    {
      nome: 'Pernas c/Squats',
      exercicios: ['1- Leg Extension Estaticos - Superset', '2- Squats', 'Hip thrust', 'Gémeos'],
    },
  ];
  private treinos: Treino[] = [];

  getTipos() {
    return this.tipos;
  }

  getTreinos(): Treino[] {
    return this.treinos;
  }

  getTreinoById(id: number): Treino | undefined {
    return this.treinos.find((t) => t.id === id);
  }

  addTreino(novoTreino: Treino) {
    this.treinos.push(novoTreino);
  }

  updateData(id: number, novaData: string) {
    const treino = this.treinos.find((t) => t.id === id);
    if (treino) {
      treino.data = novaData;
    }
  }

  actualizarTreino(id: number, idExercicio: number, alteracoesExercicio: ActualizarExercicio) {
  const treino = this.treinos.find(t => t.id === id);
  if (!treino) return;

  const index = treino.exercicios.findIndex(e => e.id === idExercicio);
  if (index === -1) return;

  treino.exercicios[index] = {
    ...treino.exercicios[index],
    ...alteracoesExercicio
  };
}

  deleteTreino(id: number) {
    this.treinos = this.treinos.filter((t) => t.id !== id);
  }

  getNextId(): number {
    return this.treinos.length > 0 ? Math.max(...this.treinos.map((t) => t.id)) + 1 : 1;
  }

}
