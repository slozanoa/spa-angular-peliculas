import { Component, OnInit } from '@angular/core';
import {FilmService} from '../../services/film.services';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Film} from '../../models/film';
import {Category} from '../../models/category';
import {User} from '../../models/user';
import {global} from '../../services/global';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css'],
  providers:[FilmService, UserService]
})
export class FilmDetailComponent implements OnInit {
	public film:Film;
  public category: Category;
  public user:User;
	public url;
  constructor(
  	private _filmService:FilmService,
  	private _userService:UserService,
  	private _route: ActivatedRoute,
  	private _router:Router
  	) {
  	this.url = global.url;
  	 }

  ngOnInit(): void {
  	this.getFiml();
  }

  getFiml(){
  	//recoger id
  	this._route.params.subscribe(params=>{
  			let id = +params['id'];
  			this._filmService.getFilm(id).subscribe(
  				response=>{
  					if(response.status == 'success'){
  						this.film = response.film;
              this.category = response.film.category;
              this.user = response.film.user;
  					} 
  				},
  				error=>{
  					console.log(<any>error);
  				}
  			); 
  		}
  	);
  }
}
