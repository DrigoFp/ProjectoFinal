
import { Injectable } from '@angular/core';
import { Treino } from '../models/treino.model';

@Injectable({
  providedIn: 'root'
})
export class TreinosStorageService {

  private readonly STORAGE_KEY = 'treinos';

  loadTreinos(): Treino[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveTreinos(treinos: Treino[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(treinos));
  }
}
