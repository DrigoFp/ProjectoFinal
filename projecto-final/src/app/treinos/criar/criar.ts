import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TreinosStore } from '../treinos-store';

@Component({
  selector: 'app-criar',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './criar.html',
  styleUrl: './criar.css',
})
export class Criar {

  // Formulário principal
  form = new FormGroup({
    data: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
  });

  // Exercício selecionado pelo utilizador
  exercicioSelecionado: string = '';

  // Valores que o utilizador vai meter
  carga: number = 0;
  repeticoes: number = 0;

  constructor(private treinosStore: TreinosStore) {}

  get tipos() {
    return this.treinosStore.tipos;
  }

  // Quando muda o tipo de treino
  onTipoChange() {
    this.exercicioSelecionado = '';
    this.carga = 0;
    this.repeticoes = 0;
  }

  // Quando muda o exercício
  onExercicioChange() {
    this.carga = 0;
    this.repeticoes = 0;
  }

  criar() {
    if (this.form.invalid || !this.exercicioSelecionado) return;

    const tipoSelecionado = this.form.value.tipo;
    const tipo = this.treinosStore.tipos.find(t => t.nome === tipoSelecionado);
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
          peso: this.carga
        }
      ]
    };

    this.treinosStore.addTreino(novoTreino);
    this.form.reset();
    this.exercicioSelecionado = '';
    this.carga = 0;
    this.repeticoes = 0;
  }

  campoInvalido(campo: string) {
    const controlo = this.form.get(campo);
    return controlo?.invalid && (controlo?.touched || controlo?.dirty);
  }
}
