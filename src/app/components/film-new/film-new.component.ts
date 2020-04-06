import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute,Params} from '@angular/router';
import {Film} from '../../models/film';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {FilmService} from '../../services/film.services';
import {global} from '../../services/global';
@Component({
  selector: 'app-film-new',
  templateUrl: './film-new.component.html',
  styleUrls: ['./film-new.component.css'],
  providers: [UserService, CategoryService, FilmService]
})
export class FilmNewComponent implements OnInit {

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: global.url + '/film/upload',
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
	public page_title:string;
  public identity;
  public token;
   public film:Film;
   public categories;
   public is_edit;
   public url;
   public status:string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  	private _userService:UserService,
  	private _categoryService:CategoryService,
  	private _filmService:FilmService

  ) {
  	this.page_title = 'Crear nueva peliculas';
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
     this.url = global.url;
     this.is_edit=false;
     
   }

  ngOnInit(): void {
    this.getCategories();
    this.film = new Film(1, this.identity.sub, 1, '', '', null, null);
  }
  onSubmit(form){
    this._filmService.create(this.token, this.film).subscribe(
      response=>{
        
        this.film = response.film;
        this.status = 'success';
        this._router.navigate(['/home']);
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.film.image = image_data.image_name;
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
}
