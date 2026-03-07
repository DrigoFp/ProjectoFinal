import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TreinosStore } from '../treinos-store';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalhe-treino',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css'
})
export class DetalheTreinoComponent {

  treino: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: TreinosStore
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.treino = this.store.getTreinoById(id);

    if (!this.treino) {
      alert('Treino não encontrado');
      this.router.navigate(['/lista']);
    }
  }

  editar() {
    this.router.navigate(['/treinos/editar', this.treino.id]);
  }

  apagar() {
    if (confirm('Tens a certeza que queres apagar este treino?')) {
      this.store.deleteTreino(this.treino.id);
      this.router.navigate(['/lista']);
    }
  }
}
