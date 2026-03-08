
import { Injectable } from '@angular/core';
import { Treino } from '../models/treino.model';

@Injectable({
  providedIn: 'root'
})
export class TreinosStorageService {

  private readonly STORAGE_KEY = 'treinos';

  loadTreinos(): Treino[] { // vai buscar os dados guardados ao LocalStorage, se sim transforma a string em array com JSON.parse, se não devolve array vazio 
    const data = localStorage.getItem(this.STORAGE_KEY); //STORAGE_KEY a chave onde guardo os dados
    return data ? JSON.parse(data) : [];
  }

  saveTreinos(treinos: Treino[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(treinos));
  }
}
