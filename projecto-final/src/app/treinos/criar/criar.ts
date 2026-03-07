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
  hoje = new Date().toISOString().split('T')[0];
  tipoFixo = false;
  exerciciosTemp: any[] = [];

  form = new FormGroup({
    data: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    exercicio: new FormControl('', Validators.required),
    carga: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    repeticoes: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
  });

  constructor(public treinosStore: TreinosStore) {}

  get tipos() {
    return this.treinosStore.tipos;
  }

  get exerciciosFiltrados() {
    const tipo = this.form.get('tipo')?.value;
    if (!tipo) return [];
    return this.treinosStore.getExerciciosPorTipo(tipo);
  }

  ngOnInit() {
    this.treinosStore.treinos$.subscribe();
  }

  onTipoChange() {
    this.form.patchValue({
      exercicio: '',
      carga: null,
      repeticoes: null,
    });

    this.form.get('carga')?.markAsPristine();
    this.form.get('carga')?.markAsUntouched();

    this.form.get('repeticoes')?.markAsPristine();
    this.form.get('repeticoes')?.markAsUntouched();

    if (this.form.get('tipo')?.value) {
      this.tipoFixo = true;
    }
  }

  onExercicioChange() {
    this.form.patchValue({
      carga: null,
      repeticoes: null,
    });

    this.form.get('carga')?.markAsPristine();
    this.form.get('carga')?.markAsUntouched();

    this.form.get('repeticoes')?.markAsPristine();
    this.form.get('repeticoes')?.markAsUntouched();
  }

  // GETTER PARA VALIDAR O BOTÃO
  get podeAdicionar(): boolean {
    const exercicio = this.form.get('exercicio')?.value;
    const carga = this.form.get('carga')?.value;
    const repeticoes = this.form.get('repeticoes')?.value;

    return !!exercicio && carga! > 0 && repeticoes! > 0;
  }

  adicionarExercicio() {
    const exercicio = this.form.get('exercicio')?.value!;
    const carga = this.form.get('carga')?.value!;
    const repeticoes = this.form.get('repeticoes')?.value!;

    this.exerciciosTemp.push({
      id: this.exerciciosTemp.length + 1,
      nome: exercicio,
      repeticoes,
      peso: carga,
    });

    this.form.patchValue({
      exercicio: '',
      carga: null,
      repeticoes: null,
    });

    // limpar estado dos campos
    this.form.get('carga')?.markAsPristine();
    this.form.get('carga')?.markAsUntouched();

    this.form.get('repeticoes')?.markAsPristine();
    this.form.get('repeticoes')?.markAsUntouched();
  }

  finalizarTreino() {
    const tipoSelecionado = this.form.get('tipo')?.value;
    const tipo = this.treinosStore.tipos.find((t) => t.nome === tipoSelecionado);

    if (!tipo) return;

    const novoTreino = {
      id: this.treinosStore.getNextId(),
      nome: tipo.nome,
      tipo: tipo.nome,
      data: this.form.get('data')?.value ?? '',
      exercicios: this.exerciciosTemp,
    };

    this.treinosStore.addTreino(novoTreino);

    this.form.reset();
    this.exerciciosTemp = [];
    this.tipoFixo = false;
  }

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && control.dirty;
  }
}
