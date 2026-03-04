import { Component, OnInit } from '@angular/core';
import { Lista } from './lista/lista';
import { TreinosStore } from './treinos-store';
import { Treino } from '../shared/models/treino.model';

@Component({
  selector: 'app-treinos',
  standalone: true,
  imports: [Lista],
  templateUrl: './treinos.html',
  styleUrl: './treinos.css',
})
export class Treinos implements OnInit {

  treinos: Treino[] = [];

  constructor(private treinosStore: TreinosStore) {}

  ngOnInit(): void {
    this.treinos = this.treinosStore.getTreinos();
  }
}
