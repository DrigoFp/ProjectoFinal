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
  mensagem: string = '';

  constructor(
    private route: ActivatedRoute, // Permite ler parâmetros da rota.
    private treinosStore: TreinosStore,
  ) {}

 mostrarMensagem(texto: string) {
    this.mensagem = texto;

    setTimeout(() => {
      this.mensagem = '';
    }, 2500);
  }
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); //  devolve o ID que está na URL
    this.treino = this.treinosStore.getTreinoById(id); // Vai ao TreinosStore buscar o treino correspondente
  }

  guardarData() {
    if (!this.treino) return;
    this.treinosStore.updateData(this.treino.id, this.treino.data);
    this.mostrarMensagem('Data atualizada com sucesso');
  }
  
  guardarExercicio(idExercicio: number) {
    if (!this.treino) return;

    const ex = this.treino.exercicios.find((e) => e.id === idExercicio);
    if (!ex) return;

    this.treinosStore.actualizarTreino(this.treino.id, idExercicio, {
      repeticoes: ex.repeticoes,
      peso: ex.peso,
    });

    this.mostrarMensagem('Exercício guardado');
  }

}
