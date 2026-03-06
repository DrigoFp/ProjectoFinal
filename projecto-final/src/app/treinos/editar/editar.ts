import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreinosStore } from '../treinos-store';
import { Treino } from '../../shared/models/treino.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar',
  standalone: true,
  templateUrl: './editar.html',
  styleUrls: ['./editar.css'],
  imports: [FormsModule],
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
  }

  guardarData() {
    if (!this.treino) return;
    this.treinosStore.updateData(this.treino.id, this.treino.data);
  }

  guardarExercicio(idExercicio: number) {
    if (!this.treino) return;

    const ex = this.treino.exercicios.find(e => e.id === idExercicio);
    if (!ex) return;

    this.treinosStore.actualizarTreino(
      this.treino.id,
      idExercicio,
      {
        repeticoes: ex.repeticoes,
        peso: ex.peso
      }
    );
  }
}
