import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './+services/auth.guard.service'

import {LandPageComponent} from './land-page/land-page.component';
import {SobreComponent} from './sobre/sobre.component';
import {EmpresasComponent} from './empresas/empresas.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CadastroProdutoComponent} from './cadastro-produto/cadastro-produto.component';
import {PerfilEmpresaComponent} from './perfil-empresa/perfil-empresa.component';
import {ListaProdutoComponent} from './lista-produto/lista-produto.component';
import {ErrorComponent} from './error/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandPageComponent },
  { path: 'sobre', component: SobreComponent},
  { path: 'lo/empresa', component: EmpresasComponent}, /*canActivate: [AuthGuard],*/
  { path: 'lo/dashboard', component: DashboardComponent, /*canActivate: [AuthGuard]*/ 
  children: [
    { path: '', component: ListaProdutoComponent, outlet: 'dashboard'},
    { path: 'cadastrar', component: CadastroProdutoComponent, outlet: 'dashboard'},
    { path: 'perfil', component: PerfilEmpresaComponent, outlet: 'dashboard'} 
  ]},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
