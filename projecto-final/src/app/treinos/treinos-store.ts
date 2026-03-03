import { Injectable } from '@angular/core';
import { Treino } from '../shared/models/treino.model';

@Injectable({
  providedIn: 'root',
})
export class TreinosStore {
  // serviço
  private treinos: Treino[] = [
    {
      id: 1,
      nome: 'Peito e Costas',
      tipo: 'Treino 1',
      data: new Date().toISOString().split('T')[0],
    },
    { id: 2, nome: 'Pernas-1', tipo: 'Treino 2', data: new Date().toISOString().split('T')[0] },
    {
      id: 3,
      nome: 'Ombros e Braços',
      tipo: 'Treino 3',
      data: new Date().toISOString().split('T')[0],
    },
    { id: 4, nome: 'Pernas-2', tipo: 'Treino 2', data: new Date().toLocaleDateString('pt-PT') },
  ];

  getTreinos(): Treino[] {
    return this.treinos;
  }

  addTreino(novoTreino: Omit<Treino, 'id'>) {
    const id = this.getNextId();
    this.treinos.push({ id, ...novoTreino });
  }

  updateData(id: number, novaData: string) {
    const treino = this.treinos.find((t) => t.id === id);
    if (treino) {
      treino.data = novaData;
    }
  }
  
  deleteTreino(id: number) {
    this.treinos = this.treinos.filter((t) => t.id !== id);
  }

  private getNextId(): number {
    return this.treinos.length > 0 
    ? Math.max(...this.treinos.map((t) => t.id)) + 1 : 1;
  }
}
