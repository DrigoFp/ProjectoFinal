import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Lista } from './treinos/lista/lista';
import { Criar } from './treinos/criar/criar';
import { Editar } from './treinos/editar/editar';


export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: Dashboard},
    {path: 'lista', component: Lista},
    {path: 'criar', component: Criar},
    {path: 'treinos/editar/:id', component: Editar}, // :id significa que não é um valor fixo, muda conforme o treino e angular le o valor da URL
    
{
  path: 'treinos/:id',
  loadComponent: () =>
    import('./treinos/detalhe/detalhe').then(m => m.DetalheTreinoComponent) // lazy loading, carrega o componente DetalheTreinoComponent só quando necessário
}

];
