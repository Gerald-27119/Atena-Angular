import {Component, OnInit} from '@angular/core';
import {QuestionService} from "./service/question.service";
import {BehaviorSubject, catchError, map, Observable, of, startWith, switchMap} from "rxjs";
import {AppState} from "./interface/app-state";
import {CustomResponse} from "./interface/custom-response";
import {DataState} from "./enums/data-state.enum";
import {Topic} from "./enums/topic.enum";
import {Question} from "./interface/question";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  appState$: Observable<AppState<CustomResponse>> | undefined;
  selectedTopic$ = new BehaviorSubject<Topic | null>(null);
  selectedQuestion$ = new BehaviorSubject<Question | null>(null);
  topics = Object.values(Topic) as Topic[];
  questionsForGivenTopic$: Observable<Question[]> | undefined;

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
      );

    this.questionsForGivenTopic$ = this.selectedTopic$.pipe(
      switchMap(topic => topic ? this.questionService.questionsForGivenTopic$(topic) : of({} as CustomResponse)), // Cast to CustomResponse
      map((response: CustomResponse) => response.data.questions || []) // Add this line
    );
  }

  selectTopic(topic: Topic): void {
    this.selectedTopic$.next(topic);
  }

  selectQuestion(question: Question): void {
    this.selectedQuestion$.next(question);
  }

  protected readonly Topic = Topic;
}
