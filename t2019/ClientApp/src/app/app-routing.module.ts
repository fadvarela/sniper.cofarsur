import { UserValuesService } from 'src/app/services/utils/user-values.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/utils/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ParteDiarioComponent } from './components/novedades/parte-diario/parte-diario.component';
import { JornadasHabitualesComponent } from './components/novedades/jornadas-habituales/jornadas-habituales.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Home'} },
  { path: 'parte-diario', component: ParteDiarioComponent, canActivate: [AuthGuard], data: { title: 'Parte Diario'} },
  { path: 'jornadas-habituales', component: JornadasHabitualesComponent, canActivate: [AuthGuard], data: { title: 'Jornadas Habituales'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
