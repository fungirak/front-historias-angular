// user-search.component.ts

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  users: any[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // espera 300 ms después de que el usuario deja de escribir
        switchMap(value => this.searchService.searchUsers(value))
      )
      .subscribe(users => {
        this.users = users;
        console.log("respuesta GET input search usuario: ", this.users);
      });
  }
}
