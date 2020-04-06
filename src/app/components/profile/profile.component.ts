import { Component, OnInit } from '@angular/core';
import {Film} from '../../models/film';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {FilmService} from '../../services/film.services';
import {global} from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, FilmService]
})
export class ProfileComponent implements OnInit {
	public page_title:string;
	public user:User;
  public user_name:string;
  public user_description:string;
	public films: Array<Film>;
	public identity;
	public token;
	public url:string;
  constructor(
  	private _route:ActivatedRoute,
  	private _router: Router,
  	private _userService:UserService,
  	private _filmService:FilmService
  	) {
  		this.url = global.url;
  		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  	 }

  ngOnInit(){
    this.getProfile();
   }

  getProfile(){
  	this._route.params.subscribe(params=>{
  		let user_id = +params['id'];
  		this.getUser(user_id);
  		this.getFilm(user_id);
  	});
  }
  getUser(id){
  	this._userService.getUser(id).subscribe(
  		response=>{
  			if(response.status=='success'){
  				this.user = response.user;
          this.user_name = this.user.name;
          this.user_description = this.user.description;
  				
  			}	
  		},
  		error=>{
  			console.log(<any>error);
  		}
  	);
  }
  getFilm(id){
  	this._userService.getFilm(id).subscribe(
  		response=>{
  			if(response.status=='success'){
  				this.films=response.films;
  				console.log(this.films);
  			}
  		},
  		error=>{
  			console.log(<any>error);
  		}
  	);
  }
  deleteFilm(id){
       this._filmService.delete(this.token,id).subscribe(
      response=>{
        console.log(response);
        this.getProfile();
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
}
