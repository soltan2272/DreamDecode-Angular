import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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


export const routes: Routes = [
   { path: '', component: HomeComponent },     // default route
      { path: 'home', component: HomeComponent },   

   { path: 'admin', component: AdminDashboardComponent },

{ path: 'userdashboard', component: UserDashboardComponent},
      { path: 'add-dream', component: AddDreamComponent },
      { path: 'my-dreams', component: MyDreamsComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  

  {path:'add-interpretation',component:AddInterpretationComponent},
  {path:'dreams-to-interpret',component:DreamsToInterpretComponent},
  {path:'get-admin-interpretations',component:GetAdminsInterpretationsComponent},

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
