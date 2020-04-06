import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Film} from '../models/film';
import {global} from './global';

@Injectable()

export class FilmService{ 
	public url:string;
	constructor(public _http: HttpClient) {
		this.url = global.url;
	}
	prueba(){
		console.log('hola');
	}
	create(token, film):Observable<any>{
		let json = JSON.stringify(film);
		let params = 'json='+json;

		let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									  .set('Authorization', token);

		return this._http.post(this.url +'/film', params,{headers:headers});
	}
	getFilms():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.get(this.url+'/film', {headers:headers});	
	}

	update(token, film, id):Observable<any>{
		let json=JSON.stringify(film);
		let params = 'json='+json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									  .set('Authorization', token);

		return this._http.put(this.url+'/film/'+id,params,{headers:headers});
	}
	getFilm(id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.get(this.url+'/film/'+id, {headers:headers});
	}
	delete(token, id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									  .set('Authorization', token);

		return this._http.delete(this.url+'/film/'+id, {headers:headers});
	}
}
