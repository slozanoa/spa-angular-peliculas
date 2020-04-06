import { Component, OnInit } from '@angular/core';
import {Film} from '../../models/film';
import {FilmService} from '../../services/film.services';
import {UserService} from '../../services/user.service';
import {global} from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[UserService, FilmService]
})
export class HomeComponent implements OnInit {
	public page_title:string;
	public url:string;
	public films:Array<Film>;
	public status:string;
	public identity;
	public token;
  constructor(
  		private _filmService:FilmService,
  		private _userService:UserService
		) { 
  	this.page_title ='inicio';
  	this.url = global.url;
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  }

  ngOnInit(){
  	this.getFilms();
  	console.log(this.identity);
  }
  getFilms(){
  	this._filmService.getFilms().subscribe(
  		response=>{
  			if(response.status=='success'){
  				this.status = 'success';
  				this.films = response.film;
  				console.log(this.films);
  			}else{
  				this.status = 'error';
  			}
  		},
  		error=>{
  			this.status = 'error';
  			console.log(<any>error);
  		}
  	);
  }
  deleteFilm(id){
  	this._filmService.delete(this.token,id).subscribe(
      response=>{
        console.log(response);
        this.getFilms();
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
}
