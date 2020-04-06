import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
	@Input() films;
	@Input() identity;
	@Input() url;
  constructor() { }

  ngOnInit(): void {
  }
  deletePost(film){
  	
  }
  
}
