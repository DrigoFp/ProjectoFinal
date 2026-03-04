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
  tipos = [
    {
      nome: 'Peito e Costas',
      exercicios: [
        '1- Pac Deck - SUPERSET',
        '2- Incline Press',
        '1- Nautilus Pullover - SUPERSERT',
        '2- The Close Grip Palms Up PullDown',
        '3- Deadlift',
      ],
    },
    {
      nome: 'Pernas',
      exercicios: [
        '1- Leg Extension - SUPERSET',
        '2- Leg Press',
        '3- Leg Curls',
        '4- Gemeos + Estáticos',
      ],
    },
    {
      nome: 'Ombros, Bicep e Tricep',
      exercicios: [
        '1- Ombros Lateral',
        '2- Ombros Posterior',
        '3- Bicep Straight Barbell Curl',
        '4- Tricep com barra - Superset',
        'Dips',
      ],
    },
    {
      nome: 'Pernas c/Suqats',
      exercicios: ['1- Leg Extension Estaticos - Superset', '2- Squats', 'Hip thrust', 'Gémeos'],
    },
  ];
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
