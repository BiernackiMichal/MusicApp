import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/authGuard/auth.guard';
import { AddSongFormComponent } from './addSongForm/addSongForm.component';
import { EditSongFormComponent } from './editSongForm/editSongForm.component';
import { DeleteSongConfirmationComponent } from './deleteSongConfirmation/deleteSongConfirmation.component';
import { AdminManagePanelComponent } from './AdminManagePanel/AdminManagePanel.component';
import { EditUserFormComponent } from './EditUserForm/EditUserForm.component';
import { DeleteUserConfirmationComponent } from './deleteUserConfirmation/deleteUserConfirmation.component';
import { EditSetFormComponent } from './editSetForm/editSetForm.component';
import { SetsLayoutComponent } from './setsLayout/setsLayout.component';
import { AddSetFormComponent } from './addSetForm/addSetForm.component';
import { DeleteSetConfirmationComponent } from './deleteSetConfirmation/deleteSetConfirmation.component';


export const routes: Routes = [
  {
    path: '' ,
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'addSongForm',
    component: AddSongFormComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Administrator', 'Moderator']}
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Administrator', 'Moderator', 'User']}
  },
  {
    path: 'editSongForm',
    component: EditSongFormComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Administrator', 'Moderator']}
  },
  {
    path: 'deleteSongConfirmation',
    component: DeleteSongConfirmationComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Administrator', 'Moderator']}
  },
  {
    path: 'deleteUserConfirmation',
    component: DeleteUserConfirmationComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Administrator']}
  },
  {
    path: 'deleteSetConfirmation',
    component: DeleteSetConfirmationComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Administrator', 'Moderator']}
  },
  {
   path: 'adminManagePanel',
   component: AdminManagePanelComponent,
   canActivate: [AuthGuard],
   data: {roles: ['Administrator']}
  },
  {
    path: 'editUserForm',
    component: EditUserFormComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Administrator']}
  },
  {
    path: 'editSetForm',
    component: EditSetFormComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Administrator', 'Moderator']}
  },
  {
    path: 'setsLayout',
    component: SetsLayoutComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Administrator', 'Moderator', 'User']}
  },
  {
    path: 'addSetForm',
    component: AddSetFormComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Administrator', 'Moderator']}
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
