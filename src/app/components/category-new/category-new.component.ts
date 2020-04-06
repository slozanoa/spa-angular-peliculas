import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';
import {global} from '../../services/global';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {
	public page_title:string;
	public url:string;
	public identity;
	public token;
	public category:Category;
  public status:string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  	private _categorySrvice:CategoryService,
  	private _userService:UserService
  	) { 
  	this.page_title = 'Registra categoria';
  	this.category = new Category(1,'');
  	this.url = global.url;
  	this.identity = _userService.getIdentity();
  	this.token = _userService.getToken();

  }

  ngOnInit(): void {
  }
  onSubmit(form){
  	this._categorySrvice.create(this.token, this.category).subscribe(
  		response=>{
  			if(response.status == 'success'){
          this.status = response.status;
          this.category = response.category;

          this._router.navigate(['/home']);
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
