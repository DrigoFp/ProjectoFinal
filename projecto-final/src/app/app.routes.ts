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
    {path: 'treinos/editar/:id', component: Editar},
];
