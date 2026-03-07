import { Injectable } from '@angular/core';
import { Treino } from '../shared/models/treino.model';
import { BehaviorSubject } from 'rxjs';

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

  // Agora o store é reativo
  private treinosSubject = new BehaviorSubject<Treino[]>([]);
  treinos$ = this.treinosSubject.asObservable();

  // Tipos de treino
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
      exercicios: [
        '1- Leg Extension Estaticos - Superset',
        '2- Squats',
        'Hip thrust',
        'Gémeos'
      ],
    },
  ];

  // Array interno (opcional, mas mantido para compatibilidade)
  private treinos: Treino[] = [];

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
    return this.treinosSubject.value.find((t) => t.id === id);
  }

  // ADICIONAR TREINO (corrigido para emitir atualizações)
  addTreino(novoTreino: Treino) {
    const atual = this.treinosSubject.value;
    const atualizado = [...atual, novoTreino];

    this.treinosSubject.next(atualizado);
    this.treinos = atualizado; // mantém compatibilidade
  }

  // Atualizar data
  updateData(id: number, novaData: string) {
    const treinos = this.treinosSubject.value.map(t =>
      t.id === id ? { ...t, data: novaData } : t
    );

    this.treinosSubject.next(treinos);
    this.treinos = treinos;
  }

  // Atualizar exercício
  actualizarTreino(id: number, idExercicio: number, alteracoesExercicio: ActualizarExercicio) {
    const treinos = this.treinosSubject.value.map(t => {
      if (t.id !== id) return t;

      const exerciciosAtualizados = t.exercicios.map(e =>
        e.id === idExercicio ? { ...e, ...alteracoesExercicio } : e
      );

      return { ...t, exercicios: exerciciosAtualizados };
    });

    this.treinosSubject.next(treinos);
    this.treinos = treinos;
  }

  // Apagar treino
  deleteTreino(id: number) {
    const treinos = this.treinosSubject.value.filter(t => t.id !== id);

    this.treinosSubject.next(treinos);
    this.treinos = treinos;
  }

  // Gerar ID
  getNextId(): number {
    const treinos = this.treinosSubject.value;
    return treinos.length > 0
      ? Math.max(...treinos.map((t) => t.id)) + 1
      : 1;
  }
}
