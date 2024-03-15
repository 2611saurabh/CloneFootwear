import { Component, ElementRef, EventEmitter,Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  //hold current searchtext value
  searchText: string = '';

  //1. create an event 
  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('searchInput') searchInputEl: ElementRef

  onSearchTextChanged(){}

  updateSearchText(searchInputEl:HTMLInputElement){
    this.searchText = searchInputEl.value
    this.searchTextChanged.emit(this.searchText);

  }
}

 