  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import {HttpClientModule} from '@angular/common/http';

// archivo de configuracion de rutas
import { routing, appRoutingProviders } from './app.routing';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import {UserService} from './services/user.service';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { FilmNewComponent } from './components/film-new/film-new.component';
import { FilmEditComponent } from './components/film-edit/film-edit.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import {IdentityGuard} from './services/identity.guard';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HomeComponent,
    UserEditComponent,
    CategoryNewComponent,
    FilmNewComponent,
    FilmEditComponent,
    FilmDetailComponent,
    CategoryDetailComponent,
    FilmListComponent,
    ProfileComponent
  ],
  imports: [
   BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule
  ],
  providers: [
   appRoutingProviders,
   IdentityGuard,
   UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
