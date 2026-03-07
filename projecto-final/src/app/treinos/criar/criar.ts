import { Component } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TreinosStore } from '../treinos-store';

@Component({
  selector: 'app-criar',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './criar.html',
  styleUrl: './criar.css',
})
export class Criar {
  form = new FormGroup({
    data: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
  });

  exercicioSelecionado: string = '';
  carga: number = 0;
  repeticoes: number = 0;

  treinos: any[] = [];

  constructor(public treinosStore: TreinosStore) {}

  get tipos() {
    return this.treinosStore.tipos;
  }

  ngOnInit() {
    this.treinosStore.treinos$.subscribe((t) => {
      this.treinos = t;
    });
  }

  onTipoChange() {
    this.exercicioSelecionado = '';
    this.carga = 0;
    this.repeticoes = 0;
  }

  onExercicioChange() {
    this.carga = 0;
    this.repeticoes = 0;
  }

  criar() {
    if (this.form.invalid || !this.exercicioSelecionado) return;

    const tipoSelecionado = this.form.value.tipo;
    const tipo = this.treinosStore.tipos.find((t) => t.nome === tipoSelecionado);
    if (!tipo) return;

    const novoTreino = {
      id: this.treinosStore.getNextId(),
      nome: tipo.nome,
      tipo: tipo.nome,
      data: this.form.value.data ?? '',
      exercicios: [
        {
          id: 1,
          nome: this.exercicioSelecionado,
          repeticoes: this.repeticoes,
          peso: this.carga,
        },
      ],
    };

    this.treinosStore.addTreino(novoTreino);

    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();

    this.exercicioSelecionado = '';
    this.carga = 0;
    this.repeticoes = 0;
  }

  campoInvalido(campo: string) {
    const controlo = this.form.get(campo);
    return controlo?.invalid && (controlo?.touched || controlo?.dirty);
  }
}
