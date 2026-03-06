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

  addTreino(novoTreino: Omit<Treino, 'id' | 'exercicios'>) {
    const id = this.getNextId();

    // 1. Encontrar o tipo no catálogo
    const tipoEscolhido = this.tipos.find((t) => t.nome === novoTreino.tipo);

    // 2. Se não existir, não cria treino
    if (!tipoEscolhido) return;

    // 3. Copiar os exercícios do tipo e preparar para edição
    const exerciciosPreparados = tipoEscolhido.exercicios.map((nomeExercicio) => ({
      nome: nomeExercicio,
      id: this.getIdExercicio(id),
      repeticoes: 0,
      peso: 0,
    }));

    // 4. Criar treino completo
    const treinoCompleto: Treino = {
      id,
      nome: novoTreino.nome,
      tipo: novoTreino.tipo,
      data: novoTreino.data,
      exercicios: exerciciosPreparados,
    };

    // 5. Guardar no array
    this.treinos.push(treinoCompleto);
  }

  updateData(id: number, novaData: string) {
    const treino = this.treinos.find((t) => t.id === id);
    if (treino) {
      treino.data = novaData;
    }
  }

  actualizarTreino(id: number, idExercicio: number, alteracoesExercicio: ActualizarExercicio) {
    const actualizar = this.treinos.find((t) => t.id === id);
    if (!actualizar) {
      return;
    }

    let exercicioActualizar = actualizar.exercicios.find((t) => t.id === idExercicio);

    if (!exercicioActualizar) {
      return;
    }
    exercicioActualizar = { ...exercicioActualizar, ...alteracoesExercicio };
  }

  deleteTreino(id: number) {
    this.treinos = this.treinos.filter((t) => t.id !== id);
  }

  private getNextId(): number {
    return this.treinos.length > 0 ? Math.max(...this.treinos.map((t) => t.id)) + 1 : 1;
  }

  private getIdExercicio(id: number): number {
    const treino = this.treinos.find((t) => t.id);
    return treino!.exercicios.length > 0 ? Math.max(...treino!.exercicios.map((t) => t.id)) + 1 : 1;
  }
}
