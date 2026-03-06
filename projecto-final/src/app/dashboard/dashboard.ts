import { Component } from '@angular/core';
import { SaudacaoPipe } from '../saudacao-pipe';
import { TreinosStore } from '../treinos/treinos-store';

@Component({
  selector: 'app-dashboard',
  imports: [SaudacaoPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {
  dataDeHoje: string = new Date().toLocaleDateString('pt-PT');
  name: string = 'Rodrigo';
  treinos: any[] = [];
  totalTreinos: number = 0;
  ultimoTreino: any = null;
  mostrarEstatisticas: boolean = false;

  constructor(private treinosStore: TreinosStore) {}

  ngOnInit() {
    //serve para correr código quando o componente inicia
    this.treinos = this.treinosStore.getTreinos();
    this.totalTreinos = this.treinos.length;
    if (this.treinos.length > 0) {
      this.ultimoTreino = this.treinos[this.treinos.length - 1]; // Se existir pelo menos um treino na lista, então guarda na variável ultimoTreino o último treino dessa lista
    }
  }

  botaoCarregarEstatisticas() {
    this.mostrarEstatisticas = !this.mostrarEstatisticas;
  }
}
