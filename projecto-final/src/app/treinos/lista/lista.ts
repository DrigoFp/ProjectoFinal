import { Component, OnInit } from '@angular/core';
import { TreinosStore } from '../treinos-store';
import { Treino } from '../../shared/models/treino.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  templateUrl: './lista.html',
  styleUrl: './lista.css',
  imports: [RouterModule]
})
export class Lista implements OnInit{ 
  treinos: Treino[] = [];
  constructor (private treinosStore: TreinosStore){}

  ngOnInit(): void {
    this.treinos = this.treinosStore.getTreinos();
  }
   apagarTreino(id: number) { this.treinosStore.deleteTreino(id); this.treinos = this.treinosStore.getTreinos(); 
    
   }

}
