import { UserValuesService } from 'src/app/services/utils/user-values.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/utils/auth.guard';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { title: 'Login' } },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Home'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
