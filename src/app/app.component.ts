import {Component, OnInit} from '@angular/core';
import {QuestionService} from "./service/question.service";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppState} from "./interface/app-state";
import {CustomResponse} from "./interface/custom-response";
import {DataState} from "./enums/data-state.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  appState$: Observable<AppState<CustomResponse>> | undefined;

  constructor(private questionService: QuestionService) {

  }

  ngOnInit(): void {
    this.appState$ = this.questionService.topics$
      .pipe(
        map(response => {
          return {dataState: DataState.LOADED_STATE, appData: response}
        }),
        startWith({dataState: DataState.LOADING_STATE}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR_STATE, error: error})
        })
      )
  }
}
