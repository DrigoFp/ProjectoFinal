import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreinosStore } from '../treinos-store';
import { Treino } from '../../shared/models/treino.model';

@Component({
  selector: 'app-editar',
  standalone: true,
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar implements OnInit {
  treino!: Treino | undefined;

  constructor(
    private route: ActivatedRoute,
    private treinosStore: TreinosStore
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.treino = this.treinosStore.getTreinoById(id);
    console.log('Treino carregado:', this.treino);
  }
}
