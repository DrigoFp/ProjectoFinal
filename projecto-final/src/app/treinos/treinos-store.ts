import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Treino } from '../shared/models/treino.model';

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

  // Estado reativo
  private treinosSubject = new BehaviorSubject<Treino[]>([]);
  treinos$ = this.treinosSubject.asObservable();

  // Tipos de treino (readonly para evitar alterações acidentais)
  readonly tipos = [
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
      exercicios: [
        '1- Leg Extension Estaticos - Superset',
        '2- Squats',
        'Hip thrust',
        'Gémeos'
      ],
    },
  ];

  // Retorna os tipos
  getTipos() {
    return this.tipos;
  }

  // Retorna os treinos atuais
  getTreinos(): Treino[] {
    return this.treinosSubject.value;
  }

  // Buscar treino por ID
  getTreinoById(id: number): Treino | undefined {
    return this.treinosSubject.value.find(t => t.id === id);
  }

  // Adicionar treino
  addTreino(novoTreino: Treino) {
    this.treinosSubject.next([
      ...this.treinosSubject.value,
      novoTreino
    ]);
  }

  // Atualizar data
  updateData(id: number, novaData: string) {
    this.treinosSubject.next(
      this.treinosSubject.value.map(t =>
        t.id === id ? { ...t, data: novaData } : t
      )
    );
  }

  // Atualizar exercício
  actualizarTreino(id: number, idExercicio: number, alteracoes: ActualizarExercicio) {
    this.treinosSubject.next(
      this.treinosSubject.value.map(t =>
        t.id === id
          ? {
              ...t,
              exercicios: t.exercicios.map(e =>
                e.id === idExercicio ? { ...e, ...alteracoes } : e
              )
            }
          : t
      )
    );
  }

  // Apagar treino
  deleteTreino(id: number) {
    this.treinosSubject.next(
      this.treinosSubject.value.filter(t => t.id !== id)
    );
  }

  // Gerar ID único
  getNextId(): number {
    const ids = this.treinosSubject.value.map(t => t.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }

  // Exercícios por tipo
  getExerciciosPorTipo(tipo: string): string[] {
    return this.tipos.find(t => t.nome === tipo)?.exercicios ?? [];
  }
}
