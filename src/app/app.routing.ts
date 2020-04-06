import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//componentes

import {LoginComponent } from './components/login/login.component';
import {RegisterComponent } from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {CategoryNewComponent} from './components/category-new/category-new.component';
import {FilmNewComponent} from './components/film-new/film-new.component';
import {FilmEditComponent} from './components/film-edit/film-edit.component';
import {FilmDetailComponent} from './components/film-detail/film-detail.component';
import {CategoryDetailComponent} from './components/category-detail/category-detail.component';
import {ProfileComponent} from './components/profile/profile.component';
import {IdentityGuard} from './services/identity.guard';

const appRoutes:Routes = [
	{path: '', component: HomeComponent },
	{path: 'home', component:HomeComponent},
	{path: 'login', component:LoginComponent},
	{path: 'logout/:sure', component: LoginComponent},
	{path: 'ajustes', component:UserEditComponent, canActivate:[IdentityGuard]},
	{path: 'category', component:CategoryNewComponent, canActivate:[IdentityGuard]},
	{path: 'film', component: FilmNewComponent,canActivate:[IdentityGuard]},
	{path: 'register', component:RegisterComponent},
	{path: 'editar-entrada/:id', component:FilmEditComponent, canActivate:[IdentityGuard]},
	{path: 'entrada/:id', component:FilmDetailComponent,canActivate:[IdentityGuard]},
	{path: 'profile/:id',component:ProfileComponent, canActivate:[IdentityGuard]},
	{path: 'category-detail/:id', component:CategoryDetailComponent},
	{path: '**', component: ErrorComponent}
];
//exportar la configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);