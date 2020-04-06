import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import {UserService} from '../../services/user.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
	public page_name:string;
	public user: User;
	public status:string;
  constructor(
  	private _userService:UserService
  ) { 
  	this.page_name = "Registrate";
  	this.user = new User(1,'', '', 'ROLE_USER','','','','');
  }

  ngOnInit(): void {
  	console.log('componente de registro lanzado');
  }

  onSubmit(form){
  		this._userService.register(this.user).subscribe(
  			response=>{
  				if(response.status){
  					this.status = response.status;
  					form.reset();
  				}else{
  					this.status = 'error';
  				}
  			},
  			error=>{
  				console.log(<any>error);
  			}
  		);
  }
}
