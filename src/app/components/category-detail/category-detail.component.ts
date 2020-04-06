import { Component, OnInit } from '@angular/core';
import {Category} from '../../models/category';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {Film} from '../../models/film';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {FilmService} from '../../services/film.services';
import {global} from '../../services/global';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService, FilmService, UserService]
})
export class CategoryDetailComponent implements OnInit {
	public page_title:string;
	public url:string;
  public category: Category;
  public films:any;
  public identity;
  public token;
  constructor(
  	private _route:ActivatedRoute,
  	private _router:Router,
  	private _categoryService:CategoryService,
  	private _filmService: FilmService,
  	private _userService:UserService
  	) {
  	this.page_title = "detalle de la pagina";
  	this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    this.getPostCategory();
  }

  getPostCategory(){
  	this._route.params.subscribe(params=>{
  		let id = +params['id'];
  		this._categoryService.getCategory(id).subscribe(
        response=>{
          if(response.status == 'success'){
            this.category = response.category;
            this._categoryService.getFilms(id).subscribe(
              response=>{
               if(response.status == 'success'){
                 this.films = response.films;
               }
              },
              error=>{
                console.log(<any>error);
              }
            );
          }
        },
        error=>{
          console.log(<any>error);
        }
      );

      
  	});
  }
  deleteFilm(id){
       this._filmService.delete(this.token,id).subscribe(
      response=>{
        console.log(response);
        this.getPostCategory();
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
}
