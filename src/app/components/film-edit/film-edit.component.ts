import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {FilmService} from '../../services/film.services';
import {Film} from '../../models/film';
import {global} from '../../services/global';

@Component({
  selector: 'app-film-edit',
  templateUrl: '../film-new/film-new.component.html',
  styleUrls: ['./film-edit.component.css'],
  providers:[UserService,FilmService,CategoryService]
})
export class FilmEditComponent implements OnInit {
	 public page_title:string;
  public identity;
  public token;
  public film:Film;
  public categories;
  public status;
  public url;
  public is_edit:boolean;
public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: global.url + 'film/upload',
      headers: {
     "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'sube tu imagen'
 };
  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService,
  	private _categoryService:CategoryService,
    private _filmService: FilmService
  	) { 

	this.page_title = "Editar entrada";
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.is_edit = true;
    this.url = global.url;
    this.is_edit=true;
  }

  ngOnInit(): void {
	this.getCategories();
  this.getFilm();
    this.film = new Film(1, this.identity.sub, 1,'','', null,null);

  }
  getCategories(){
    this._categoryService.getCategories().subscribe(
      response=>{
        if(response.status = 'success'){
          
          this.categories = response.categories;
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
  getFilm(){
    //recojo datos por la url 
    this._route.params.subscribe(params=>{
      let id = +params['id'];
      this._filmService.getFilm(id).subscribe(
         response=>{
             if(response.status == 'success'){
               this.film = response.film;

               if(this.film.user_id != this.identity.sub){
                  this._router.navigate(['/home']);
              }
             }
         },
         error=>{
           console.log(<any>error);
         }  
       );
    }
      );
  }
  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.film.image = image_data.image;
  }
  onSubmit(from){
  	this._filmService.update(this.token, this.film, this.film.id).subscribe(
  		response=>{
  			if(response.status == 'success'){
          this.status = 'success';
         this.film = response.film;
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
  }

