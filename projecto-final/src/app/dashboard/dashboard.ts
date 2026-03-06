import { Component } from '@angular/core';
import { SaudacaoPipe } from '../saudacao-pipe';
import { TreinosStore } from '../treinos/treinos-store';


@Component({
  selector: 'app-dashboard',
  imports: [SaudacaoPipe, TreinosStore],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  dataDeHoje: string = new Date().toLocaleDateString('pt-PT');
  name: string = 'Rodrigo';

  constructor(private treinosStore: TreinosStore){}

}
