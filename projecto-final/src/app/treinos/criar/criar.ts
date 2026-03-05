import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { TreinosStore } from '../treinos-store';

@Component({
  selector: 'app-criar',
  imports: [ReactiveFormsModule],
  templateUrl: './criar.html',
  styleUrl: './criar.css',
})
export class Criar {

  form = new FormGroup({
    nome: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    data: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    exercicios: new FormControl('', [Validators.required]),
  });

  constructor(private treinosStore: TreinosStore) {
    this.form.get('tipo')?.valueChanges.subscribe(() => {
      this.form.get('exercicio')?.reset('');
    });
  }

  criar() {
    if (this.form.invalid) return;

    this.treinosStore.addTreino(this.form.value as any);
    this.form.reset();

    const treino = {
      nome: this.form.value.nome ?? '',
      data: this.form.value.data ?? '',
      tipo: this.form.value.tipo ?? '',
      exercicio: this.form.value.exercicios ?? '',
    };
  }

  campoInvalido(campo: string) {
    const controlo = this.form.get(campo);
    return controlo?.invalid && (controlo?.touched || controlo?.dirty);
  }
}
