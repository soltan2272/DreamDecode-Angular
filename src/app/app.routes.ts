import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { AddDreamComponent } from './pages/user/add-dream/add-dream';
import { MyDreamsComponent } from './pages/user/get-user-dreams/get-user-dreams';
import { AddInterpretationComponent } from './pages/interpreter/add-interpretation/add-interpretation';
import { DreamsToInterpretComponent } from './pages/interpreter/dreams-to-interpret/dreams-to-interpret';
import { GetAdminsInterpretationsComponent } from './pages/interpreter/get-admins-interpretations/get-admins-interpretations';
import { HomeComponent } from './pages/home/home';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard';
import { authGuard, adminGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard, adminGuard] },

  { path: 'userdashboard', component: UserDashboardComponent, canActivate: [authGuard] },
  { path: 'add-dream', component: AddDreamComponent, canActivate: [authGuard] },
  { path: 'my-dreams', component: MyDreamsComponent, canActivate: [authGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'add-interpretation', component: AddInterpretationComponent, canActivate: [authGuard, adminGuard] },
  { path: 'dreams-to-interpret', component: DreamsToInterpretComponent, canActivate: [authGuard, adminGuard] },
  { path: 'get-admin-interpretations', component: GetAdminsInterpretationsComponent, canActivate: [authGuard, adminGuard] },
];
