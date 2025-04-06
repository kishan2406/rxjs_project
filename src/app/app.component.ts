import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { debounceTime, filter, fromEvent, switchMap } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { GitHubUser } from './models/github-user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    NgIf,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'practice_rxjs';

  @ViewChild('search', { static: true }) search?: ElementRef<HTMLInputElement>; // when you try to access data throgh ngoninit then provide {static:true} to avoid undefined nativeElement
  userData: GitHubUser[] = [];
  ngOnInit(): void {
    this.fetchDataViaSearch();
  }

  fetchDataViaSearch() {
    const searchObs = fromEvent<InputEvent>(this.search!.nativeElement, 'input') 
     //fromEvent --> converting search data into Observable
      .pipe(
        debounceTime(1000),
        filter((e: InputEvent) => (e.target as HTMLInputElement).value !== ''), 
        switchMap((InpEvent: InputEvent) => { // switchMap provide latest search value and it discards all previous search events
          const inputElement = InpEvent.target as HTMLInputElement;
          return ajax<{ items: GitHubUser[] }>(
            `https://api.github.com/search/users?q=${inputElement.value}`
          );
        })
        // map(response => response.response.items) // You can uncomment if needed
      );
  
    searchObs.subscribe((value: AjaxResponse<{ items: GitHubUser[] }>) => {
      this.userData = value.response.items;
      console.log(value.response.items);
    });
  }
  
}
