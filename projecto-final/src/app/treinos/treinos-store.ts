import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Treino } from '../shared/models/treino.model';
import { TreinosStorageService } from '../shared/services/treinos-storage.service'; 

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

  // Estado reativo - Guarda o estado "treinosSubject"
  private treinosSubject = new BehaviorSubject<Treino[]>([]); // estado global da aplicação, começa vazio o array. treinos$ → é o observable que os componentes observam
  treinos$ = this.treinosSubject.asObservable(); // Os componentes não podem alterar o estado diretamente, so podem observar

  // Getter para aceder ao array atual de treinos/ Sempre que o valor muda, todos os componentes que estão a observar recebem a atualização.
  private get treinos(): Treino[] {
    return this.treinosSubject.value;
  }

  // Tipos de treino
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
        'Gémeos',
      ],
    },
  ];

  constructor(private storage: TreinosStorageService) { 
    const dadosGuardados = this.storage.loadTreinos(); // Vai ao LocalStorage buscar treinos guardados
    if (dadosGuardados.length > 0) {
      this.treinosSubject.next(dadosGuardados); // Se existirem, coloca-os dentro do BehaviorSubject
    }
  }

  // Retorna os tipos
  getTipos() {
    return this.tipos;
  }

  // Retorna todos os treinos
  getTreinos(): Treino[] {
    return this.treinos;
  }

  // Buscar treino por ID
  getTreinoById(id: number): Treino | undefined {
    return this.treinos.find((t) => t.id === id);
  }

  // Adicionar treino
  addTreino(treino: Treino) {
    const atual = [...this.treinos, treino];
    this.treinosSubject.next(atual); // Atualizar o valor do BehaviorSubject
    this.storage.saveTreinos(atual); // Guarda no LocalStorage
  }

  // Atualizar data
  updateData(id: number, novaData: string) {
    const atual = this.treinos.map((t) =>
      t.id === id ? { ...t, data: novaData } : t
    );
    this.treinosSubject.next(atual);// Atualizar o valor do BehaviorSubject
    this.storage.saveTreinos(atual);// Guarda no LocalStorage
  }

  // Atualizar exercício
  actualizarTreino(id: number, idExercicio: number, alteracoes: ActualizarExercicio) {
    const atual = this.treinos.map((t) =>
      t.id === id
        ? {
            ...t,
            exercicios: t.exercicios.map((e) =>
              e.id === idExercicio ? { ...e, ...alteracoes } : e
            ),
          }
        : t
    );

    this.treinosSubject.next(atual);// Atualizar o valor do BehaviorSubject
    this.storage.saveTreinos(atual); // Guarda no LocalStorage
  }

  // Atualizar treino completo
  updateTreino(id: number, treinoAtualizado: Treino) {
    const atual = this.treinos.map((t) =>
      t.id === id ? treinoAtualizado : t
    );
    this.treinosSubject.next(atual);// Atualizar o valor do BehaviorSubject
    this.storage.saveTreinos(atual);// Guarda no LocalStorage
  }

  // Apagar treino
  deleteTreino(id: number) {
    const atual = this.treinos.filter((t) => t.id !== id);
    this.treinosSubject.next(atual);// Atualizar o valor do BehaviorSubject
    this.storage.saveTreinos(atual);// Guarda no LocalStorage
  }

  // Gerar ID único
  getNextId(): number {
    const ids = this.treinos.map((t) => t.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }

  // Exercícios por tipo
  getExerciciosPorTipo(tipo: string): string[] {
    return this.tipos.find((t) => t.nome === tipo)?.exercicios ?? [];
  }
}
