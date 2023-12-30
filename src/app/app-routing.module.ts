import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortafolioComponent } from './componentes/portafolio/portafolio.component';
import { LoginComponent } from './componentes/login/login.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { GuardGuard } from './services/guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'portafolio/:nombreUsuario', component: PortafolioComponent},
  { path: 'portafolio/:nombreUsuario/educacion', component: PortafolioComponent},
  { path: '', redirectTo: 'login' , pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
